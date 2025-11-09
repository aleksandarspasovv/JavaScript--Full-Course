// ==UserScript==
// @name         Chaturbate Silence Macro (Alt+J)
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Clicks "Silence for 6 hours" when Alt+J is pressed, after right-clicking a user in Chaturbate chat as a moderator
// @author       You
// @match        *://*.chaturbate.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    document.addEventListener('keydown', function (e) {
        if (e.altKey && e.key.toLowerCase() === 'j') {
            const spans = document.querySelectorAll('span.ucmLinkColor');
            let found = false;

            spans.forEach(span => {
                if (span.title && span.title.includes('Silence')) {
                    console.log('Found:', span.title);
                    span.click();
                    found = true;
                }
            });

            if (!found) {
                console.warn('No "Silence" menu item found. Did you right-click a user first?');
            }
        }
    });
})();