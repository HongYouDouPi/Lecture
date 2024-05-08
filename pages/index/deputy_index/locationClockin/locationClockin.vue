<template>
	<!-- <map class="map" :latitude="latitude" :longitude="longitude" :markers="covers"
		@regionchange="handleRegionChange"></map> -->

	<map class="map" :latitude="latitude" :longitude="longitude" :markers="covers"></map>

	<form @submit.prevent="calculateLocation">
		<input type="text" v-model="start.address" placeholder="起点" />
		<input type="text" v-model="dest.address" placeholder="终点" />
		<button form-type="submit">打卡</button>
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

	import {
		useStore
	} from 'vuex';
	// 获取 Vuex Store 实例
	const store = useStore();
	// 获取全局的 studentId
	const studentId = store.getters.studentId;

	// 引入腾讯地图APi
	import QQMapWX from '@/libs/qqmap-wx-jssdk.js';

	// 定义标记设置点的经纬度
	const latitude = ref(0);
	const longitude = ref(0);
	const lectureId = ref('')
	const lectureTime = ref('')
	const covers = ref([]); // 存放标记点数组  
	const Distance = ref('');

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

	// 腾讯地图Key
	const qqmapsdk = new QQMapWX({
		key: 'B3MBZ-NEPW5-QEGIB-IDQMT-GQO4S-SBBSH' //这里填写自己申请的key
	});

	function calculateTime() {
		// 获取当前时间
		let currentTime = new Date();
		// 将 lectureTime 转换为 Date 对象
		// console.log(lectureTime.value)
		let Time = new Date(lectureTime.value);
		console.log(Time)
		// 计算当前时间和 lectureTime 的时间差（单位：毫秒）
		const timeDiff = Time.getTime() - currentTime.getTime();
		// 将时间差转换为分钟
		const minutesDiff = Math.abs(timeDiff / (1000 * 60));

		// 判断是否在未来的一小时内和过去的20分钟内
		if (timeDiff > 0 && minutesDiff <= 20) {
			// 在未来的一小时内
			console.log('早到20分钟')
			return true;
		} else if (timeDiff < 0 && minutesDiff <= 60) {
			// 在过去的20分钟内
			console.log('开始一小时内')
			return true;
		} else {
			// 不在指定时间范围内
			console.log('不在指定时间范围内',timeDiff,minutesDiff)
			return false;
		}
	}
	// 获取经纬度 =>获得起点 我的位置
	function getCurrentLocation() {
		uni.getLocation({
			type: 'gcj02',
			success: (res) => {
				latitude.value = res.latitude;
				longitude.value = res.longitude;
				// 逆解析地址 返回address
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
						// 在地图上显示出来
						const startLocation = {
							id: "0",
							latitude: Number(latitude.value),
							longitude: Number(longitude.value),
							iconPath: '../../../../static/image/icon/star.png',
							width: 15,
							height: 15,
							adress: info.address
						};
						const destLocation = {
							id: "1",
							latitude: dest.value.latitude,
							longitude: dest.value.longitude,
							iconPath: '../../../../static/image/icon/position.png',
							width: 15,
							height: 15,
							address: dest.value.address
						};
						covers.value = [startLocation, destLocation];
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

	// 设置终点 讲座位置
	function setDest() {
		// console.log('dest.value.latitude',dest.value.latitude,dest.value.longitude)
		// 腾讯地图Api
		qqmapsdk.reverseGeocoder({
			location: {
				latitude: dest.value.latitude,
				longitude: dest.value.longitude
			},
			success(response) {
				let info = response.result;
				// 设置终点位置
				dest.value.address = info.address;
				console.log("终点设置-讲座地点", info);
			},
			fail: (error) => {
				console.error('逆地址解析失败2', error);
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
						Distance.value = element.distance;
						console.log(`两地距离为：${Distance.value}米`);
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

		if (Distance.value < 60 && calculateTime()) {
			// 提交打卡
			postClock()
		} else {
			if(calculateTime())
			uni.showModal({
				title: '在靠近一点试试呢',
				showCancel:false
			})
			else if(Distance.value < 60){
				uni.showModal({
					title: '来的不是时候',
					showCancel:false
				})
			}
			else{
				uni.showModal({
					title: '不在指定范围和时间内',
					showCancel:false
				})
			}
		}
	}

	function postClock() {
		let data = {
			lecture_id: lectureId.value,
			student_id: studentId,
		}
		uni.request({
			let port = store.getters.port;
			url: `http://${port}/booking/clock`,
			method: 'POST',
			data: data,
			success(res) {
				uni.showModal({
					title: '来的正是时候',
					content:'快和大家一起参加活动/讲座叭！',
					showCancel:false
				})
				console.log(res)
			},
			fail(err) {
				uni.showModal({
					title: '好像...网络不是很好',
					content:'手机指天再试试看呢',
					showCancel:false
				})
				console.error('Failed to postClock:', err);
			}
		})
	}


	onLoad((e) => {
		const data = e;
		console.log('打印此值', data)
		// 设置终点 讲座位置
		dest.value.latitude = data.lat;
		dest.value.longitude = data.lot;
		lectureId.value = data.lecture_id;
		lectureTime.value = data.time;
	})
	// 在组件加载时调用  
	onMounted(() => {
		getCurrentLocation();
		setDest();
	});
</script>

<style>
	.map {
		width: 750rpx;
		height: 1000rpx;
	}

	/* 样式代码 */
</style>