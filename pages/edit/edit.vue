<template>
	<view class="whole">
		<view class="mine">
			<view class="my">
				<view class="my_basic">
					<image :src="userInfo.my_image_url" mode="aspectFit" @click="UploadImage"></image>
					<text v-if="!isEditing" @click="startEditing">{{ userInfo.user_name }}</text>
					<input class="my_basic_input" v-if="isEditing" v-model="editedUserName" @blur="saveUserName"
						placeholder="输入新名字">
				</view>
				<view class="my_avtiveInformation">
					<!-- <view class="">参加次数</view>
					<view class="">报名次数</view> -->
				</view>
			</view>
		</view>

		<view class="my_information">
			<!-- 性别选择 -->
			<view class="info_item">
				<text>性别：</text>
				<picker mode="selector" :range="genderSelcet" @change="handleGenderChange">
					<view>{{userInfo.gender || '请选择'}}</view>
				</picker>
			</view>
			<!-- 学院班级输入 -->
			<view class="info_item">
				<text>学院：</text>
				<input v-model="userInfo.college" placeholder="选填" />
			</view>
			<!-- 手机号输入 -->
			<view class="info_item">
				<text>手机号：</text>
				<input v-model="userInfo.phone_number" placeholder="请输入手机号" />
			</view>
			<!-- 邮箱输入 -->
			<view class="info_item">
				<text>邮箱：</text>
				<input v-model="userInfo.email" placeholder="选填" />
			</view>
			<!-- 保存按钮 -->
			<view class="save_button" @click="saveInformation">保存</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		reactive
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';

	// 使用reactive创建一个响应式对象来存储所有数据
	const userInfo = reactive({
		user_name: '',
		gender: '神秘',
		my_image_url: 'https://www.freeimg.cn/i/2024/02/07/65c2f64ebb38d.png',
		student_id: '',
		college: '',
		phone_number: '',
		email: '',
		// genderSelcet: ['男', '女', '神秘'],
	});

	const genderSelcet = reactive(['男', '女', '神秘']);
	const my_image_url = ref('https://www.freeimg.cn/i/2024/02/07/65c2f64ebb38d.png');
	// 用于存储编辑后的用户名
	const editedUserName = ref(userInfo.user_name);

	// 控制是否处于编辑状态的标志
	const isEditing = ref(false);
	// 重置信息
	function resetUserInfo() {
		userInfo.user_name = '';
		userInfo.gender = '神秘';
		userInfo.student_id = '';
		userInfo.college = '';
		userInfo.phone_number = '';
		userInfo.email = '';
	}

	// 处理性别选择改变事件
	function handleGenderChange(event) {
		const selectedIndex = event.detail.value;
		// userInfo.gender = selectedIndex;
		userInfo.gender = genderSelcet[selectedIndex];
		console.log('Selected gender:', userInfo.gender);
	}

	// 开始编辑用户名
	function startEditing() {
		isEditing.value = true;
	}
	// 保存用户名修改
	function saveUserName() {
		// 更新用户信息
		if (editedUserName.value != '') {
			userInfo.user_name = editedUserName.value;
		}
		isEditing.value = false; // 退出编辑状态
	}

	// 选择图片并上传
	function UploadImage() {
		uni.chooseImage({
			success: chooseImageRes => {
				const tempFilePaths = chooseImageRes.tempFilePaths;
				uni.uploadFile({
					url: 'http://127.0.0.1:8080/uploadImage', // 上传图片单独端口
					filePath: tempFilePaths[0],
					name: 'file',
					success: uploadFileRes => {
						console.log("上传结果", uploadFileRes);
						// 解析传回来的json
						let data = JSON.parse(uploadFileRes.data);
						// console.log("上传结果", data);

						if (data.status) {
							// 如果上传成功，则保存图片URL到lectureImage变量
							userInfo.my_image_url = data.data.links.url; // 获取图片URL并赋值
							// DellectureImage.value = data.data.links.delete_url
							// console.log("图片URL:", userInfo.my_image_url); // 输出图片URL，以便调试
						} else {
							// 这里处理上传失败的情况-弹窗
							uni.showModal({
								title: '上传失败',
								content: data.message,
								showCancel: false
							});
						}
					},
					fail: uploadFileErr => {
						// let data = JSON.parse(uploadFileErr.data);
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

	function saveInformation() {
		// 使用userInfo作为请求的数据对象
		uni.request({
			url: 'http://127.0.0.1:8080/userEdit',
			method: 'POST',
			data: {
				...userInfo
			}, // 展开运算符来复制userInfo对象
			success(res) {
				// console.log('Response:', res);
				// const data = JSON.parse(res.data);
				uni.showToast({
					title: '修改成功',
					icon: 'none'
				});
				// 保存成功后重置数据
				resetUserInfo();
				// 返回上一页
				uni.navigateBack({
					delta: 1 // 返回的页面数，这里假设返回上一页
				});
			},
			fail(err) {
				console.error('Failed to save information:', err);
				uni.showModal({
					title: '修改失败',
					content: '无法连接到服务器',
					showCancel: false
				});
			}
		});
	}


	onLoad((e) => {
		// console.log('获取到的数据',e);
		userInfo.student_id = e.student_id;
		console.log('当前用户', userInfo.student_id)
	});

	onMounted(() => {
		// 先加载用户信息
		const query = userInfo.student_id ? `?student_id=${userInfo.student_id}` : '';
		uni.request({
			url: `http://127.0.0.1:8080/userInfo${query}`,
			method: 'GET',
			success(res) {
				Object.assign(userInfo, res.data);
			},
			fail(err) {
				console.error('Failed to fetch user information:', err);
			}
		});
	});
</script>

<style lang="scss">
	.whole {
		background-color: #ececec;
		height: 2000rpx;

		.mine {
			height: 550rpx;
			width: 750rpx;
			background-color: #ffffff;

			.my {
				height: 350rpx;
				margin: 60rpx 50rpx;
				padding: 40rpx 20rpx 30rpx 60rpx;
				border-radius: 30rpx;
				box-shadow: 0rpx 0rpx 80rpx 1rpx #b8b8b8;

				display: flex;
				flex-direction: row;

				image {
					height: 240rpx;
					width: 240rpx;
					border-radius: 120rpx;
				}

				text {
					font-size: 50rpx;
					font-weight: bold;
					letter-spacing: 4rpx;
					margin-top: 10rpx;
				}

				.my_basic {
					height: 100%;
					width: 360rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.my_basic_input {
						font-size: 50rpx;
						font-weight: bold;
						letter-spacing: 4rpx;
						margin-top: 10rpx;
						height: 30rpx;
					}
				}

				.my_avtiveInformation {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					border-radius: 20rpx;
					width: 210rpx;
					height: 100%;
					background-color: #dcdcdc;
				}
			}
		}
	}

	.my_information {
		background-color: #ffffff;
		margin: 20rpx 0rpx;
		padding: 0rpx 30rpx;

		.info_item {
			display: flex;
			align-items: center;
			margin: 30rpx 0rpx;
			
			text {
				margin-right: 10rpx;
			}

			picker {
				width: 100rpx;
			}

			input {
				flex: 1;
				height: 40rpx;
				border: 1rpx solid #ccc;
				border-radius: 5rpx;
				padding: 0 10rpx;
			}

		}

		.save_button {
			background-color: orange;
			color: white;
			text-align: center;
			height: 50rpx;
			line-height: 50rpx;
			border-radius: 5rpx;
			// margin-top: 20rpx;
			padding: 20rpx;
			cursor: pointer;
		}
	}
</style>