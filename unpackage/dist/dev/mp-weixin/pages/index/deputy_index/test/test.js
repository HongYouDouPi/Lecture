"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      selectedImages: []
      // 存储选择的图片路径  
    };
  },
  methods: {
    // 从相册中选择图片  
    async chooseImages() {
      try {
        const res = await common_vendor.index.chooseImage({
          count: 9,
          sizeType: ["original", "compressed"],
          sourceType: ["album", "camera"],
          success: (chooseImageRes) => {
            this.selectedImages = chooseImageRes.tempFilePaths;
          }
        });
      } catch (error) {
        console.error("选择图片失败", error);
      }
    },
    // 预览图片  
    async previewImages() {
      if (this.selectedImages.length) {
        try {
          await common_vendor.index.previewImage({
            current: this.selectedImages[0],
            urls: this.selectedImages
          });
        } catch (error) {
          console.error("预览图片失败", error);
        }
      } else {
        common_vendor.index.showToast({
          title: "请先选择图片",
          icon: "none"
        });
      }
    },
    // 上传图片  
    async uploadImages() {
      if (!this.selectedImages.length) {
        common_vendor.index.showToast({
          title: "请先选择图片",
          icon: "none"
        });
        return;
      }
      for (let i = 0; i < this.selectedImages.length; i++) {
        const filePath = this.selectedImages[i];
        const formData = {
          // 设置你的上传表单信息  
          "user": "someone"
        };
        try {
          const uploadRes = await common_vendor.index.uploadFile({
            url: "你的上传接口地址",
            // 替换为你的上传接口地址  
            filePath,
            name: "file",
            // 后端接收的文件字段名  
            formData,
            success: (uploadFileRes) => {
              console.log("上传成功", uploadFileRes);
            },
            fail: (error) => {
              console.error("上传失败", error);
            }
          });
        } catch (error) {
          console.error("上传图片失败", error);
        }
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.chooseImages && $options.chooseImages(...args)),
    b: $data.selectedImages.length > 0
  }, $data.selectedImages.length > 0 ? {
    c: common_vendor.o((...args) => $options.previewImages && $options.previewImages(...args))
  } : {}, {
    d: $data.selectedImages.length > 0
  }, $data.selectedImages.length > 0 ? {
    e: common_vendor.o((...args) => $options.uploadImages && $options.uploadImages(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4ca15e48"], ["__file", "D:/Aser/Graduation_project/Lecture/pages/index/deputy_index/test/test.vue"]]);
wx.createPage(MiniProgramPage);
