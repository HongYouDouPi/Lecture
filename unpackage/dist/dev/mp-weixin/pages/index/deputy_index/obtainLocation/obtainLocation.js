"use strict";
const common_vendor = require("../../../../common/vendor.js");
const libs_qqmapWxJssdk = require("../../../../libs/qqmap-wx-jssdk.js");
const _sfc_main = {
  __name: "obtainLocation",
  setup(__props) {
    const latitude = common_vendor.ref(0);
    const longitude = common_vendor.ref(0);
    const covers = common_vendor.ref([]);
    const start = common_vendor.ref({
      latitude: 0,
      longitude: 0,
      address: ""
    });
    const dest = common_vendor.ref({
      latitude: 0,
      longitude: 0,
      address: ""
    });
    const qqmapsdk = new libs_qqmapWxJssdk.QQMapWX({
      key: "B3MBZ-NEPW5-QEGIB-IDQMT-GQO4S-SBBSH"
      //这里填写自己申请的key
    });
    function getCurrentLocation() {
      common_vendor.index.getLocation({
        type: "gcj02",
        success: (res) => {
          latitude.value = res.latitude;
          longitude.value = res.longitude;
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: latitude.value,
              longitude: longitude.value
            },
            success: (response) => {
              let info = response.result;
              start.value.latitude = latitude.value;
              start.value.longitude = longitude.value;
              start.value.address = info.address;
            },
            fail: (error) => {
              console.error("逆地址解析失败", error);
            }
          });
        },
        fail: (err) => {
          console.error("获取位置信息失败", err);
        }
      });
    }
    function handleRegionChange(e) {
      if (e.type === "end") {
        throttledSetCovers(e.detail.centerLocation.latitude, e.detail.centerLocation.longitude);
      }
    }
    function setCovers(Latitude, Longitude) {
      dest.value.latitude = Latitude;
      dest.value.longitude = Longitude;
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: Latitude,
          longitude: Longitude
        },
        success(response) {
          let info = response.result;
          dest.value.address = info.address;
          const location = {
            id: "0",
            latitude: Number(Latitude),
            longitude: Number(Longitude),
            // 图片标记点
            iconPath: "../../../../static/image/icon/position.png",
            width: 15,
            height: 15,
            adress: info.address
          };
          console.log("来自腾讯地图Api", info);
          covers.value = [location];
        }
      });
    }
    function submitLocation() {
      const location = dest.value;
      common_vendor.index.$emit("locationSelected", location);
      console.log("发送数据", location);
      common_vendor.index.navigateBack({
        delta: 1
        // 返回上一页的层数，这里假设上一页就在当前页面的前一层
      });
    }
    function throttle(func, delay) {
      let lastCall = 0;
      return function(...args) {
        const now = (/* @__PURE__ */ new Date()).getTime();
        if (now - lastCall < delay) {
          return;
        }
        lastCall = now;
        return func(...args);
      };
    }
    const throttledSetCovers = throttle(setCovers, 300);
    common_vendor.onMounted(() => {
      getCurrentLocation();
    });
    return (_ctx, _cache) => {
      return {
        a: latitude.value,
        b: longitude.value,
        c: covers.value,
        d: common_vendor.o(handleRegionChange),
        e: dest.value.address,
        f: common_vendor.o(($event) => dest.value.address = $event.detail.value),
        g: common_vendor.o(submitLocation)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Graduation_project/Lecture/pages/index/deputy_index/obtainLocation/obtainLocation.vue"]]);
wx.createPage(MiniProgramPage);
