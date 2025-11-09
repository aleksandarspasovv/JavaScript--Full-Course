/**
 * Auto-Silence by Phrase (Chaturbate App)
 * ---------------------------------------
 * - Block multi-word phrases (e.g., "free pictures", "whatsapp me")
 * - Action: Notification Only | Auto-silence | Quarantine
 * - Role gating: choose which user groups are affected
 *
 * If a site-level silence API is available (cb.silenceUser), we use it.
 * Otherwise we keep a local silence list and hide their messages.
 */

/* --------------------------- Settings (UI) --------------------------- */

cb.settings_choices = [
  // Header
  { name: 'dummy7b', label: '----- BLOCKED PHRASES (Multi-word) -----', type: 'choice', required: false },

  // Master enable
  { name: 'enablePhraseList', label: '10K. Enable Blocked Phrase List?', type: 'choice',
    choice1: 'Yes', choice2: 'No', defaultValue: 'Yes' },

  // Phrase list
  { name: 'phraseBlockList', label: '10L. Blocked Phrases (comma-separated). Example: free pictures, dm me, whatsapp',
    type: 'str', minLength: 0, maxLength: 2000, required: false, defaultValue: 'free pictures,free pics,whatsapp,dm me,snap me,telegram' },

  // Who is affected
  { name: 'blockedLevelPhrase', label: '10M. Phrase List Blocked Groups', type: 'choice',
    choice1: 'All Users',
    choice2: 'All Users Except Mods',
    choice3: 'All Users Except Mods/Fans/VIPs',
    choice4: 'Only Light Blue and Gray Users',
    choice5: 'Gray Users Only',
    defaultValue: 'All Users Except Mods/Fans/VIPs' },

  // Action to take
  { name: 'autoSilencePhrase', label: '10N. Phrase List: Notification Only, Auto-silence, or Quarantine', type: 'choice',
    choice1: 'Notification Only', choice2: 'Auto-silence', choice3: 'Quarantine', defaultValue: 'Auto-silence' },

  // Optional: show a small notice to the offender when blocked
  { name: 'showUserNotice', label: '10P. Show a short notice to the user when blocked?', type: 'choice',
    choice1: 'Yes', choice2: 'No', defaultValue: 'Yes' },

  // Aesthetic (color of bot notices)
  { name: 'noticeColor', label: '10Q. Bot notice color (hex)', type: 'str', minLength: 4, maxLength: 7, defaultValue: '#FFD166', required: false }
];

/* --------------------------- Globals --------------------------- */

var botName = '[AutoMod]';
var appNoticeColor = cb.settings.noticeColor || '#FFD166';

var phraseListArray = ['free nudes'];
var silenceListArray = [];     // local fallback if no platform silence
var quarantineArray = [];      // optional quarantine bucket
var lastActionAt = {};         // user -> timestamp (cooldown)
var ACTION_COOLDOWN_SEC = 30;

/* --------------------------- Helpers --------------------------- */

function checkASCII(s) {
  // True if string is all ASCII (so we can safe-lowercase it)
  for (var i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) > 127) return false;
  }
  return true;
}

// Basic role inference on message object. Adjust if your framework exposes richer flags.
function rolesFromMsg(msg) {
  // msg has fields like: from, in_fanclub, is_mod, gender, etc.
  var isBroadcaster = (msg && msg.from && msg.from.toLowerCase && cb.room_slug && (msg.from.toLowerCase() === cb.room_slug.toLowerCase()));
  var isMod = !!(msg && msg.is_mod);
  var isFan = !!(msg && msg.in_fanclub);
  var isVip = !!(msg && msg.is_vip);          // if available
  var isExternalFan1 = !!(msg && msg.hasOwnProperty('is_ext_fan_1') && msg.is_ext_fan_1);
  var isExternalFan2 = !!(msg && msg.hasOwnProperty('is_ext_fan_2') && msg.is_ext_fan_2);

  // Simple color classes: gray users have no tokens; “light/dark blue/purple” aren’t always exposed;
  // we’ll approximate: gray means not in fan/vip/mod and likely rank == 'gray' if present.
  var isGray = false;
  if (msg && typeof msg.user_color !== 'undefined') {
    isGray = (msg.user_color === 'gray');
  } else {
    isGray = (!isMod && !isFan && !isVip && !isExternalFan1 && !isExternalFan2 && !isBroadcaster);
  }

  // We can’t reliably detect light/dark blue/purple in apps; treat them as non-gray registered users:
  var isLightBlue = false, isDarkBlue = false, isLightPurple = false, isDarkPurple = false;
  // If your environment provides rank, map it here.

  return {
    isBroadcaster: isBroadcaster,
    isMod: isMod,
    isFan: isFan,
    isVip: isVip,
    isExtFan1: isExternalFan1,
    isExtFan2: isExternalFan2,
    isGray: isGray,
    isLightBlue: isLightBlue,
    isDarkBlue: isDarkBlue,
    isLightPurple: isLightPurple,
    isDarkPurple: isDarkPurple
  };
}

function shouldCheckPhrases(role) {
  var set = cb.settings.blockedLevelPhrase;
  if (set === 'All Users') {
    return !role.isBroadcaster;
  }
  if (set === 'All Users Except Mods') {
    return !role.isBroadcaster && !role.isMod;
  }
  if (set === 'All Users Except Mods/Fans/VIPs') {
    return !role.isBroadcaster && !role.isMod && !role.isFan && !role.isVip && !role.isExtFan1 && !role.isExtFan2;
  }
  if (set === 'Only Light Blue and Gray Users') {
    // Approximated: block gray and non-privileged registered (we don’t know blue/purple exactly).
    return !role.isBroadcaster && !role.isMod && !role.isFan && !role.isVip && !role.isExtFan1 && !role.isExtFan2;
  }
  if (set === 'Gray Users Only') {
    return role.isGray;
  }
  return false;
}

function normalizeMsgForMatch(text) {
  // Lowercase ASCII to make matching case-insensitive for English;
  // leave non-ASCII intact so “𝓯𝓻𝓮𝓮” won’t normalize and slip through accidentally.
  if (checkASCII(text)) return text.toLowerCase();
  return text;
}

function buildPhraseArray(rawCSV) {
  var arr = [];
  if (!rawCSV || !rawCSV.trim()) return arr;
  var parts = rawCSV.split(',');
  for (var i = 0; i < parts.length; i++) {
    var ph = parts[i].trim();
    if (!ph) continue;
    if (checkASCII(ph)) ph = ph.toLowerCase();
    if (ph.length < 2) continue;
    // De-dup
    var exists = false;
    for (var j = 0; j < arr.length; j++) if (arr[j] === ph) { exists = true; break; }
    if (!exists) arr.push(ph);
  }
  return arr;
}

function matchPhrase(haystack, phrases) {
  for (var i = 0; i < phrases.length; i++) {
    if (haystack.indexOf(phrases[i]) !== -1) return phrases[i];
  }
  return null;
}

function cooldown(user) {
  var now = Date.now() / 1000;
  var last = lastActionAt[user] || 0;
  if ((now - last) < ACTION_COOLDOWN_SEC) return true;
  lastActionAt[user] = now;
  return false;
}

function addToLocalSilence(user) {
  for (var i = 0; i < silenceListArray.length; i++) if (silenceListArray[i] === user) return false;
  silenceListArray.push(user);
  return true;
}

function isLocallySilenced(user) {
  for (var i = 0; i < silenceListArray.length; i++) if (silenceListArray[i] === user) return true;
  return false;
}

function isQuarantined(user) {
  for (var i = 0; i < quarantineArray.length; i++) if (quarantineArray[i] === user) return true;
  return false;
}

function addToQuarantine(user) {
  if (isQuarantined(user) || isLocallySilenced(user)) return false;
  quarantineArray.push(user);
  return true;
}

function notifyBroadcaster(text) {
  cb.sendNotice(botName + ' ' + text, cb.room_slug, appNoticeColor);
}

function notifyUser(user, text) {
  cb.sendNotice(botName + ' ' + text, user, appNoticeColor);
}

function hardSilenceIfPossible(user, reason) {
  // Preferred: a direct API (if exposed in your runtime)
  try {
    if (typeof cb.silenceUser === 'function') {
      cb.silenceUser(user, reason || 'Blocked phrase');
      return true;
    }
  } catch (e) {}
  // Fallback: app cannot issue site-level silence. Keep local list and show operator a tip.
  return false;
}

/* --------------------------- Bootstrap --------------------------- */

(function init() {
  phraseListArray = buildPhraseArray(cb.settings.phraseBlockList);
  cb.sendNotice(botName + 'Loaded ' + phraseListArray.length + ' blocked phrase(s). Action: ' +
    cb.settings.autoSilencePhrase + '. Scope: ' + cb.settings.blockedLevelPhrase + '.', cb.room_slug, appNoticeColor);
})();

/* --------------------------- Message Pipeline --------------------------- */

cb.onMessage(function (msg) {
  // Hide anything from locally silenced or quarantined users (fallback path)
  if (isLocallySilenced(msg.from) || isQuarantined(msg.from)) {
    msg['X-Spam-Blocked'] = true;
    return { 'X-Spam-Blocked': true, 'm': '' }; // suppress
  }

  if (cb.settings.enablePhraseList !== 'Yes' || phraseListArray.length === 0) {
    return msg; // nothing to do
  }

  var role = rolesFromMsg(msg);
  if (!shouldCheckPhrases(role)) return msg;

  var raw = msg.m || '';
  var hay = normalizeMsgForMatch(raw);
  var matched = matchPhrase(hay, phraseListArray);

  if (!matched) return msg;

  // Enforce cooldown per user to avoid spammy repeats
  if (cooldown(msg.from)) {
    // Suppress the duplicate message anyway
    return { 'X-Spam-Blocked': true, 'm': '' };
  }

  var action = cb.settings.autoSilencePhrase;

  if (action === 'Auto-silence') {
    // Try a hard (site-level) silence
    var didHard = hardSilenceIfPossible(msg.from, 'Blocked phrase: "' + matched + '"');
    if (didHard) {
      notifyBroadcaster('@' + msg.from + ' auto-silenced (phrase: "' + matched + '").');
    } else {
      // Fallback to local silence
      var added = addToLocalSilence(msg.from);
      notifyBroadcaster('@' + msg.from + (added ? ' added to local silence' : ' already locally silenced') +
                        ' (phrase: "' + matched + '"). To hard-silence manually, run: /silence ' + msg.from);
    }
    if (cb.settings.showUserNotice === 'Yes') {
      notifyUser(msg.from, 'Your message wasn’t posted because it contains a blocked phrase.');
    }
    return { 'X-Spam-Blocked': true, 'm': '' };
  }

  if (action === 'Quarantine') {
    var qAdded = addToQuarantine(msg.from);
    if (qAdded) {
      notifyBroadcaster('@' + msg.from + ' moved to quarantine (phrase: "' + matched + '"). Use /silence ' + msg.from + ' or /release as desired.');
      if (cb.settings.showUserNotice === 'Yes') {
        notifyUser(msg.from, 'You have been quarantined for using a blocked phrase. A mod will review.');
      }
    } else {
      notifyBroadcaster('@' + msg.from + ' triggered blocked phrase again (already quarantined).');
    }
    return { 'X-Spam-Blocked': true, 'm': '' };
  }

  // Notification Only
  notifyBroadcaster('Blocked Phrase (notification-only): @' + msg.from + ' → "' + matched + '"\nMessage: ' + raw);
  if (cb.settings.showUserNotice === 'Yes') {
    notifyUser(msg.from, 'Your message wasn’t posted because it contains a blocked phrase.');
  }
  return { 'X-Spam-Blocked': true, 'm': '' }; // still hide the message for signal/noise
});

/* --------------------------- Optional Commands ---------------------------
   Lightweight in-room management of the phrase list and quarantine.
   Only broadcaster/mods can use these.
--------------------------------------------------------------------------- */

function isController(user, isMod) {
  return (user && (user.toLowerCase() === cb.room_slug.toLowerCase())) || !!isMod;
}

cb.onMessage(function (msg) {
  // Lightweight command parser
  if (!msg.m || msg.m[0] !== '/') return msg;

  var text = msg.m.trim();
  var parts = text.split(/\s+/);
  var cmd = parts[0].toLowerCase();
  var args = parts.slice(1);
  var controller = isController(msg.from, msg.is_mod);

  if (!controller) return msg;

  if (cmd === '/phraseadd') {
    if (args.length === 0) {
      notifyBroadcaster('Usage: /phraseadd <multi-word phrase>');
    } else {
      var ph = args.join(' ').trim();
      if (checkASCII(ph)) ph = ph.toLowerCase();
      if (ph.length >= 2) {
        if (phraseListArray.indexOf(ph) === -1) {
          phraseListArray.push(ph);
          notifyBroadcaster('Phrase added: "' + ph + '" (now ' + phraseListArray.length + ' total).');
        } else {
          notifyBroadcaster('Phrase already present: "' + ph + '".');
        }
      } else {
        notifyBroadcaster('Phrase too short.');
      }
    }
    return { 'm': '' }; // eat command line
  }

  if (cmd === '/phrasermv') {
    if (args.length === 0) {
      notifyBroadcaster('Usage: /phrasermv <multi-word phrase>');
    } else {
      var phr = args.join(' ').trim();
      if (checkASCII(phr)) phr = phr.toLowerCase();
      var before = phraseListArray.length;
      phraseListArray = phraseListArray.filter(function (p) { return p !== phr; });
      var after = phraseListArray.length;
      notifyBroadcaster('Removed "' + phr + '". Total now: ' + after + ' (was ' + before + ').');
    }
    return { 'm': '' };
  }

  if (cmd === '/phrases') {
    notifyBroadcaster('Current phrases (' + phraseListArray.length + '): ' + (phraseListArray.join(', ') || '(none)'));
    return { 'm': '' };
  }

  if (cmd === '/qsil') {
    // Move all quarantined to local silence (fallback path)
    var moved = 0;
    for (var i = 0; i < quarantineArray.length; i++) {
      if (!isLocallySilenced(quarantineArray[i])) {
        silenceListArray.push(quarantineArray[i]);
        moved++;
      }
    }
    quarantineArray = [];
    notifyBroadcaster('Moved ' + moved + ' quarantined user(s) to local silence.');
    return { 'm': '' };
  }

  if (cmd === '/qclear') {
    quarantineArray = [];
    notifyBroadcaster('Quarantine cleared.');
    return { 'm': '' };
  }

  if (cmd === '/localsil') {
    notifyBroadcaster('Local silence list (' + silenceListArray.length + '): ' + (silenceListArray.join(', ') || '(empty)'));
    return { 'm': '' };
  }

  return msg;
});
