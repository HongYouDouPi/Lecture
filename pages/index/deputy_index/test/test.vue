<template>
	<view>
		<!-- 整合后的发布条目输入字段 -->
		<view class="input-wrapper">
			<!-- 上传图片 -->
			<!-- <view class="input-wrapper">
		    <button @click="UploadImage" class="submit-button">选择图片并上传</button>
		  </view> -->
			<!-- 上传图片 -->
			<view v-if="lectureImage">
				<image :src="lectureImage" class="uploaded-image" mode="aspectFill"></image>
			</view>
			<view v-else class="input-wrapper">
				<button @click="UploadImage" class="submit-button">选择图片并上传</button>
			</view>
			<input type="text" v-model="lectureName" placeholder="讲座名称" class="input-field">
		</view>
		<view class="input-wrapper">
			<picker mode="date" :value="lectureDate" @change="dateChanged" class="input-field">
				<view class="picker">日期：{{ lectureDate }}</view>
			</picker>
		</view>
		<view class="input-wrapper">
			<picker mode="time" :value="lectureTime" @change="timeChanged" class="input-field">
				<view class="picker">时间：{{ lectureTime }}</view>
			</picker>
		</view>
		<view class="input-wrapper">
			<view class="input-title">讲座简介：
				<textarea v-model="lectureIntroduction" placeholder="请输入讲座详情" class="large-input-field"></textarea>
			</view>
		</view>
		<view class="input-wrapper">
			<view class="input-title">公告：
				<textarea v-model="lectureAnnouncement" placeholder="请输入公告" class="large-input-field"></textarea>
			</view>
		</view>
		<view class="input-wrapper">
			<view class="input-title">地点：</view>
			<text>{{ location.address }}</text>
		</view>

		<button @click="submitForm" class="submit-button">提交</button>

		<!-- 原始 -->
		<view class="selectLocation" @click="navigateToMap">
			<text>地图选点</text>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		onUnmounted
	} from 'vue';
	import {
		useStore
	} from 'vuex';
	// 获取 Vuex Store 实例
	const store = useStore();
	const port = store.getters.port;
	const lectureName = ref('');
	const lectureDate = ref('');
	const lectureTime = ref('');
	const lectureIntroduction = ref('');
	const lectureAnnouncement = ref('');
	const location = ref('');
	const lectureImage = ref('');
	const DellectureImage = ref('');

	function dateChanged(event) {
		lectureDate.value = event.detail.value;
	}

	function timeChanged(event) {
		lectureTime.value = event.detail.value;
	}

	// 选择图片并上传
	function UploadImage() {
		uni.chooseImage({
			success: chooseImageRes => {
				const tempFilePaths = chooseImageRes.tempFilePaths;
				uni.uploadFile({
					url: `http://${port}/upload`, // 您的服务器端点
					filePath: tempFilePaths[0],
					name: 'file',
					success: uploadFileRes => {
						const data = JSON.parse(uploadFileRes.data);
						console.log("上传结果", data);

						// if (data && data.links) {

						// 	// console.log("访问地址1",data.links.url);
						// 	console.log("访问地址2",data.links);
						//   // lectureImage.value = data.links.url;
						//   console.log("访问地址", lectureImage.value);
						// } else {
						//   console.error("上传成功，但无法获取图片链接");
						// }
						if (data.status) {
							// 如果上传成功，则保存图片URL到lectureImage变量
							lectureImage.value = data.data.links.url; // 获取图片URL并赋值
							DellectureImage.value = data.data.links.delete_url
							console.log("图片URL:", lectureImage.value); // 输出图片URL，以便调试
						} else {
							// 这里处理上传失败的情况
							uni.showModal({
								title: '上传失败',
								content: data.message,
								showCancel: false
							});
						}
					},
					fail: uploadFileErr => {
						// 这里处理网络错误或其他错误的情况
						console.error("上传失败", uploadFileErr);
						uni.showModal({
							title: '上传失败',
							content: '无法连接到服务器',
							showCancel: false
						});
					}
				});
			}
		});
	}

	// 表单提交- 提交到数据库
	async function submitForm() {
		const data = {
			lecture_name: lectureName.value,
			// lectureDate: lectureDate.value,
			// lectureTime: lectureTime.value,
			lecture_time: lectureDate.value + ' ' + lectureTime.value,
			// 多文字
			lecture_introduction: lectureIntroduction.value,
			lecture_announcement: lectureAnnouncement.value,
			// 图像
			lecture_image_url: lectureImage.value,
			lecture_image_delurl: DellectureImage.value,
			// 地理位置
			longitude: location.value.delete_url,
			location: location.value.address,
			latitude: location.value.latitude,
			longitude: location.value.longitude,
		};

		try {
			const response = await uni.request({
				//后端接口
				url: `http://${port}/lecturesInfoSend`,
				method: 'POST',
				data: data
			});
			console.log(response.data);
		} catch (error) {
			console.error('上传错误：Error submitting form:', error);
		}
	}

	// 跳转到地图逻辑
	function navigateToMap() {
		uni.navigateTo({
			url: '/pages/index/deputy_index/obtainLocation/obtainLocation'
		})
	}


	onMounted(() => {
		// 监听事件
		uni.$on('locationSelected', (e) => {
			// 接收到数据后的处理
			location.value = e;
			console.log("拿到数据", location.value)
		});
	});
	// 在组件销毁时解绑事件监听
	onUnmounted(() => {
		uni.$off('locationSelected');
	});
</script>

<style lang="scss">
	.container {
		display: flex;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
		flex-direction: column;
		/* 垂直方向排列 */
		padding: 20rpx;
	}

	.input-wrapper {
		margin-bottom: 20rpx;
	}

	.input-field {
		height: 80rpx;
		// width: 80%;
		font-size: 28rpx;
		line-height: 80rpx;
		border: 1px solid #ccc;
		border-radius: 10rpx;
		padding: 0 20rpx;
		margin: 20rpx 35rpx;
	}

	.input-title {
		font-size: 28rpx;
		margin-bottom: 10rpx;
		margin: 10rpx 30rpx;
	}

	.large-input-field {
		height: 200rpx;
		/* 调整文本框的高度 */
		// width: 100%;
		font-size: 28rpx;
		border: 1px solid #ccc;
		border-radius: 10rpx;
		padding: 20rpx;
		/* 增加内边距 */
		resize: none;
		/* 禁止文本框大小调整 */
	}

	.picker {
		background-color: white;
		text-align: center;
	}

	.submit-button {
		height: 80rpx;
		line-height: 80rpx;
		background-color: #1aad19;
		color: white;
		font-size: 32rpx;
		border: none;
		border-radius: 10rpx;
	}

	.selectLocation {
		height: 80rpx;
		width: 200rpx;
		background-color: #d3f0d3;
		/* 淡绿色背景 */
		color: #333;
		/* 文字颜色稍深 */
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		/* 添加底部间距 */
		font-size: 28rpx;
		box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
		/* 添加阴影效果 */
		padding: 10rpx;
		/* 调整内边距 */
		margin-top: 20rpx;
		/* 添加顶部间距 */
	}

	.uploaded-image {
		width: 100%;
		/* 设置图片宽度 */
		height: 400rpx;
		/* 设置图片高度 */
		// object-fit: cover; /* 图片等比例缩放并填充容器 *
		border-radius: 10rpx;
		/* 设置圆角 */
		margin-bottom: 20rpx;
		/* 设置下方间距 */
	}
</style>