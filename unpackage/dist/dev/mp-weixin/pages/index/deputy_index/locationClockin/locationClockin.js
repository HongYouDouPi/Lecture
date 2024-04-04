"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      latitude: 23.040467,
      longitude: 113.370429,
      covers: []
      //存放标记点数组
    };
  },
  onLoad() {
    this.getLocation();
    this.setCovers(this.latitude, this.longitude);
  },
  methods: {
    //获取经纬度
    getLocation() {
      let that = this;
      common_vendor.index.getLocation({
        type: "gcj02",
        success: (res) => {
          let {
            latitude,
            longitude
          } = res;
          that.latitude = latitude;
          that.longitude = longitude;
          that.setCovers(latitude, longitude);
        }
      });
    },
    //地图视野发生变化
    regionchange(e) {
      if (e.type === "end") {
        let {
          latitude,
          longitude
        } = e.detail.centerLocation;
        this.setCovers(latitude, longitude);
      } else if (e.type == "regionchange") {
        this.mapContext = common_vendor.index.createMapContext("map", this);
        this.mapContext.getCenterLocation({
          type: "gcj02",
          success: (res) => {
            let {
              latitude,
              longitude
            } = res;
            this.setCovers(latitude, longitude);
          },
          fail: (err) => {
          }
        });
      }
    },
    //设置点位
    setCovers(latitude, longitude) {
      let location = {
        id: "0",
        latitude: Number(latitude),
        longitude: Number(longitude),
        width: common_vendor.index.upx2px(20),
        height: common_vendor.index.upx2px(20),
        iconPath: "../../../static/定点.png"
      };
      this.covers = [location];
    },
    //提交
    submit() {
      let that = this;
      common_vendor.index.showLoading({
        title: "提交中"
      });
      that.myAmapFun.getRegeo({
        location: `${this.longitude},${this.latitude}`,
        success: function(res) {
          common_vendor.index.hideLoading();
          if (res.length > 0) {
            common_vendor.index.$emit("changeAddress", res[0]);
            common_vendor.index.navigateBack({
              delta: 1
            });
          } else {
            common_vendor.index.$u.toast("地址解析失败");
          }
        },
        fail: function(res) {
          common_vendor.index.hideLoading();
          common_vendor.index.$u.toast("地址解析失败");
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.latitude,
    b: $data.longitude,
    c: $data.covers,
    d: common_vendor.o((...args) => $options.regionchange && $options.regionchange(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Aser/Graduation_project/Lecture/pages/index/deputy_index/locationClockin/locationClockin.vue"]]);
wx.createPage(MiniProgramPage);
