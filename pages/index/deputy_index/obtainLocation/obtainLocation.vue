<template>
	<!-- v-if="isMapLoading" -->
	<map class="map" :latitude="latitude" :longitude="longitude" :markers="covers"
		@regionchange="handleRegionChange"></map>

	<form @submit.prevent="submitLocation">
		<!-- <input type="text" v-model="start.address" placeholder="起点" />  -->
		<input type="text" v-model="dest.address" placeholder="终点" />
		<button form-type="submit">确定设置</button>
	</form>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app'

	// 引入腾讯地图APi
	import QQMapWX from '@/libs/qqmap-wx-jssdk.js';

	// 定义标记设置点的经纬度
	const latitude = ref(0);
	const longitude = ref(0);
	const covers = ref([]); // 存放标记点数组  

	const start = ref({
		latitude: 0,
		longitude: 0,
		address: ""
	});
	const dest = ref({
		latitude: 0,
		longitude: 0,
		address: ""
	});

	const isMapLoading = ref(true)

	// 腾讯地图Key
	const qqmapsdk = new QQMapWX({
		key: 'B3MBZ-NEPW5-QEGIB-IDQMT-GQO4S-SBBSH' //这里填写自己申请的key
	});

	// 获取经纬度 =>获得起点 
	function getCurrentLocation() {
		uni.getLocation({
			type: 'gcj02',
			success: (res) => {
				latitude.value = res.latitude;
				longitude.value = res.longitude;
				// console.log("当前(起点)位置",latitude.value,longitude.value)
				// 设置起点
				qqmapsdk.reverseGeocoder({
					location: {
						latitude: latitude.value,
						longitude: longitude.value,
					},
					success: (response) => {
						let info = response.result;
						start.value.latitude = latitude.value;
						start.value.longitude = longitude.value
						start.value.address = info.address;
						// console.log("已设置起点", start);
					},
					fail: (error) => {
						console.error('逆地址解析失败', error);
					}
				})
			},
			fail: (err) => {
				console.error('获取位置信息失败', err);
			}
		});
	};

	// 地图视野发生变化  
	function handleRegionChange(e) {
		// 屏幕滑动结束
		if (e.type === 'end') {
			// 设置点位  
			throttledSetCovers(e.detail.centerLocation.latitude, e.detail.centerLocation.longitude);
		}
	};

	// 设置点位  
	function setCovers(Latitude, Longitude) {
		// 先设置终点坐标
		dest.value.latitude = Latitude;
		dest.value.longitude = Longitude;

		// console.log("节流函数setCovers执行一次");
		// console.log("初始位置",latitude.value,longitude.value)	  
		// 腾讯地图Api
		qqmapsdk.reverseGeocoder({
			location: {
				latitude: Latitude,
				longitude: Longitude
			},
			success(response) {
				let info = response.result;
				// console.log(info.address);
				// 先设置终点位置
				dest.value.address = info.address;
				const location = {
					id: "0",
					latitude: Number(Latitude),
					longitude: Number(Longitude),
					// 图片标记点
					iconPath: '../../../../static/image/icon/position.png',
					width: 15,
					height: 15,
					adress: info.address
				};
				console.log("来自腾讯地图Api", info);
				// 打印基本位置信息
				// console.log("回传的位置信息",location);
				covers.value = [location];
				// console.log("收到的的位置信息",covers.value);
				// 可以显示地图
				// isMapLoading.value = true;
			}
		})
	}

	// 计算距离
	function calculateLocation() {
		// 创建起点终点的新的非ref对像
		const startLocation = {
			latitude: start.value.latitude,
			longitude: start.value.longitude
		};
		const destLocation = [{
			latitude: dest.value.latitude,
			longitude: dest.value.longitude
		}];

		// 检查元素
		// console.log("检查元素",startLocation,destLocation);   
		qqmapsdk.calculateDistance({
			// 直线距离
			mode: 'straight',
			from: startLocation || '',
			to: destLocation,
			success(response) {
				// console.log("来自腾讯Api距离计算",response.result);
				const elements = response.result.elements;
				if (Array.isArray(elements)) {
					elements.forEach((element, index) => {
						const Distance = element.distance;
						console.log(`两地距离为：${Distance}米`);
					});
				} else {
					console.error('elements 数组为空或未定义');
				}

				// console.log("来自腾讯Api距离计算",response.result.element[0]);
			},
			fail(error) {
				console.error(error);
			}
		})

	}

	// 返回目的地址给上一页
	function submitLocation() {
		const location = dest.value;
		// 发送事件，并传递数据
		uni.$emit('locationSelected', location);
		console.log("发送数据", location);

		// 返回上一页
		uni.navigateBack({
			delta: 1 // 返回上一页的层数，这里假设上一页就在当前页面的前一层
		});
	}


	// 自定义节流函数  
	function throttle(func, delay) {
		let lastCall = 0;
		return function(...args) {
			const now = new Date().getTime();
			if (now - lastCall < delay) {
				// console.log("还有",now - lastCall,"ms")
				return;
			}
			lastCall = now;
			// console.log("执行一次");
			return func(...args);
		};
	}

	// 创建 handleRegionChange 的节流版本  
	const throttledHandleRegionChange = throttle(handleRegionChange, 300); // 假设延迟为 300 毫秒  
	// 节流 setCover 函数
	const throttledSetCovers = throttle(setCovers, 300);

	// 在组件加载时调用  
	onMounted(() => {
		getCurrentLocation();
	});
</script>

<style>
	.map {
		width: 750rpx;
		height: 1000rpx;
	}

	/* 样式代码 */
</style>