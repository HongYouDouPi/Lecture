<template>
  <view>
    <!-- 使用 uni.map 组件展示地图 -->
    <map class="map" 
	:latitude="latitude" 
	:longitude="longitude" 
	@regionchange="onMapChange"></map>
  </view>
</template>

<script>
export default {
  data() {
    return {
      latitude: 0, // 初始纬度
      longitude: 0, // 初始经度
    };
  },
  methods: {
    // 获取当前位置经纬度
    getCurrentLocation() {
      uni.getLocation({
        type: 'gcj02',
        success: res => {
          this.latitude = res.latitude;
          this.longitude = res.longitude;
		  console.log("当前位置:",this.latitude,this.longitude);
        },
        fail: err => {
          console.error('获取位置信息失败', err);
        }
      });
    },
    // 监听地图变化事件
    onMapChange(event) {
      // 判断变化类型是否为拖动结束
	  console.log(event);
	  // let e = this.event;
      if (event.type === 'end') {
        // 获取屏幕中心地图的经纬度
        const { latitude, longitude } = event.detail;
		console.log('屏幕中心地图经纬度:', latitude, longitude);
      }
    }
  },
  onLoad() {
    // 页面加载时获取当前位置经纬度
    this.getCurrentLocation();
  }
};
</script>

<style>  
.map{
	width: 750rpx;
	height: 1000rpx;
}
/* 样式代码 */  
</style>