#include <algorithm>
#include <vector>
#include <Arduino.h>
typedef int Number;
typedef int Boolean;

#include <Sipeed_OV2640.h>
#include <Sipeed_ST7789.h>

uint8_t* img;
Number fps_stamp;
Sipeed_OV2640 __camera_ov2640(FRAMESIZE_QVGA, PIXFORMAT_RGB565);
SPIClass __spi_(SPI0);  // MUST be SPI0 for Maix series on board LCD
Sipeed_ST7789 __lcd(320, 240, __spi_);

void setup() {
  Serial.begin(115200);

  if (!__camera_ov2640.begin()) {
    Serial.println("camera init fail");
  }
  __camera_ov2640.run(true);

  if (!__lcd.begin(15000000, 0xf800)) {
    Serial.println("LCD not connected");
  }
  __camera_ov2640.setInvert(true);
  __lcd.setTextSize(2);
  __lcd.setTextColor(0xffff);
}

void loop() {
  img = (__camera_ov2640.snapshot());
  __lcd.drawImage(0, 0, 320, 240, (__camera_ov2640.getRGB565()));
  __lcd.setCursor(0, 0);
  __lcd.println(
      String(((String("FPS = ") + String(1000 / (millis() - fps_stamp))))));
  fps_stamp = millis();
}
