"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      latitude: 0,
      // 初始纬度
      longitude: 0
      // 初始经度
    };
  },
  methods: {
    // 获取当前位置经纬度
    getCurrentLocation() {
      common_vendor.index.getLocation({
        type: "gcj02",
        success: (res) => {
          this.latitude = res.latitude;
          this.longitude = res.longitude;
          console.log("当前位置:", this.latitude, this.longitude);
        },
        fail: (err) => {
          console.error("获取位置信息失败", err);
        }
      });
    },
    // 监听地图变化事件
    onMapChange(event) {
      console.log(event);
      if (event.type === "end") {
        const { latitude, longitude } = event.detail;
        console.log("屏幕中心地图经纬度:", latitude, longitude);
      }
    }
  },
  onLoad() {
    this.getCurrentLocation();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.latitude,
    b: $data.longitude,
    c: common_vendor.o((...args) => $options.onMapChange && $options.onMapChange(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Aser/Graduation_project/Lecture/pages/index/deputy_index/test/test.vue"]]);
wx.createPage(MiniProgramPage);
