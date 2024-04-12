"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "about",
  setup(__props) {
    const myName = common_vendor.ref("豆皮");
    const myImgUrl = common_vendor.ref("https://www.freeimg.cn/i/2024/02/07/65c2f64ebb38d.png");
    const list = common_vendor.ref([
      { name: "全部参加", pic: "https://www.freeimg.cn/i/2024/02/15/65cd870a725bc.png", path: "/pages/alljoin/alljoin" },
      { name: "已完成", pic: "https://www.freeimg.cn/i/2024/02/15/65cd860bcb186.png", path: "/pages/finished/finished" },
      { name: "待参加", pic: "https://www.freeimg.cn/i/2024/02/15/65cd860be609d.png", path: "/pages/waitjoin/waitjoin" }
    ]);
    function navigateTo_mypublish() {
      common_vendor.index.navigateTo({
        url: "/pages/mypublish/mypublish"
      });
    }
    function navigateTo_edit() {
      common_vendor.index.navigateTo({
        url: "/pages/edit/edit"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: myImgUrl.value,
        b: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: item.pic,
            b: common_vendor.t(item.name),
            c: index,
            d: common_vendor.o(($event) => _ctx.navigateTo(item.path), index)
          };
        }),
        c: common_vendor.o(navigateTo_mypublish),
        d: common_vendor.o(navigateTo_edit),
        e: myImgUrl.value,
        f: common_vendor.t(myName.value)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Graduation_project/Lecture/pages/about/about.vue"]]);
wx.createPage(MiniProgramPage);
