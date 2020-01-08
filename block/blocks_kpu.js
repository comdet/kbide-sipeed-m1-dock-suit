module.exports = function(Blockly) {
  "use strict";
Blockly.Blocks['k210_kpu_init_sd'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("KPU load model from SD filename")
        .appendField(new Blockly.FieldTextInput("m.net"), "filename");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("init and load KPU model from SD card");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['k210_kpu_init'] = {
  init: function() {
    this.appendValueInput("data")
        .setCheck("uint8_t *")
        .appendField("KPU load model data");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("init and load KPU model from pointer");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['k210_kpu_forward'] = {
  init: function() {
    this.appendValueInput("input_data")
        .setCheck("uint8_t *")
        .appendField("KPU forward");
    this.setOutput(true, "std::vector<kpu_res_data>");
    this.setColour(45);
 this.setTooltip("init and load KPU model from pointer, output sorted best result first");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['k210_kpu_get_result_count'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("KPU get result count from")
        .appendField(new Blockly.FieldVariable("kpu_result"), "var_result");
    this.setOutput(true, "Number");
    this.setColour(45);
 this.setTooltip("get result count");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['k210_kpu_get_result_by_index'] = {
  init: function() {
    this.appendValueInput("index")
        .setCheck("Number")
        .appendField("KPU get result label index from")
        .appendField(new Blockly.FieldVariable("kpu_result"), "var_result")
        .appendField("by index");
    this.setOutput(true, "Number");
    this.setColour(45);
 this.setTooltip("get old index of result before sorted");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['k210_kpu_get_result_prob_by_index'] = {
  init: function() {
    this.appendValueInput("index")
        .setCheck("Number")
        .appendField("KPU get result probability from")
        .appendField(new Blockly.FieldVariable("kpu_result"), "var_result")
        .appendField("by index");
    this.setOutput(true, "Number");
    this.setColour(45);
 this.setTooltip("get result probability");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['k210_kpu_load_label_sdcard'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("KPU load label from SD filename")
        .appendField(new Blockly.FieldTextInput("m.lab"), "filename");
    this.setOutput(true, "std::vector<String>");
    this.setColour(45);
 this.setTooltip("load labels from SD card");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['k210_kpu_get_label_index'] = {
  init: function() {
    this.appendValueInput("index")
        .setCheck("Number")
        .appendField("KPU get label from")
        .appendField(new Blockly.FieldVariable("item"), "var_name")
        .appendField("by index");
    this.setOutput(true, "String");
    this.setColour(45);
 this.setTooltip("get label index");
 this.setHelpUrl("");
  }
};

};