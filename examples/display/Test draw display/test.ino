#include <algorithm>
#include <vector>
#include <Arduino.h>
typedef int Number;
typedef int Boolean;

#include <Sipeed_ST7789.h>

SPIClass __spi_(SPI0);  // MUST be SPI0 for Maix series on board LCD
Sipeed_ST7789 __lcd(320, 240, __spi_);

void setup() {
  Serial.begin(115200);

  if (!__lcd.begin(15000000, 0xf800)) {
    Serial.println("LCD not connected");
  }
}

void loop() {
  __lcd.setTextSize(2);
  __lcd.setCursor(0, 0);
  __lcd.setTextColor(0x0);
  __lcd.println(String(String("Hello world!")));
  __lcd.drawLine(10, 10, 100, 50, 0x0);
  __lcd.drawRect(50, 220, 50, 30, 0x0);
  __lcd.fillCircle(250, 200, 20, 0x0);
  __lcd.drawTriangle(0, 100, 160, 50, 250, 150, 0x0);
  __lcd.drawPixel(160, 120, 0x0);
}
