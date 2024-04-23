"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  __name: "moreExciting",
  setup(__props) {
    common_vendor.onMounted(() => {
      common_vendor.index.showModal({
        title: "功能待开发",
        conten: "多多支持吧！",
        showCancel: false,
        success: () => {
          common_vendor.index.navigateBack({
            delta: 1
            // 返回上一页
          });
        }
      });
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Uniapp_project/Lecture/pages/index/deputy_index/moreExciting/moreExciting.vue"]]);
wx.createPage(MiniProgramPage);
