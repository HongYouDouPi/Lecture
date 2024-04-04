"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    const genderSelcet = common_vendor.ref(["男", "女"]);
    return (_ctx, _cache) => {
      return {
        a: _ctx.myImgUrl,
        b: common_vendor.t(_ctx.name),
        c: genderSelcet.value,
        d: common_vendor.o((...args) => _ctx.typeSelectChange && _ctx.typeSelectChange(...args))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Graduation_project/Lecture/pages/edit/edit.vue"]]);
wx.createPage(MiniProgramPage);
