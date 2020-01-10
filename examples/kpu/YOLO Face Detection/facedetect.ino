#include <algorithm>
#include <vector>
#include <Arduino.h>
typedef int Number;
typedef int Boolean;

#include <Sipeed_OV2640.h>
#include <Sipeed_ST7789.h>
#include <SD.h>
#include <Maix_KPU.h>
extern "C" {
#include "region_layer.h"
}

uint8_t *img;
float *kpu_result;
obj_info_t object_info;
Number obj_count;
int i;
Number X1;
Number Y1;
Number w;
Number h;
Sipeed_OV2640 __camera_ov2640(FRAMESIZE_QVGA, PIXFORMAT_RGB565);
SPIClass __spi_(SPI0);  // MUST be SPI0 for Maix series on board LCD
Sipeed_ST7789 __lcd(320, 240, __spi_);
uint8_t *_kpu_model;
KPUClass __kpu;
region_layer_t __object_detection_rl;

float *__kpu_forward(uint8_t *data) {
  if (__kpu.forward(data) != 0) {
    return nullptr;
  }
  while (!__kpu.isForwardOk())
    ;
  size_t _count;
  float *_result;
  if (__kpu.getResult((uint8_t **)&_result, &_count) != 0) {
    return nullptr;
  }
  _count /= sizeof(float);
  return _result;
}
obj_info_t __get_object_info(region_layer_t *rl, float *kpu_result) {
  obj_info_t _detect_info;
  rl->input = kpu_result;
  region_layer_run(rl, &_detect_info);
  return _detect_info;
}

void setup() {
  Serial.begin(115200);

  if (!__camera_ov2640.begin()) {
    Serial.println("camera init fail");
  }
  __camera_ov2640.run(true);
  __camera_ov2640.setInvert(true);

  if (!__lcd.begin(15000000, 0xf800)) {
    Serial.println("LCD not connected");
  }

  Serial.println("== LOAD KPU MODEL ==");
  if (!SD.begin()) {
    Serial.println("No SD Card");
    return;  // -3;
  }
  File modelFile = SD.open("face.net");
  if (!modelFile) {
    Serial.println("File not found or cannot open file");
    return;  // -4;
  }
  uint32_t fSize = modelFile.size();
  _kpu_model = (uint8_t *)malloc(fSize);
  if (!_kpu_model) {
    Serial.println("Memmory not enough");
    return;  // -12; //ENOMEM;
  }
  long ret = modelFile.read(_kpu_model, fSize);
  modelFile.close();
  if (ret != fSize) {
    Serial.println("Read file error");
    free(_kpu_model);
    _kpu_model = nullptr;
    return;  // -5;
  }
  if (__kpu.begin(_kpu_model) != 0) {
    Serial.println("Load model error");
    free(_kpu_model);
    _kpu_model = nullptr;
    return;  // -6;
  }
  Serial.println("== LOAD MODEL SUCCESS ==");

  float ___anchor[2 * 5] = {1.889,  2.5245,   2.9465,  3.94056,  3.99987,
                            5.3658, 5.155437, 6.92275, 6.718375, 9.01025};
  __object_detection_rl.anchor_number = 5;
  __object_detection_rl.anchor = ___anchor;
  __object_detection_rl.threshold = 0.7;
  __object_detection_rl.nms_value = 0.3;
  if (region_layer_init(&__object_detection_rl, 20, 15, 30, 320, 240)) {
    Serial.println("Cannot init region layer");
    return;  // KPU_ERROR_REGION_LAYER;
  }
}

void loop() {
  img = (__camera_ov2640.snapshot());
  __lcd.drawImage(0, 0, 320, 240, (__camera_ov2640.getRGB565()));
  kpu_result = (__kpu_forward(__camera_ov2640.getRGB888()));
  object_info = (__get_object_info(&__object_detection_rl, kpu_result));
  obj_count = object_info.obj_number;
  if (obj_count > 0) {
    int i_end = obj_count - 1;
    int i_inc = 1;
    if (0 > i_end) {
      i_inc = -i_inc;
    }
    for (i = 0; i_inc >= 0 ? i <= i_end : i >= i_end; i += i_inc) {
      X1 = object_info.obj[i].x1;
      Y1 = object_info.obj[i].y1;
      w = (object_info.obj[i].x2 - object_info.obj[i].x1);
      h = (object_info.obj[i].y2 - object_info.obj[i].y1);
      __lcd.drawRect(X1, Y1, w, h, 0x367f);
      __lcd.setTextSize(1);
      __lcd.setCursor(X1, Y1);
      __lcd.setTextColor(0x37e6);
      __lcd.println(String(((String((object_info.obj[i].prob * 100))))));
    }
  }
}
