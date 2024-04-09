"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  __name: "publish",
  setup(__props) {
    const lectureName = common_vendor.ref("");
    const lectureDate = common_vendor.ref("");
    const lectureTime = common_vendor.ref("");
    const lectureDetail = common_vendor.ref("");
    const lectureAnnouncement = common_vendor.ref("");
    const location = common_vendor.ref("");
    function dateChanged(event) {
      lectureDate.value = event.detail.value;
    }
    function timeChanged(event) {
      lectureTime.value = event.detail.value;
    }
    function handleFileChange(event) {
      event.target.files[0];
    }
    async function submitForm() {
      const data = {
        lectureName: lectureName.value,
        lectureDate: lectureDate.value,
        lectureTime: lectureTime.value,
        lectureDetail: lectureDetail.value,
        lectureAnnouncement: lectureAnnouncement.value,
        lectureLocation: location.value
      };
      try {
        const response = await common_vendor.index.request({
          url: "/lectures",
          method: "POST",
          data
        });
        console.log(response.data);
      } catch (error) {
        console.error("上传错误：Error submitting form:", error);
      }
    }
    function navigateToMap() {
      common_vendor.index.navigateTo({
        url: "/pages/index/deputy_index/obtainLocation/obtainLocation"
      });
    }
    common_vendor.onMounted(() => {
      common_vendor.index.$on("locationSelected", (e) => {
        location.value = e;
        console.log("拿到数据", location);
      });
    });
    common_vendor.onUnmounted(() => {
      common_vendor.index.$off("locationSelected");
    });
    return (_ctx, _cache) => {
      return {
        a: lectureName.value,
        b: common_vendor.o(($event) => lectureName.value = $event.detail.value),
        c: common_vendor.t(lectureDate.value),
        d: lectureDate.value,
        e: common_vendor.o(dateChanged),
        f: common_vendor.t(lectureTime.value),
        g: lectureTime.value,
        h: common_vendor.o(timeChanged),
        i: common_vendor.o(handleFileChange),
        j: lectureDetail.value,
        k: common_vendor.o(($event) => lectureDetail.value = $event.detail.value),
        l: lectureAnnouncement.value,
        m: common_vendor.o(($event) => lectureAnnouncement.value = $event.detail.value),
        n: common_vendor.t(location.value.address),
        o: common_vendor.o(submitForm),
        p: common_vendor.o(navigateToMap)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Graduation_project/Lecture/pages/index/deputy_index/publish/publish.vue"]]);
wx.createPage(MiniProgramPage);
