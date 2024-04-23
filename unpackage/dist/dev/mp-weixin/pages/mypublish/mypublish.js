"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "mypublish",
  setup(__props) {
    const store = common_vendor.useStore();
    const studentId = store.getters.studentId;
    const lectures = common_vendor.ref([]);
    const formatDate = (dateString) => {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      };
      return new Date(dateString).toLocaleDateString("zh-CN", options);
    };
    function navigateToDetail(item) {
      console.log("跳转页面的id", item.lecture_id);
      common_vendor.index.navigateTo({
        url: `/pages/lectureDetail/lectureDetail?lecture_id=${item.lecture_id}`
      });
    }
    common_vendor.onMounted(() => {
      common_vendor.index.request({
        url: `http://127.0.0.1:8080/lecturesInfo/publish?student_id=${studentId}`,
        method: "GET",
        success(res) {
          lectures.value = res.data;
          console.log(lectures.value);
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
            e: index,
            f: common_vendor.o(($event) => navigateToDetail(lecture), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Uniapp_project/Lecture/pages/mypublish/mypublish.vue"]]);
wx.createPage(MiniProgramPage);
