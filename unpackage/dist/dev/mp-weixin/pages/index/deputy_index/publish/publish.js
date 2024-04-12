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
    const lectureImage = common_vendor.ref("");
    const DellectureImage = common_vendor.ref("");
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
            // 您的服务器端点
            filePath: tempFilePaths[0],
            name: "file",
            success: (uploadFileRes) => {
              const data = JSON.parse(uploadFileRes.data);
              console.log("上传结果", data);
              if (data.status) {
                lectureImage.value = data.data.links.url;
                DellectureImage.value = data.data.links.delete_url;
                console.log("图片URL:", lectureImage.value);
              } else {
                common_vendor.index.showModal({
                  title: "上传失败",
                  content: data.message,
                  showCancel: false
                });
              }
            },
            fail: (uploadFileErr) => {
              console.error("上传失败", uploadFileErr);
              common_vendor.index.showModal({
                title: "上传失败",
                content: "无法连接到服务器",
                showCancel: false
              });
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
        // 多文字
        lecture_introduction: lectureIntroduction.value,
        lecture_announcement: lectureAnnouncement.value,
        // 图像
        lecture_image_url: lectureImage.value,
        lecture_image_delurl: DellectureImage.value,
        // 地理位置
        longitude: location.value.delete_url,
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
      return common_vendor.e({
        a: lectureImage.value
      }, lectureImage.value ? {
        b: lectureImage.value
      } : {
        c: common_vendor.o(UploadImage)
      }, {
        d: lectureName.value,
        e: common_vendor.o(($event) => lectureName.value = $event.detail.value),
        f: common_vendor.t(lectureDate.value),
        g: lectureDate.value,
        h: common_vendor.o(dateChanged),
        i: common_vendor.t(lectureTime.value),
        j: lectureTime.value,
        k: common_vendor.o(timeChanged),
        l: lectureIntroduction.value,
        m: common_vendor.o(($event) => lectureIntroduction.value = $event.detail.value),
        n: lectureAnnouncement.value,
        o: common_vendor.o(($event) => lectureAnnouncement.value = $event.detail.value),
        p: common_vendor.t(location.value.address),
        q: common_vendor.o(submitForm),
        r: common_vendor.o(navigateToMap)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Graduation_project/Lecture/pages/index/deputy_index/publish/publish.vue"]]);
wx.createPage(MiniProgramPage);
