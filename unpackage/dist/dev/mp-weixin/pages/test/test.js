"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "test",
  setup(__props) {
    const lectures = common_vendor.ref([]);
    common_vendor.onMounted(() => {
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/lectures",
        // 替换为你的后端接口地址
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
            a: common_vendor.t(lecture.name),
            b: common_vendor.t(lecture.time),
            c: common_vendor.t(lecture.location),
            d: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Graduation_project/Lecture/pages/test/test.vue"]]);
wx.createPage(MiniProgramPage);
