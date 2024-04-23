"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "activity",
  setup(__props) {
    const lectures = common_vendor.ref([]);
    const showLectures = common_vendor.ref([]);
    const searchQuery = common_vendor.ref("");
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
    function formatDate(dateString) {
      const date = new Date(dateString);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      };
      return date.toLocaleDateString("zh-CN", options);
    }
    function slideToTop() {
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        duration: 260
      });
    }
    function searchLectures() {
      showLectures.value = lectures.value.filter(
        (lecture) => lecture.lecture_name.includes(searchQuery.value)
      );
      searchQuery.value = "";
    }
    function filterOngoing() {
      const now = /* @__PURE__ */ new Date();
      showLectures.value = lectures.value.filter((lecture) => new Date(lecture.lecture_time) > now);
      console.log(showLectures.value);
    }
    function filterExpired() {
      const now = /* @__PURE__ */ new Date();
      showLectures.value = lectures.value.filter((lecture) => new Date(lecture.lecture_time) < now);
      console.log(showLectures.value);
    }
    function navigateToDetail(item) {
      console.log("跳转页面的id", item.lecture_id);
      common_vendor.index.navigateTo({
        url: `/pages/lectureDetail/lectureDetail?lecture_id=${item.lecture_id}`
      });
    }
    function fetchLecture() {
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/lecturesInfo",
        method: "GET",
        success(res) {
          lectures.value = res.data.result.sort((a, b) => b.lecture_id - a.lecture_id);
          showLectures.value = lectures.value;
          console.log(showLectures.value);
        },
        fail(err) {
          console.error("Failed to fetch lectures:", err);
        }
      });
    }
    common_vendor.onShow(() => {
      fetchLecture();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: iconImage.search_img,
        b: searchQuery.value,
        c: common_vendor.o(($event) => searchQuery.value = $event.detail.value),
        d: common_vendor.o(searchLectures),
        e: common_vendor.o(filterOngoing),
        f: common_vendor.o(filterExpired),
        g: common_vendor.o(fetchLecture),
        h: common_vendor.f(showLectures.value, (lecture, index, i0) => {
          return {
            a: lecture.lecture_image_url,
            b: common_vendor.t(lecture.lecture_name),
            c: common_vendor.t(lecture.lecture_introduction),
            d: common_vendor.t(formatDate(lecture.lecture_time)),
            e: common_vendor.t(lecture.location),
            f: common_vendor.t(lecture.viewed),
            g: index,
            h: common_vendor.o(($event) => navigateToDetail(lecture), index)
          };
        }),
        i: iconImage.time_img,
        j: iconImage.location_img,
        k: iconImage.visit_img,
        l: showToTop.value
      }, showToTop.value ? {
        m: common_vendor.o(slideToTop)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Uniapp_project/Lecture/pages/activity/activity.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
