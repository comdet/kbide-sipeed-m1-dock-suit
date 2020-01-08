module.exports = function (Blockly) {
  "use strict";
  const ORDER_ATOMIC = Blockly.JavaScript.ORDER_ATOMIC;
  const valueToCode = (a, b) => Blockly.JavaScript.valueToCode(a, b);

  Blockly.JavaScript["sdcard_begin"] = function (block) {
    var code = `#EXTINC #include <SD.h>#END
#FUNCTION
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

void writeFile(const char * path, const char * message) {
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
#END
if (!SD.begin(29)) {
  Serial.println("initialization failed!");
}
`;
    return code;
  };

  Blockly.JavaScript["sdcard_write_txt"] = function (block) {
    var text_filename = block.getFieldValue('FILENAME');
    var value_data = valueToCode(block, "DATA", ORDER_ATOMIC);
    var code =`writeFile("${text_filename}", String(${value_data}).c_str());\n`;
    return code;
  };

  Blockly.JavaScript["sdcard_write_csv"] = function (block) {
    var value_filename = block.getFieldValue('FILENAME');
    var value_data1 = valueToCode(block, "DATA1", ORDER_ATOMIC);
    var value_data2 = valueToCode(block, "DATA2", ORDER_ATOMIC);
    var value_data3 = valueToCode(block, "DATA3", ORDER_ATOMIC);
    var value_data4 = valueToCode(block, "DATA4", ORDER_ATOMIC);
    var code =
      `
File file = SD.open("${value_filename}", FILE_APPEND);
if (file) {
  file.print(String(${value_data1}));
  file.print(",");
  file.print(String(${value_data2}));
  file.print(",");
  file.print(String(${value_data3}));
  file.print(",");
  file.println(String(${value_data4}));
  file.close();
}
\n`;
    return code;
  };

  Blockly.JavaScript['sdcard_read_txt'] = function(block) {
    var value_filename = block.getFieldValue('FILENAME');
    var code = `readFile("${value_filename}")`;
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
  // ######################################################################
};
