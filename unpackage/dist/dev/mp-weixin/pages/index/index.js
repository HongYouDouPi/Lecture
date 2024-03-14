"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const swiper_index = common_vendor.ref(
      [
        {
          id: "1",
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de8cb4a8f.jpg"
        },
        {
          id: "2",
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9a30031.jpg"
        },
        {
          id: "3",
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9b7022d.jpg"
        },
        {
          id: "4",
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9a57c43.jpg"
        }
      ]
    );
    common_vendor.ref(
      [
        {
          id: 1,
          name: "测试",
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9a57c43.jpg"
        },
        {
          id: 2,
          name: "测试",
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9a57c43.jpg"
        },
        {
          id: 3,
          name: "测试",
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9a57c43.jpg"
        },
        {
          id: 4,
          name: "测试",
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9a57c43.jpg"
        }
      ]
    );
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(swiper_index.value, (item, k0, i0) => {
          return {
            a: item.pic,
            b: item.id
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Graduation_project/Lecture/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
