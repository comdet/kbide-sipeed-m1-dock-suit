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
        .appendField("KPU forward (sort output")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "sort_output")
        .appendField(")");
    this.setOutput(true, ["std::vector<kpu_res_data>", "float *"]);
    this.setColour(45);
 this.setTooltip("init and load KPU model from pointer");
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

Blockly.Blocks['k210_kpu_object_detection_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("KPU Yolo object detection Init");
    this.appendValueInput("region_layer_width")
        .setCheck("Number")
        .appendField("region layer width");
    this.appendValueInput("region_layer_height")
        .setCheck("Number")
        .appendField("region layer height");
    this.appendValueInput("region_layer_channels")
        .setCheck("Number")
        .appendField("region layer channels");
    this.appendValueInput("input width")
        .setCheck("Number")
        .appendField("image input width");
    this.appendValueInput("input height")
        .setCheck("Number")
        .appendField("image input height");
    this.appendValueInput("threshold")
        .setCheck("Number")
        .appendField("threshold");
    this.appendValueInput("nms")
        .setCheck("Number")
        .appendField("nms");
    this.appendValueInput("anchor_number")
        .setCheck("Number")
        .appendField("number of anchor");
    this.appendValueInput("array_anchor")
        .setCheck("String")
        .appendField("anchor");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("Config yolo object detection");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['k210_kpu_object_detection_get_output'] = {
  init: function() {
    this.appendValueInput("kpu_result")
        .setCheck("float *")
        .appendField("KPU get object detection output");
    this.setOutput(true, "obj_info_t");
    this.setColour(45);
 this.setTooltip("get object result from kpu forward");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['k210_kpu_object_detection_get_object_count'] = {
  init: function() {
    this.appendValueInput("object_output")
        .setCheck("obj_info_t")
        .appendField("KPU get object count");
    this.setOutput(true, "Number");
    this.setColour(45);
 this.setTooltip("get object count from object detection output");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['k210_kpu_object_detection_get_object_info'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("KPU get object")
        .appendField(new Blockly.FieldDropdown([["X1","x1"], ["Y1","y1"], ["X2","x2"], ["Y2","Y2"], ["width","width"], ["height","height"], ["class id","class_id"], ["probability","prob"]]), "info");
    this.appendValueInput("object_output")
        .setCheck("obj_info_t")
        .appendField("from");
    this.appendValueInput("index")
        .setCheck("Number")
        .appendField("index");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(45);
 this.setTooltip("get object info from object result");
 this.setHelpUrl("");
  }
};

};