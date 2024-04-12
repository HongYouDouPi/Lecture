"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "mypublish",
  setup(__props) {
    const lectures = common_vendor.ref([]);
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
      return new Date(dateString).toLocaleDateString("zh-CN", options);
    };
    common_vendor.onMounted(() => {
      common_vendor.index.request({
        url: "http://127.0.0.1:8000/lectures",
        method: "GET",
        success(res) {
          lectures.value = res.data;
        },
        fail(err) {
          console.error("Failed to fetch lectures:", err);
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(lectures.value, (lecture, index, i0) => {
          return {
            a: lecture.lecture_image_url,
            b: common_vendor.t(lecture.lecture_name),
            c: common_vendor.t(formatDate(lecture.lecture_time)),
            d: common_vendor.t(lecture.location),
            e: common_vendor.t(lecture.lecture_introduction),
            f: common_vendor.t(lecture.lecture_announcement),
            g: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Graduation_project/Lecture/pages/mypublish/mypublish.vue"]]);
wx.createPage(MiniProgramPage);
