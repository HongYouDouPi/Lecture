"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "join",
  setup(__props) {
    const store = common_vendor.useStore();
    const studentId = common_vendor.ref("");
    studentId.value = store.getters.studentId;
    const lectures = common_vendor.ref([]);
    const type = common_vendor.ref("");
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
    function clockLecture(item) {
      common_vendor.index.navigateTo({
        url: `/pages/index/deputy_index/locationClockin/locationClockin?lecture_id=${item.lecture_id}&lat=${item.latitude}&lot=${item.longitude}&time=${item.lecture_time}`
      });
      console.log("跳转打卡", item);
    }
    function fetchLecture() {
      common_vendor.index.request({
        url: `http://127.0.0.1:8080/bookInfo?student_id=${studentId.value}&style=${type.value}`,
        method: "GET",
        success(res) {
          lectures.value = res.data.lecture.sort((a, b) => b.lecture_id - a.lecture_id);
          console.log(lectures.value);
        },
        fail(err) {
          console.error("Failed to fetch lectures:", err);
        }
      });
    }
    common_vendor.onLoad((e) => {
      studentId.value = e.student_id;
      type.value = e.style;
      console.log(studentId.value, type.value);
    });
    common_vendor.onMounted(() => {
      fetchLecture();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(lectures.value, (lecture, index, i0) => {
          return {
            a: lecture.lecture_image_url,
            b: common_vendor.o(($event) => navigateToDetail(lecture), index),
            c: common_vendor.t(lecture.lecture_name),
            d: common_vendor.t(formatDate(lecture.lecture_time)),
            e: common_vendor.t(lecture.location),
            f: common_vendor.o(($event) => clockLecture(lecture), index),
            g: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Uniapp_project/Lecture/pages/join/join.vue"]]);
wx.createPage(MiniProgramPage);
