"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      name: "红油豆皮",
      myImgUrl: "https://www.freeimg.cn/i/2024/02/07/65c2f64ebb38d.png"
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.myImgUrl,
    b: common_vendor.t($data.name)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Aser/Graduation_project/Lecture/pages/edit/edit.vue"]]);
wx.createPage(MiniProgramPage);
