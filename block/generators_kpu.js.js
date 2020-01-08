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
std::vector<kpu_res_data> __kpu_forward(uint8_t *data){
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
__kpu_forward(${value_input_data})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
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

};