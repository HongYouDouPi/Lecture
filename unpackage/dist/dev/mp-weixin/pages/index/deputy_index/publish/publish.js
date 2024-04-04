"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  __name: "publish",
  setup(__props) {
    function navigateToMap() {
      common_vendor.index.navigateTo({
        url: "/pages/index/deputy_index/obtainLocation/obtainLocation"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(navigateToMap)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Graduation_project/Lecture/pages/index/deputy_index/publish/publish.vue"]]);
wx.createPage(MiniProgramPage);
