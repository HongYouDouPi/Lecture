"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  __name: "test",
  setup(__props) {
    const lectureName = common_vendor.ref("");
    const lectureDate = common_vendor.ref("");
    const lectureTime = common_vendor.ref("");
    let lectureImage = null;
    function dateChanged(event) {
      lectureDate.value = event.detail.value;
    }
    function timeChanged(event) {
      lectureTime.value = event.detail.value;
    }
    function handleFileChange(event) {
      console.log(event);
      lectureImage = event.target.files[0];
    }
    async function submitForm() {
      const formData = new FormData();
      formData.append("lectureName", lectureName.value);
      formData.append("lectureDate", lectureDate.value);
      formData.append("lectureTime", lectureTime.value);
      formData.append("lectureImage", lectureImage);
      try {
        const response = await fetch("/lectures", {
          method: "POST",
          body: formData
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
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
        j: common_vendor.o(submitForm)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Graduation_project/Lecture/pages/index/deputy_index/test/test.vue"]]);
wx.createPage(MiniProgramPage);
