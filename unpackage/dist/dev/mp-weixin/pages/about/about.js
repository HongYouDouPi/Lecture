"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 背景图和用户名从后端获取
      myName: "豆皮",
      myImgUrl: "https://www.freeimg.cn/i/2024/02/07/65c2f64ebb38d.png",
      list: [
        { name: "全部参加", pic: "https://www.freeimg.cn/i/2024/02/15/65cd870a725bc.png" },
        { name: "已完成", pic: "https://www.freeimg.cn/i/2024/02/15/65cd860bcb186.png" },
        { name: "待参加", pic: "https://www.freeimg.cn/i/2024/02/15/65cd860be609d.png" }
      ]
      // list_width:670 + 'rpx',
    };
  },
  // 生命周期函数？
  onLoad() {
    this.get_myImgUrl();
  },
  // 这里面写功能函数嘛？
  methods: {
    // 获取头像
    get_myImgUrl() {
      const Url = "https://www.freeimg.cn/i/2024/02/07/65c2f64ebb38d.png";
      this.myImgUrl = Url;
    },
    // 编辑个人信息跳转
    navigateToedit() {
      common_vendor.index.navigateTo({
        url: "/pages/edit/edit"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (list, index, i0) => {
      return {
        a: list.pic,
        b: common_vendor.t(list.name)
      };
    }),
    b: common_vendor.o(($event) => $options.navigateToedit()),
    c: $data.myImgUrl,
    d: common_vendor.t($data.myName)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Aser/Graduation_project/Lecture/pages/about/about.vue"]]);
wx.createPage(MiniProgramPage);
