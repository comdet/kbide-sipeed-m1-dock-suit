module.exports = function(Blockly) {
  "use strict";

Blockly.JavaScript['k210_kpu_init_sd'] = function(block) {
  var text_filename = block.getFieldValue('filename');
  var code = `
#EXTINC#include <SD.h>#END
#EXTINC#include <Maix_KPU.h>#END
#VARIABLE uint8_t* _kpu_model;#END
#VARIABLE KPUClass __kpu;#END
Serial.println("== LOAD KPU MODEL ==");
if(!SD.begin()) 
{
  Serial.println("No SD Card");
  return;// -3;
}
File modelFile = SD.open("${text_filename}");
if (!modelFile){
  Serial.println("File not found or cannot open file");
  return;// -4;
}
uint32_t fSize = modelFile.size();
_kpu_model = (uint8_t*)malloc(fSize);
if(!_kpu_model)
{
  Serial.println("Memmory not enough");
  return;// -12; //ENOMEM;
}
long ret = modelFile.read(_kpu_model, fSize);
modelFile.close();
if(ret != fSize)
{
  Serial.println("Read file error");
  free(_kpu_model);
  _kpu_model = nullptr;
  return;// -5;
}
if(__kpu.begin(_kpu_model) != 0)
{
  Serial.println("Load model error");
  free(_kpu_model);
  _kpu_model = nullptr;
  return;// -6;
}
Serial.println("== LOAD MODEL SUCCESS ==");
`;
  return code;
};

Blockly.JavaScript['k210_kpu_init'] = function(block) {
  var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_NONE);
  var code = `
if(__kpu.begin(${value_name}) != 0)
{
  Serial.println("Load model error");
  return;// -6;
}
`;
  return code;
};

Blockly.JavaScript['k210_kpu_forward'] = function(block) {
  var value_input_data = Blockly.JavaScript.valueToCode(block, 'input_data', Blockly.JavaScript.ORDER_NONE);
  var checkbox_sort_output = block.getFieldValue('sort_output') == 'TRUE';
  block.setOutput(true,checkbox_sort_output?["std::vector<kpu_res_data>"]:["float *"]);
  var code_without_sort = `#FUNCTION
float * __kpu_forward(uint8_t *data){
  if(__kpu.forward(data) != 0){
    return nullptr;
  }
  while(!__kpu.isForwardOk());
  size_t _count;
  float *_result;
  if(__kpu.getResult((uint8_t**)&_result, &_count) != 0){
    return nullptr;
  }
  _count /= sizeof(float);
  return _result;
}
#END
__kpu_forward(${value_input_data})`;
  
  var code = `#EXTINC
struct kpu_res_data { 
    float prob;
    size_t index;
};
struct sort_op { 
    bool operator()(kpu_res_data const &left, kpu_res_data const &right) { 
        return left.prob > right.prob;
    }
};
#END
#FUNCTION
std::vector<kpu_res_data> __kpu_forward_sort(uint8_t *data){
  std::vector<kpu_res_data> __items;
  if(__kpu.forward(data) != 0){
    return __items;
  }
  while(!__kpu.isForwardOk());
  size_t _count;
  float *_result;
  if(__kpu.getResult((uint8_t**)&_result, &_count) != 0){
    return __items;
  }
  _count /= sizeof(float);
  __items.reserve(_count);
  for(size_t i=0;i<_count;i++){
    kpu_res_data tmp = { _result[i], i };
    __items.push_back(tmp);
  }
  std::sort(__items.begin(),__items.end(),sort_op());
  return __items;
}
#END
__kpu_forward_sort(${value_input_data})`;
  return [checkbox_sort_output?code:code_without_sort, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['k210_kpu_get_result_count'] = function(block) {
  var variable_var_result = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('var_result'), Blockly.Variables.NAME_TYPE);
  var code = `${variable_var_result}.size()`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['k210_kpu_get_result_by_index'] = function(block) {
  var variable_var_result = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('var_result'), Blockly.Variables.NAME_TYPE);
  var value_index = Blockly.JavaScript.valueToCode(block, 'index', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `${variable_var_result}[${value_index}].index`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['k210_kpu_get_result_prob_by_index'] = function(block) {
  var variable_var_result = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('var_result'), Blockly.Variables.NAME_TYPE);
  var value_index = Blockly.JavaScript.valueToCode(block, 'index', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `${variable_var_result}[${value_index}].prob`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['k210_kpu_load_label_sdcard'] = function(block) {
  var text_filename = block.getFieldValue('filename');
  var code = `#EXTINC#include <SD.h>#END
#EXTINC#include <Maix_KPU.h>#END
#FUNCTION
std::vector<String> __load_label_from_sd(const char* filename){
  std::vector<String> lines;
  if(!SD.begin()) 
  {
    Serial.println("No SD Card");
    return lines;// -3;
  }
  File _labelFile = SD.open(filename);
  if (!_labelFile){
    Serial.println("File not found or cannot open file");
    return lines;// -4;
  }
  while (_labelFile.available()){
      lines.push_back(_labelFile.readStringUntil('\\n'));
  }
  return lines;
}
#END
__load_label_from_sd("${text_filename}")`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['k210_kpu_get_label_index'] = function(block) {
  var variable_var_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('var_name'), Blockly.Variables.NAME_TYPE);
  var value_index = Blockly.JavaScript.valueToCode(block, 'index', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `${variable_var_name}[${value_index}]`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['k210_kpu_object_detection_init'] = function(block) {
  var value_region_layer_width = Blockly.JavaScript.valueToCode(block, 'region_layer_width', Blockly.JavaScript.ORDER_ATOMIC);
  var value_region_layer_height = Blockly.JavaScript.valueToCode(block, 'region_layer_height', Blockly.JavaScript.ORDER_ATOMIC);
  var value_region_layer_channels = Blockly.JavaScript.valueToCode(block, 'region_layer_channels', Blockly.JavaScript.ORDER_ATOMIC);
  var value_input_width = Blockly.JavaScript.valueToCode(block, 'input width', Blockly.JavaScript.ORDER_ATOMIC);
  var value_input_height = Blockly.JavaScript.valueToCode(block, 'input height', Blockly.JavaScript.ORDER_ATOMIC);
  var value_threshold = Blockly.JavaScript.valueToCode(block, 'threshold', Blockly.JavaScript.ORDER_ATOMIC);
  var value_nms = Blockly.JavaScript.valueToCode(block, 'nms', Blockly.JavaScript.ORDER_ATOMIC);
  var value_anchor_number = Blockly.JavaScript.valueToCode(block, 'anchor_number', Blockly.JavaScript.ORDER_ATOMIC);
  var value_array_anchor = Blockly.JavaScript.valueToCode(block, 'array_anchor', Blockly.JavaScript.ORDER_NONE);
  var code = `#EXTINC 
extern "C" {
    #include "region_layer.h"
}
#END
#VARIABLE
region_layer_t __object_detection_rl;
#END
float ___anchor[2 * ${value_anchor_number}] = {${value_array_anchor.replace("String(\"","").replace("\")","")}};
__object_detection_rl.anchor_number = ${value_anchor_number};
__object_detection_rl.anchor = ___anchor;
__object_detection_rl.threshold = ${value_threshold};
__object_detection_rl.nms_value = ${value_nms};
if(region_layer_init(&__object_detection_rl, 
  ${value_region_layer_width}, 
  ${value_region_layer_height}, 
  ${value_region_layer_channels},
  ${value_input_width},
  ${value_input_height})){
  Serial.println("Cannot init region layer");
  return; // KPU_ERROR_REGION_LAYER;
}
`;
  return code;
};

Blockly.JavaScript['k210_kpu_object_detection_get_output'] = function(block) {
  var value_kpu_result = Blockly.JavaScript.valueToCode(block, 'kpu_result', Blockly.JavaScript.ORDER_NONE);
  var code = `#FUNCTION
obj_info_t __get_object_info(region_layer_t *rl, float * kpu_result){
  obj_info_t _detect_info;
  rl->input = kpu_result;
  region_layer_run(rl,&_detect_info);
  return _detect_info;
}
#END
__get_object_info(&__object_detection_rl,${value_kpu_result})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['k210_kpu_object_detection_get_object_count'] = function(block) {
  var value_object_output = Blockly.JavaScript.valueToCode(block, 'object_output', Blockly.JavaScript.ORDER_NONE);
  var code = `${value_object_output}.obj_number`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['k210_kpu_object_detection_get_object_info'] = function(block) {
  var dropdown_info = block.getFieldValue('info');
  var value_object_output = Blockly.JavaScript.valueToCode(block, 'object_output', Blockly.JavaScript.ORDER_ATOMIC);
  var value_index = Blockly.JavaScript.valueToCode(block, 'index', Blockly.JavaScript.ORDER_ATOMIC);
  if(dropdown_info === "width"){
    var code = `(${value_object_output}.obj[${value_index}].x2 - ${value_object_output}.obj[${value_index}].x1)`;
  }else if(dropdown_info === "height"){
    var code = `(${value_object_output}.obj[${value_index}].y2 - ${value_object_output}.obj[${value_index}].y1)`;
  }else if(dropdown_info === "prob"){
    var code = `(${value_object_output}.obj[${value_index}].prob * 100)`;
  }else{
    var code = `${value_object_output}.obj[${value_index}].${dropdown_info}`;
  }
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

};