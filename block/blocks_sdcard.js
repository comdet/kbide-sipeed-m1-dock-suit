const dirIcon = Vue.prototype.$global.board.board_info.dir;

module.exports = function(Blockly) {
  "use strict";

  Blockly.Blocks["sdcard_begin"] = {
    init: function() {
      this.appendDummyInput()
        .appendField(new Blockly.FieldImage(`file:///${dirIcon}/static/icons/1137754.svg`,20,20,"*"))
        .appendField("SD card begin");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(20);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['sdcard_write_txt'] = {
    init: function() {
      this.appendDummyInput()
        .appendField(new Blockly.FieldImage(`file:///${dirIcon}/static/icons/1137707.svg`, 20, 20, "*"))
        .appendField("SD card .txt file name")
        .appendField(new Blockly.FieldTextInput("test.txt"), "FILENAME");
      this.appendValueInput("DATA")
        .setCheck(null)
        .appendField("value");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(20);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['sdcard_write_csv'] = {
    init: function() {
      this.appendDummyInput()
        .appendField(new Blockly.FieldImage(`file:///${dirIcon}/static/icons/1137756.svg`, 20, 20, "*"))
        .appendField("SD card .csv file name")
        .appendField(new Blockly.FieldTextInput("test.csv"), "FILENAME");
      this.appendValueInput("DATA1")
        .setCheck(null)
        .appendField("colum1");
      this.appendValueInput("DATA2")
        .setCheck(null)
        .appendField("colum2");
      this.appendValueInput("DATA3")
        .setCheck(null)
        .appendField("colum3");
      this.appendValueInput("DATA4")
        .setCheck(null)
        .appendField("colum4");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(20);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['sdcard_read_txt'] = {
    init: function() {
      this.appendDummyInput()
        .appendField(new Blockly.FieldImage(`file:///${dirIcon}/static/icons/1137707.svg`, 20, 20, "*"))
        .appendField("SD card .txt readFile name")
        .appendField(new Blockly.FieldTextInput("test.txt"), "FILENAME");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(20);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
// ######################################################################
};
