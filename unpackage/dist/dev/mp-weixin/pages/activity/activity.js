"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "activity",
  setup(__props) {
    common_vendor.ref(0);
    common_vendor.ref(0);
    common_vendor.ref(0);
    const showToTop = common_vendor.ref(false);
    const iconImage = common_vendor.reactive({
      search_img: "https://www.freeimg.cn/i/2024/02/07/65c2f021a2f3f.png",
      shift_img: "https://www.freeimg.cn/i/2024/02/07/65c2f021a1f61.png",
      visit_img: "https://www.freeimg.cn/i/2024/02/07/65c2f021a265e.png",
      time_img: "https://www.freeimg.cn/i/2024/02/07/65c2f021a28a5.png",
      location_img: "https://www.freeimg.cn/i/2024/02/07/65c2f021a2b30.png"
    });
    const lecture = common_vendor.ref(
      [
        { id: 1, name: "宣讲会", time: "2024/2/10", brief: "快来看看准研究生们都具备哪些品质吧！(不超过25个字)", pic: "https://www.freeimg.cn/i/2024/01/31/65b9dea2d7399.jpg", location: "理科南", visitor: "82", way: "线上" },
        { id: 2, name: "茶话会", time: "2024/2/11", brief: "有你up的茶品嘛？", pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9f76e3b.jpg", location: "风雨走廊", visitor: "12", way: "线下" },
        { id: 3, name: "品牌会", time: "2024/2/12", brief: "这些品牌居然是黑榜！", pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9e09908.jpg", location: "北区篮球场", visitor: "10222", way: "线下" },
        { id: 4, name: "研讨会", time: "2024/2/13", brief: "俗话说:俗话说的好！", pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9bc4c2d.jpg", location: "理科北", visitor: "112", way: "线上" },
        { id: 5, name: "茶话会", time: "2024/2/11", brief: "有你up的茶品嘛？", pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9d992d7.jpg", location: "文俊楼", visitor: "122", way: "线下" },
        { id: 6, name: "品牌会", time: "2024/2/12", brief: "这些品牌居然是黑榜！", pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9c64d6f.jpg", location: "田径场", visitor: "123", way: "线下" }
      ]
    );
    function slideToTop() {
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        duration: 260
      });
    }
    function navigateToDetail() {
      common_vendor.index.navigateTo({
        url: "/pages/lectureDetail/lectureDetail"
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: iconImage.search_img,
        b: iconImage.shift_img,
        c: common_vendor.f(lecture.value, (lecture2, index, i0) => {
          return {
            a: lecture2.pic,
            b: common_vendor.t(lecture2.name),
            c: common_vendor.t(lecture2.brief),
            d: common_vendor.t(lecture2.time),
            e: common_vendor.t(lecture2.location),
            f: common_vendor.t(lecture2.visitor),
            g: index
          };
        }),
        d: iconImage.time_img,
        e: iconImage.location_img,
        f: iconImage.visit_img,
        g: common_vendor.o(navigateToDetail),
        h: showToTop.value
      }, showToTop.value ? {
        i: common_vendor.o(slideToTop)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Graduation_project/Lecture/pages/activity/activity.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
