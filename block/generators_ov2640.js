module.exports = function(Blockly) {
  "use strict";
Blockly.JavaScript['sipeed_ov2640_init'] = function(block) {
  var dropdown_img_size = block.getFieldValue('img_size');
  var dropdown_pix_format = block.getFieldValue('pix_format');
  var code = `#EXTINC #include <Sipeed_OV2640.h> #END
#VARIABLE Sipeed_OV2640 __camera_ov2640(${dropdown_img_size},${dropdown_pix_format}); #END
if(!__camera_ov2640.begin()){
  Serial.println("camera init fail");
}
__camera_ov2640.run(true);
`;
  return code;
};

Blockly.JavaScript['sipeed_ov2640_init_custom_size'] = function(block) {
  var number_width = block.getFieldValue('width');
  var number_height = block.getFieldValue('height');
  var dropdown_pix_format = block.getFieldValue('pix_format');
  var code = `#EXTINC #include <Sipeed_OV2640.h> #END
#VARIABLE Sipeed_OV2640 __camera_ov2640(${number_width},${number_height},${dropdown_pix_format}); #END
if(!__camera_ov2640.begin()){
  Serial.println("camera init fail");
}
__camera_ov2640.run(true);
`;
  return code;
};

Blockly.JavaScript['sipeed_ov2640_set_pixel_format'] = function(block) {
  var dropdown_pix_format = block.getFieldValue('pix_format');
  var code = `__camera_ov2640.setPixFormat(${dropdown_pix_format});`;
  return code;
};

Blockly.JavaScript['sipeed_ov2640_set_frame_size'] = function(block) {
  var dropdown_img_size = block.getFieldValue('img_size');
  var code = `__camera_ov2640.setFrameSize(${dropdown_img_size});`;
  return code;
};

Blockly.JavaScript['sipeed_ov2640_set_invert'] = function(block) {
  var dropdown_invert = block.getFieldValue('invert');
  var code = `__camera_ov2640.setInvert(${dropdown_invert});`;
  return code;
};

Blockly.JavaScript['sipeed_ov2640_snapshot'] = function(block) {
  var code = `__camera_ov2640.snapshot()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sipeed_ov2640_get_rgb888'] = function(block) {
  var code = `__camera_ov2640.getRGB888()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sipeed_ov2640_get_rgb565'] = function(block) {
  var code = `__camera_ov2640.getRGB565()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

};