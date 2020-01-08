module.exports = function(Blockly) {
  "use strict";
Blockly.Blocks['sipeed_ov2640_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("OV2640 init, frame size")
        .appendField(new Blockly.FieldDropdown([["640x480","FRAMESIZE_VGA"], ["320x240","FRAMESIZE_QVGA"], ["160x120","FRAMESIZE_QQVGA"], ["80x60","FRAMESIZE_QQQVGA"], ["40x30","FRAMESIZE_QQQQVGA"]]), "img_size")
        .appendField("format")
        .appendField(new Blockly.FieldDropdown([["RGB565","PIXFORMAT_RGB565"], ["RAW","PIXFORMAT_BAYER"], ["YUV422","PIXFORMAT_YUV422"], ["GRAYSCALE","PIXFORMAT_GRAYSCALE"], ["JPEG/COMPRESSED","PIXFORMAT_JPEG"]]), "pix_format");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("initial camera");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['sipeed_ov2640_init_custom_size'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("OV2640 init, frame size width")
        .appendField(new Blockly.FieldNumber(320), "width")
        .appendField(", height")
        .appendField(new Blockly.FieldNumber(240), "height")
        .appendField("format")
        .appendField(new Blockly.FieldDropdown([["RGB565","PIXFORMAT_RGB565"], ["RAW","PIXFORMAT_BAYER"], ["YUV422","PIXFORMAT_YUV422"], ["GRAYSCALE","PIXFORMAT_GRAYSCALE"], ["JPEG/COMPRESSED","PIXFORMAT_JPEG"]]), "pix_format");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("initial camera with custom image size");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['sipeed_ov2640_set_pixel_format'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("OV2640 set pixel format")
        .appendField(new Blockly.FieldDropdown([["RGB565","PIXFORMAT_RGB565"], ["RAW","PIXFORMAT_BAYER"], ["YUV422","PIXFORMAT_YUV422"], ["GRAYSCALE","PIXFORMAT_GRAYSCALE"], ["JPEG/COMPRESSED","PIXFORMAT_JPEG"]]), "pix_format");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("set camera pixel format");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['sipeed_ov2640_set_frame_size'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("OV2640 set frame size")
        .appendField(new Blockly.FieldDropdown([["640x480","FRAMESIZE_VGA"], ["320x240","FRAMESIZE_QVGA"], ["160x120","FRAMESIZE_QQVGA"], ["80x60","FRAMESIZE_QQQVGA"], ["40x30","FRAMESIZE_QQQQVGA"]]), "img_size");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("set camera frame size");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['sipeed_ov2640_set_invert'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("OV2640 set invert")
        .appendField(new Blockly.FieldDropdown([["true","true"], ["false","false"]]), "invert");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("set camera invert");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['sipeed_ov2640_snapshot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("OV2640 snapshot");
    this.setOutput(true, "uint8_t *");
    this.setColour(0);
 this.setTooltip("get camera image");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['sipeed_ov2640_get_rgb888'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("OV2640 get RGB888");
    this.setOutput(true, "uint8_t *");
    this.setColour(0);
 this.setTooltip("get RGB888 from camera (use after snapshot)");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['sipeed_ov2640_get_rgb565'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("OV2640 get RGB565");
    this.setOutput(true, "uint16_t *");
    this.setColour(0);
 this.setTooltip("get RGB565 from camera (use after snapshot)");
 this.setHelpUrl("");
  }
};

};