// Mal's App
var total_tipped = 0;
var high_tip_username = null;
var high_tip_amount = 0;
var last_tip_username = null;
var last_tip_amount = 0;

var panelConfig = cb.settings.panelConfig;
var imageConfig = cb.settings.imageConfig;
var imageSelec = cb.settings.imageSelec;
var imageConfigTrue = cb.settings.imageConfigTrue;

var row1_LabelText = cb.settings.row1_LabelText;
var row1_LabelColor = cb.settings.row1_LabelColor;
var row1_Color = cb.settings.row1_Color;
var row1_Background = cb.settings.row1_Background;

var row2_LabelText = cb.settings.row2_LabelText;
var row2_LabelColor = cb.settings.row2_LabelColor;
var row2_Color = cb.settings.row2_Color;
var row2_Background = cb.settings.row2_Background;

var row3_LabelText = cb.settings.row3_LabelText;
var row3_LabelColor = cb.settings.row3_LabelColor;
var row3_Color = cb.settings.row3_Color;
var row3_Background = cb.settings.row3_Background;

cb.settings_choices = [
  { name: 'tokens', type: 'int', minValue: 1, default: 100 },
  { name: 'goal_description', type: 'str', minLength: 1, maxLength: 255 },
  {
    name: "hashtag",
    label: "Hashtags",
    type: "str",
    minLength: 1,
    maxLength: 255
  },
  {
    name: "panelConfig",
    label: "Panel configuration",
    type: "choice",
    choice1: "classic",
    choice2: "table",
    choice3: "image",
    defaultValue: "image"
  },
  {
    name: "imageSelec",
    label: "Select an image ID. You can see all the images in the top of Code Source section",
    type: "choice",
    choice1: "Image ID written in next section",
    choice2: "c5fdd770-f242-4b9f-a31b-f44af78f45d6",
    choice3: "8e8704b7-936e-4280-8e57-1307d509ea82",
    choice4: "378c5d6b-b525-4d5a-bc59-e4ed7bc991a5",
    choice5: "233c82fa-cbbc-4c47-abd3-9f1a65e94707",
    choice6: "3bc9d9a7-8590-4e23-a103-13e8ebd6bc8a",
    choice7: "3e022b05-390b-478b-9802-1588e904f8d8",
    defaultValue: "Image ID written in next section",
  },
  {
    name: "imageConfig",
    label: "Image Panel configuration, select: Image ID written... first, (useful if you copy these app to upload your own image)",
    type: 'str', minLength: 1, maxLength: 50,
    defaultValue: "f44102f5-a6af-4bfd-bbc1-0c6a8ae3a565",
    required: true
  },
  {
    name: "row1_LabelText",
    label: "Row1 Label Text, default:Tip Received / Goal",
    type: 'str', minLength: 1, maxLength: 26,
    defaultValue: "Tip Received / Goal :",
    required: true
  },
  {
    name: "row1_LabelColor",
    label: "Color Row1 Label, only for Table or Image Panel",
    type: 'str', minLength: 1, maxLength: 50,
    defaultValue: "black",
    required: true
  },
  {
    name: "row1_Color",
    label: "Row1 Text Color, only for Table or Image Panel",
    type: 'str', minLength: 1, maxLength: 50,
    defaultValue: "black",
    required: true
  },
  {
    name: "row1_Background",
    label: "Row1 Background Color, only for Table",
    type: 'str', minLength: 1, maxLength: 50,
    defaultValue: "#ADD8E6",
    required: true
  },
  {
    name: "row2_LabelText",
    label: "Row2 Label Text, default: Highest Tip: ",
    type: 'str', minLength: 1, maxLength: 26,
    defaultValue: "Highest Tip:",
    required: true
  },
  {
    name: "row2_LabelColor",
    label: "Row2 Label Color, only for Table or Image Panel",
    type: 'str', minLength: 1, maxLength: 50,
    defaultValue: "black",
    required: true
  },
  {
    name: "row2_Color",
    label: "Row2 Tex Color, only for Table or Image Panel",
    type: 'str', minLength: 1, maxLength: 50,
    defaultValue: "black",
    required: true
  },
  {
    name: "row2_Background",
    label: "Row2 Background Color, only for Table",
    type: 'str', minLength: 1, maxLength: 50,
    defaultValue: "pink",
    required: true
  },
  {
    name: "row3_LabelText",
    label: "Row3 Label Text, default: Latest Tip Received: ",
    type: 'str', minLength: 1, maxLength: 26,
    defaultValue: "Latest Tip :",
    required: true
  },
  {
    name: "row3_LabelColor",
    label: "Row3 Label Color, only for Table or Image Panel",
    type: 'str', minLength: 1, maxLength: 50,
    defaultValue: "black",
    required: true
  },
  {
    name: "row3_Color",
    label: "Row3 Color, only for Table or Image Panel",
    type: 'str', minLength: 1, maxLength: 50,
    defaultValue: "black",
    required: true
  },
  {
    name: "row3_Background",
    label: "Row3 Background Color, only for Table",
    type: 'str', minLength: 1, maxLength: 50,
    defaultValue: "#ADD8E6",
    required: true
  },
];

// handlers

if (imageSelec != "Image ID written in next section") {
  imageConfigTrue = imageSelec
} else {
  imageConfigTrue = imageConfig
};

cb.onTip(function (tip) {
  total_tipped += tip['amount']
  if (total_tipped > cb.settings.tokens) {
    total_tipped = cb.settings.tokens;
  }
  cb.drawPanel();
});

cb.onDrawPanel(function (user) {
  if (cb.settings.panelConfig == "image") {
    return {
      "template": "image_template",
      "layers": [
        { 'type': 'image', 'fileID': imageConfigTrue },
      ],
    };
  }
  if (cb.settings.panelConfig == "table") {
    return {
      "template": "image_template",
      "table": {
        "row_1": {
          "background-color": row1_Background,
          "col_1": {
            "color": row1_LabelColor,
            "text-align": "center",
            "font-weight": "bold",
            "value": row1_LabelText
          },
          "col_2": {
            "color": row1_Color,
            "text-align": "center",
            "value": ' ' + total_tipped + ' / ' + cb.settings.tokens,
          },
        },
        "row_2": {
          "background-color": row2_Background,
          "col_1": {
            "color": row2_LabelColor,
            "text-align": "center",
            "font-weight": "bold",
            "value": row2_LabelText
          },
          "col_2": {
            "color": row2_Color,
            "text-align": "center",
            "value": " " + format_username(high_tip_username) + ' (' + high_tip_amount + ')'
          }
        },
        "row_3": {
          "background-color": row3_Background,
          "col_1": {
            "color": row3_LabelColor,
            "text-align": "center",
            "font-weight": "bold",
            "value": row3_LabelText
          },
          "col_2": {
            "color": row3_Color,
            "text-align": "center",
            "value": " " + format_username(last_tip_username) + ' (' + last_tip_amount + ')'
          }
        }
      }
    };
  } else {
    return {
      'template': '3_rows_of_labels',
      'row1_label': row1_LabelText + ':',
      'row1_value': '' + total_tipped + ' / ' + cb.settings.tokens,
      'row2_label': row2_LabelText + ':',
      'row2_value': " " + format_username(high_tip_username) + ' (' + high_tip_amount + ')',
      'row3_label': row3_LabelText + ':',
      'row3_value': " " + format_username(last_tip_username) + ' (' + last_tip_amount + ')'
    };
  }
});

cb.drawPanel();

// helper functions
function format_username(val) {
  if (val === null) {
    return "--";
  } else {
    return val.substring(0, 12);
  }
}

function init() {
  // You can leave this function as is if it doesn't affect the core functionality of your app.
}

init();