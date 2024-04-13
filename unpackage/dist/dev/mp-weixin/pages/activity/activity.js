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
    const lectures = common_vendor.ref([]);
    function formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
      return date.toLocaleDateString("zh-CN", options);
    }
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
    common_vendor.onMounted(() => {
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/lecturesInfo",
        method: "GET",
        success(res) {
          lectures.value = res.data.result;
          console.log(lectures.value);
        },
        fail(err) {
          console.error("Failed to fetch lectures:", err);
        }
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: iconImage.search_img,
        b: iconImage.shift_img,
        c: common_vendor.f(lectures.value, (lecture, index, i0) => {
          return {
            a: lecture.lecture_image_url,
            b: common_vendor.t(lecture.lecture_name),
            c: common_vendor.t(lecture.lecture_introduction),
            d: common_vendor.t(formatDate(lecture.lecture_time)),
            e: common_vendor.t(lecture.location),
            f: common_vendor.t(lecture.visitor),
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
