"use strict";
const common_vendor = require("../../../../common/vendor.js");
const libs_qqmapWxJssdk = require("../../../../libs/qqmap-wx-jssdk.js");
const _sfc_main = {
  __name: "locationClockin",
  setup(__props) {
    const store = common_vendor.useStore();
    const studentId = store.getters.studentId;
    const latitude = common_vendor.ref(0);
    const longitude = common_vendor.ref(0);
    const lectureId = common_vendor.ref("");
    const lectureTime = common_vendor.ref("");
    const covers = common_vendor.ref([]);
    const Distance = common_vendor.ref("");
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
    function calculateTime() {
      let currentTime = /* @__PURE__ */ new Date();
      let Time = new Date(lectureTime.value);
      console.log(Time);
      const timeDiff = Time.getTime() - currentTime.getTime();
      const minutesDiff = Math.abs(timeDiff / (1e3 * 60));
      if (timeDiff > 0 && minutesDiff <= 20) {
        console.log("早到20分钟");
        return true;
      } else if (timeDiff < 0 && minutesDiff <= 60) {
        console.log("开始一小时内");
        return true;
      } else {
        console.log("不在指定时间范围内", timeDiff, minutesDiff);
        return false;
      }
    }
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
              const startLocation = {
                id: "0",
                latitude: Number(latitude.value),
                longitude: Number(longitude.value),
                iconPath: "../../../../static/image/icon/star.png",
                width: 15,
                height: 15,
                adress: info.address
              };
              const destLocation = {
                id: "1",
                latitude: dest.value.latitude,
                longitude: dest.value.longitude,
                iconPath: "../../../../static/image/icon/position.png",
                width: 15,
                height: 15,
                address: dest.value.address
              };
              covers.value = [startLocation, destLocation];
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
    function setDest() {
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: dest.value.latitude,
          longitude: dest.value.longitude
        },
        success(response) {
          let info = response.result;
          dest.value.address = info.address;
          console.log("终点设置-讲座地点", info);
        },
        fail: (error) => {
          console.error("逆地址解析失败2", error);
        }
      });
    }
    function calculateLocation() {
      const startLocation = {
        latitude: start.value.latitude,
        longitude: start.value.longitude
      };
      const destLocation = [{
        latitude: dest.value.latitude,
        longitude: dest.value.longitude
      }];
      qqmapsdk.calculateDistance({
        // 直线距离
        mode: "straight",
        from: startLocation || "",
        to: destLocation,
        success(response) {
          const elements = response.result.elements;
          if (Array.isArray(elements)) {
            elements.forEach((element, index) => {
              Distance.value = element.distance;
              console.log(`两地距离为：${Distance.value}米`);
            });
          } else {
            console.error("elements 数组为空或未定义");
          }
        },
        fail(error) {
          console.error(error);
        }
      });
      if (Distance.value < 60 && calculateTime()) {
        postClock();
      } else {
        if (calculateTime())
          common_vendor.index.showModal({
            title: "在靠近一点试试呢",
            showCancel: false
          });
        else if (Distance.value < 60) {
          common_vendor.index.showModal({
            title: "来的不是时候",
            showCancel: false
          });
        } else {
          common_vendor.index.showModal({
            title: "不在指定范围和时间内",
            showCancel: false
          });
        }
      }
    }
    function postClock() {
      let data = {
        lecture_id: lectureId.value,
        student_id: studentId
      };
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/booking/clock",
        method: "POST",
        data,
        success(res) {
          common_vendor.index.showModal({
            title: "来的正是时候",
            content: "快和大家一起参加活动/讲座叭！",
            showCancel: false
          });
          console.log(res);
        },
        fail(err) {
          common_vendor.index.showModal({
            title: "好像...网络不是很好",
            content: "手机指天再试试看呢",
            showCancel: false
          });
          console.error("Failed to postClock:", err);
        }
      });
    }
    common_vendor.onLoad((e) => {
      const data = e;
      console.log("打印此值", data);
      dest.value.latitude = data.lat;
      dest.value.longitude = data.lot;
      lectureId.value = data.lecture_id;
      lectureTime.value = data.time;
    });
    common_vendor.onMounted(() => {
      getCurrentLocation();
      setDest();
    });
    return (_ctx, _cache) => {
      return {
        a: latitude.value,
        b: longitude.value,
        c: covers.value,
        d: start.value.address,
        e: common_vendor.o(($event) => start.value.address = $event.detail.value),
        f: dest.value.address,
        g: common_vendor.o(($event) => dest.value.address = $event.detail.value),
        h: common_vendor.o(calculateLocation)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Uniapp_project/Lecture/pages/index/deputy_index/locationClockin/locationClockin.vue"]]);
wx.createPage(MiniProgramPage);
