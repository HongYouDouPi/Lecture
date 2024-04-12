"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const reconmmandText = common_vendor.ref("推荐讲座");
    const newText = common_vendor.ref("最新讲座");
    const hotText = common_vendor.ref("热门讲座");
    const typeSelect = common_vendor.ref(["美育", "三创", "经典百书", "其他"]);
    common_vendor.ref([]);
    const currentTypeIndex = common_vendor.ref(0);
    const swiper_index = common_vendor.ref(
      [
        {
          id: 1,
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de8cb4a8f.jpg"
        },
        {
          id: 2,
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9a30031.jpg"
        },
        {
          id: 3,
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9b7022d.jpg"
        },
        {
          id: 4,
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9a57c43.jpg"
        }
      ]
    );
    const function_index = common_vendor.reactive(
      [
        {
          pic: "/static/image/icon/定位打卡.png",
          name: "打卡",
          note_text: "人到心也到",
          url: "/pages/index/deputy_index/locationClockin/locationClockin"
        },
        {
          pic: "/static/image/icon/打招呼.png",
          name: "我要发布",
          note_text: "活动在于你我",
          url: "/pages/index/deputy_index/publish/publish"
        },
        {
          pic: "/static/image/icon/敬请期待.png",
          name: "更多精彩",
          note_text: "敬请期待",
          // 测试页面
          url: "/pages/test/test"
          // 真实的在下面
          // url: 'deputy_index/moreExciting/moreExciting'
        }
      ]
    );
    const scroll_recommend = common_vendor.reactive(
      [
        {
          id: 1,
          name: "测试",
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9a57c43.jpg",
          time: "2024/3/11",
          type: 3
        },
        {
          id: 2,
          name: "测试",
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9a57c43.jpg",
          time: "2024/4/11",
          type: 1
        },
        {
          id: 3,
          name: "测试",
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9a57c43.jpg",
          time: "2024/1/11",
          type: 0
        },
        {
          id: 4,
          name: "测试",
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de9a57c43.jpg",
          time: "2024/1/11",
          type: 1
        },
        {
          id: 5,
          name: "测试",
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de8cb4a8f.jpg",
          time: "2024/2/11",
          type: 2
        },
        {
          id: 6,
          name: "测试",
          pic: "https://www.freeimg.cn/i/2024/01/31/65b9de8cb4a8f.jpg",
          time: "2024/2/11",
          type: 2
        }
      ]
    );
    function navigateTo(link) {
      common_vendor.index.navigateTo({
        url: link
      });
    }
    function navigaToActivity() {
      common_vendor.index.switchTab({
        url: "/pages/activity/activity"
      });
    }
    function navigateToDetail(item) {
      common_vendor.index.navigateTo({
        url: "/pages/lectureDetail/lectureDetail?itemId=" + item.id
      });
    }
    function typeSelectChangeHot(index) {
      currentTypeIndex.value = index;
    }
    const filterhot = common_vendor.computed(() => {
      return scroll_recommend.filter((item) => item.type === currentTypeIndex.value);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(swiper_index.value, (item, k0, i0) => {
          return {
            a: item.pic,
            b: item.id
          };
        }),
        b: common_vendor.f(function_index, (item, index, i0) => {
          return {
            a: item.pic,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.note_text),
            d: common_vendor.n(`vague_${index + 1}`),
            e: index,
            f: common_vendor.n(`function_${index + 1}_item`),
            g: common_vendor.o(($event) => navigateTo(item.url), index)
          };
        }),
        c: common_vendor.t(reconmmandText.value),
        d: common_vendor.o(navigaToActivity),
        e: common_vendor.f(scroll_recommend, (item, k0, i0) => {
          return {
            a: item.pic,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.id),
            d: common_vendor.t(item.time),
            e: common_vendor.o(($event) => navigateToDetail(item), item.id),
            f: item.id
          };
        }),
        f: common_vendor.t(newText.value),
        g: common_vendor.o(navigaToActivity),
        h: common_vendor.f(scroll_recommend, (item, k0, i0) => {
          return {
            a: item.pic,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.id),
            d: common_vendor.t(item.time),
            e: common_vendor.o(($event) => navigateToDetail(item), item.id),
            f: item.id
          };
        }),
        i: common_vendor.t(hotText.value),
        j: common_vendor.o(navigaToActivity),
        k: common_vendor.f(typeSelect.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: currentTypeIndex.value === index ? 1 : "",
            c: common_vendor.o(($event) => typeSelectChangeHot(index))
          };
        }),
        l: common_vendor.f(filterhot.value, (item, k0, i0) => {
          return {
            a: item.pic,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.id),
            d: common_vendor.o(($event) => navigateToDetail(item), item.id),
            e: item.id
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Aser/Graduation_project/Lecture/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
