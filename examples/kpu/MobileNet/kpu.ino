#include <vector>
#include <algorithm>
#include <Arduino.h>
typedef int Number;
typedef int Boolean;

#include <Sipeed_OV2640.h>
#include <SD.h>
#include <Maix_KPU.h>

#include <Sipeed_ST7789.h>

SPIClass spi_(SPI0); // MUST be SPI0 for Maix series on board LCD
Sipeed_ST7789 _lcd(320, 240, spi_);

uint8_t* img;
std::vector<String> labels;
Sipeed_OV2640 __camera_ov2640(224, 224, PIXFORMAT_RGB565);
uint8_t* _kpu_model;
KPUClass __kpu;

struct __res_data { 
    float prob;
    size_t index;
};

struct sort_op { 
    bool operator()(__res_data const &left, __res_data const &right) { 
        return left.prob > right.prob;
    }
};

std::vector<String> __load_label_from_sd(const char* filename) {
  std::vector<String> lines;
  if (!SD.begin()) {
    Serial.println("No SD Card");
    return lines;  // -3;
  }
  File _labelFile = SD.open(filename);
  if (!_labelFile) {
    Serial.println("File not found or cannot open file");
    return lines;  // -4;
  }
  while (_labelFile.available()) {
    lines.push_back(_labelFile.readStringUntil('\n'));
  }
  return lines;
}

void setup() {
  Serial.begin(115200);

  if(!_lcd.begin(15000000, COLOR_RED)){
    return;
  }
  _lcd.setTextSize(2);
  _lcd.setTextColor(COLOR_WHITE);

  if (!__camera_ov2640.begin()) {
    Serial.println("camera init fail");
  }
  __camera_ov2640.run(true);
  Serial.println("== LOAD KPU MODEL ==");
  if (!SD.begin()) {
    Serial.println("No SD Card");
    return;  // -3;
  }
  File modelFile = SD.open("m.net");
  if (!modelFile) {
    Serial.println("File not found or cannot open file");
    return;  // -4;
  }
  uint32_t fSize = modelFile.size();
  _kpu_model = (uint8_t*)malloc(fSize);
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
  labels = (

      __load_label_from_sd("m.lab"));
}
void loop() {
  img = (__camera_ov2640.snapshot());
  int res1 = __kpu.forward(__camera_ov2640.getRGB888());
  while (!__kpu.isForwardOk());
  size_t _count;
  float* _result;
  if (__kpu.getResult((uint8_t**)&_result, &_count) == 0) {
    _count /= sizeof(float);
    std::vector<__res_data> __items;
    __items.reserve(_count);
    for(size_t i=0;i<_count;i++){
      __res_data tmp = { _result[i], i };
      __items.push_back(tmp);
    }
    std::sort(__items.begin(),__items.end(),sort_op());
    __res_data max_value = __items[0];
    float prob = max_value.prob;
    String name = labels[max_value.index];
    _lcd.fillRect(224,0, _lcd.width()-224, _lcd.height(), COLOR_RED);
    uint16_t *img565 = __camera_ov2640.getRGB565();
    _lcd.drawImage(0, 0, __camera_ov2640.width(), __camera_ov2640.height(), img565);
    _lcd.setTextSize(2);
    _lcd.setTextColor(COLOR_WHITE);
    _lcd.setCursor(0,0);
    _lcd.println(name);
    _lcd.println("-----");
    _lcd.println(prob);
    
  }
}
