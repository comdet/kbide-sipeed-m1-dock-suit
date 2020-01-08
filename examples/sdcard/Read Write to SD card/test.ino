#include <algorithm>
#include <vector>
#include <Arduino.h>
typedef int Number;
typedef int Boolean;

#include <Sipeed_ST7789.h>
#include <SD.h>

SPIClass __spi_(SPI0);  // MUST be SPI0 for Maix series on board LCD
Sipeed_ST7789 __lcd(320, 240, __spi_);

String readFile(const char *path) {
  char ch;
  String msg;
  File file = SD.open(path);
  if (!file) {
    Serial.println("Failed to open file for reading");
    return String();
  }

  Serial.print("Read from file: ");
  while (file.available()) {
    ch = file.read();
    msg += ch;
  }
  return msg;
}

void writeFile(const char *path, const char *message) {
  File file = SD.open(path, FILE_WRITE);
  if (!file) {
    Serial.println("Failed to open file for writing");
    return;
  } else {
    file.println(message);
    file.flush();
    file.close();
  }
}

void setup() {
  Serial.begin(115200);

  if (!__lcd.begin(15000000, 0xf800)) {
    Serial.println("LCD not connected");
  }

  if (!SD.begin(29)) {
    Serial.println("initialization failed!");
  }

  writeFile("/t.txt", String(String("Hello KB-IDE")).c_str());

  __lcd.setTextSize(2);
  __lcd.setCursor(0, 0);
  __lcd.setTextColor(0xffff);
  __lcd.println(String((readFile("/t.txt"))));
}

void loop() {
}
