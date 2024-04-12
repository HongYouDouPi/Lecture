"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  __name: "publish",
  setup(__props) {
    const lectureName = common_vendor.ref("");
    const lectureDate = common_vendor.ref("");
    const lectureTime = common_vendor.ref("");
    const lectureIntroduction = common_vendor.ref("");
    const lectureAnnouncement = common_vendor.ref("");
    const location = common_vendor.ref("");
    function dateChanged(event) {
      lectureDate.value = event.detail.value;
    }
    function timeChanged(event) {
      lectureTime.value = event.detail.value;
    }
    function UploadImage() {
      common_vendor.index.chooseImage({
        success: (chooseImageRes) => {
          const tempFilePaths = chooseImageRes.tempFilePaths;
          common_vendor.index.uploadFile({
            url: "http://127.0.0.1:8080/upload",
            // 接口URL
            filePath: tempFilePaths[0],
            name: "file",
            // 对应请求参数中的file
            // formData: {
            //     // 这里可以添加其他参数，如permission, strategy_id等
            // },
            // header: {
            //     'Authorization': '315|Si0Y3HfufBwbEG50XT02eMTS5ZK5kENEUcZ8iJaM', // 需要服务器端支持
            //     'Content-Type': 'multipart/form-data'
            // },
            success: (uploadFileRes) => {
              console.log("好像成功了？", uploadFileRes.data);
            }
          });
        }
      });
    }
    async function submitForm() {
      const data = {
        lecture_name: lectureName.value,
        // lectureDate: lectureDate.value,
        // lectureTime: lectureTime.value,
        lecture_time: lectureDate.value + " " + lectureTime.value,
        lecture_introduction: lectureIntroduction.value,
        lecture_announcement: lectureAnnouncement.value,
        lecture_image_url: "https://www.freeimg.cn/i/2024/02/07/65c2f64ebba77.png",
        location: location.value.address,
        latitude: location.value.latitude,
        longitude: location.value.longitude
      };
      try {
        const response = await common_vendor.index.request({
          //后端接口
          url: "http://127.0.0.1:8080/lecturesInfoSend",
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
        console.log("拿到数据", location.value);
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
        i: common_vendor.o(UploadImage),
        j: lectureIntroduction.value,
        k: common_vendor.o(($event) => lectureIntroduction.value = $event.detail.value),
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
