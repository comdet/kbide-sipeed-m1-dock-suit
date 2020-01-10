let iconDir = Vue.prototype.$global.board.board_info.dir + "/static/icons/"; 
let menu_display = require("./menu/config.group.display");
let menu_sdcard = require("./menu/config.group.sdcard")
module.exports = {
  blocks : [
  	{
      name: "Camera",
      color: "230",
      icon: `file:///${iconDir}/Camera-256.png`,
      blocks: [
        "sipeed_ov2640_init",
        "sipeed_ov2640_init_custom_size", 
        "sipeed_ov2640_set_pixel_format", 
        "sipeed_ov2640_set_frame_size", 
        "sipeed_ov2640_set_invert", 
        {
          xml : `<block type="variables_set">
                  <field name="VAR">img</field>
                    <value name="VALUE">
                      <block type="sipeed_ov2640_snapshot" inline="false"></block>
                    </value>
                </block>`
        },
        "sipeed_ov2640_get_rgb888",
        "sipeed_ov2640_get_rgb565"
      ]
    },
    menu_display,
    menu_sdcard,
    {
      name: "KPU",
      color: "200",
      icon : `file:///${iconDir}/robot-256x256.png`,
      blocks: [
        "k210_kpu_init_sd", 
        "k210_kpu_init", 
        {
          xml : `<block type="variables_set">
                  <field name="VAR">labels</field>
                    <value name="VALUE">
                      <block type="k210_kpu_load_label_sdcard" inline="false"></block>
                    </value>
                </block>`
        },
        {
          xml : `<block type="variables_set">
                  <field name="VAR">kpu_result</field>
                    <value name="VALUE">
                      <block type="k210_kpu_forward" inline="false"></block>
                    </value>
                </block>`
        },
        {
            xml: `<sep gap="32"></sep><label text="for classification" web-class="headline"></label>`
        },
        {
          xml : `<block type="k210_kpu_get_result_by_index">
                  <value name="index">
                    <shadow type="math_number">
                      <field name="NUM">0</field>
                    </shadow>
                  </value>
                </block>`
        },
        "k210_kpu_get_result_count",
        {
          xml : `<block type="k210_kpu_get_label_index">
                  <value name="index">
                    <shadow type="math_number">
                      <field name="NUM">0</field>
                    </shadow>
                  </value>
                </block>`
        },
        {
            xml: `<sep gap="32"></sep><label text="for object detection" web-class="headline"></label>`
        },
        {
          xml : `<block type="k210_kpu_object_detection_init">
                  <value name="region_layer_width">
                    <shadow type="math_number">
                      <field name="NUM">20</field>
                    </shadow>
                  </value>
                  <value name="region_layer_height">
                    <shadow type="math_number">
                      <field name="NUM">15</field>
                    </shadow>
                  </value>
                  <value name="region_layer_channels">
                    <shadow type="math_number">
                      <field name="NUM">30</field>
                    </shadow>
                  </value>
                  <value name="input width">
                    <shadow type="math_number">
                      <field name="NUM">320</field>
                    </shadow>
                  </value>
                  <value name="input height">
                    <shadow type="math_number">
                      <field name="NUM">240</field>
                    </shadow>
                  </value>
                  <value name="threshold">
                    <shadow type="math_number">
                      <field name="NUM">0.7</field>
                    </shadow>
                  </value>
                  <value name="nms">
                    <shadow type="math_number">
                      <field name="NUM">0.3</field>
                    </shadow>
                  </value>
                  <value name="anchor_number">
                    <shadow type="math_number">
                      <field name="NUM">5</field>
                    </shadow>
                  </value>
                  <value name="array_anchor">
                    <shadow type="basic_string">
                      <field name="VALUE">1.889, 2.5245, 2.9465, 3.94056, 3.99987, 5.3658, 5.155437, 6.92275, 6.718375, 9.01025</field>
                    </shadow>
                  </value>
                </block>`
        },
        {
          xml : `<block type="variables_set">
                  <field name="VAR">object_info</field>
                    <value name="VALUE">
                      <block type="k210_kpu_object_detection_get_output" inline="false"></block>
                    </value>
                </block>`
        },
        'k210_kpu_object_detection_get_object_count',
        {
          xml : `<block type="k210_kpu_object_detection_get_object_info">
                  <value name="index">
                    <shadow type="math_number">
                      <field name="NUM">0</field>
                    </shadow>
                  </value>
                </block>`
        }
      ]
    }
  ]

};
