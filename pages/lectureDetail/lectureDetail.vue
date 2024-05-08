<template>
	<view class="whole">
		<view class="Base_Information_pic">
			<image :src="lectureInfo.lecture_image_url" mode="aspectFill"></image>
		</view>
		<view class="Base_Information">
			<!-- 标题 -->
			<text class="LectureName">{{lectureInfo.lecture_name}}</text>
			<!-- 时间： -->
			<text style="font-size: 26rpx; color: #888888;letter-spacing: 1rpx;">{{lectureInfo.lecture_time}}</text>
			<view class="CollegeBar">
				<!-- 学院 -->
				<view class="college">
					<image src="../../static/image/icon/我的.png" mode="aspectFit"></image>
					<text>{{lectureInfo.college}}</text>
				</view>

				<!-- 关注 -->
				<!-- 由于不涉及其他功能 这里的关注就直接跳出那个二维码或者是相关链接就好了 -->
				<view class="follow">
					<image src="../../static/image/icon/加.png" mode="aspectFit"></image>
					<text>关注</text>
				</view>
			</view>

			<!-- 判断讲座是否已经举办 -->
			<view class="hold" :class="{held: hasHeld}">
				{{ hasHeld ? '已举办' : '待举办' }}
			</view>

		</view>

		<view class="content">
			<!-- 切换栏 -->
			<view class="tabbar">
				<text @click="getView('detail')" :class="{'textselected':showDetail}">详情</text>
				<text @click="getView('list')" :class="{'textselected':showList}">参与名单</text>
			</view>
			<!-- 详情容器 -->
			<view v-if="showDetail" class="LectureDetails">
				<!-- 添加的公告部分 -->
				<view class="announcement-section">
					<view class="title">公告</view>
					<view class="content">{{lectureInfo.lecture_announcement}}</view>
				</view>

				<!-- 添加的讲座简介部分 -->
				<view class="lecture-introduction">
					<view class="title">讲座简介</view>
					<view class="content">{{lectureInfo.lecture_introduction}}</view>
				</view>
				<text>
					<image src="../../static/image/icon/打招呼.png" mode="aspectFit"></image>
					公告
				</text>
			</view>

			<!-- 参与名单容器 -->
			<view v-if="showList" class="LectureParticipant">
				<view v-for="(participant, index) in ParticipationList.value" :key="index" class="Participant">
					<text>学号：{{ participant.student_id }}</text>
				</view>
			</view>

		</view>

		<!-- 联系 -->
		<view class="contact">
			<view class="share">
				<image src="../../static/image/icon/定点.png" mode="aspectFit"></image>
			</view>

		</view>

		<!-- 添加报名和分享按钮 -->
		<view class="bottom-bar">
			<button class="share-button">分享给好友</button>
			<!-- <button @click="enroll" class="enroll-button">立即报名</button> -->
			<button :class="{'enroll-button': !isBooking, 'enroll-button-disabled': isBooking}"
				@click="handleEnrollClick">
				{{ isBooking ? '已报名' : '立即报名' }}
			</button>
		</view>

	</view>


</template>

<script setup>
	import {
		reactive,
		ref,
		onMounted,
		computed
	} from 'vue';
	import {
		useStore
	} from 'vuex';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	// import { useRouter } from 'vue-router';

	// 获取 Vuex Store 实例
	const store = useStore();
	const port = store.getters.port;
	const lectureInfo = reactive({
		lecture_name: "宣讲会",
		lecture_time: "2024/4/10",
		lecture_image_url: "../../static/image/user/boy.png",
		// 其他字段...
		lecture_id: null,
		student_id: null,
		location: "",
		latitude: null,
		longitude: null,
		lecture_introduction: "",
		lecture_announcement: "",
		viewed: null,
		style: null,
		college: "计算机院",
	});

	// 各种参数
	// 默认是显示详情的
	const showDetail = ref(true);
	const showList = ref(false);

	const isBooking = ref(false);
	// 后面可以换成用户名和学号		---自定义
	const ParticipationList = reactive([]);

	// 判断讲座是否已经举办
	const hasHeld = computed(() => {
		const now = new Date();
		const lectureDate = new Date(lectureInfo.lecture_time.replace(/\//g, '-'));
		return now > lectureDate;
	});

	function handleEnrollClick() {
		if (!isBooking.value) {
			enroll();
			console.log('Successful enrolled');
		} else {
			unenroll();
			console.log('Already enrolled');
		}
	}

	function IsBooking() {
		let studentId = store.getters.studentId; // 获取全局的 studentId
		uni.request({
			url: `http://${port}/booking/search`,
			method: 'GET',
			data: {
				student_id: studentId,
				lecture_id: lectureInfo.lecture_id
			},
			success: function(res) {
				if (res.statusCode === 200) {
					// 这里res.data是后端返回的JSON对象
					// console.log('预约状态：', res.data.isBooking);
					if (res.data.isBooking) {
						isBooking.value = true;
						console.log('预约状态', isBooking.value);
					} else {
						// 处理预约不存在的情况
						isBooking.value = false;
						console.log('预约状态', isBooking.value);
					}
				} else {
					// 处理非200的响应码
					console.error('搜索预约出错：', res.statusCode);
				}
			},
			fail: function(err) {
				// 处理请求失败的情况
				console.error('请求失败：', err);
			}
		});
	}

	function getView(e) {
		if (e === 'detail') {
			showDetail.value = true;
			showList.value = false;
		} else {
			showDetail.value = false;
			showList.value = true;
		}
	}

	// 新增报名方法
	function enroll() {
		let studentId = store.getters.studentId; // 获取全局的 studentId
		if (studentId) {
			const query = `?student_id=${studentId}&lecture_id=${lectureInfo.lecture_id}`
			console.log('query', query)
			uni.request({
				url: `http://${port}/booking/add${query}`,
				method: 'POST',
				success: (res) => {
					if (res.statusCode === 200) {
						uni.showModal({
							title: '报名成功',
							icon: 'success',
							duration: 2000,
							showCancel: false,
						});
						isBooking.value = true;
					}
				},
				fail: () => {
					uni.showToast({
						title: '请求失败，请稍后再试',
						icon: 'none',
						duration: 2000
					});
				}
			});
		} else {
			uni.showToast({
				title: '请先登陆',
				icon: 'none',
				duration: 2000
			});
		}
	}

	function unenroll() {
		let studentId = store.getters.studentId; // 获取全局的 studentId
		if (studentId) {
			const query = `?student_id=${studentId}&lecture_id=${lectureInfo.lecture_id}`
			console.log('query', query)
			uni.request({
				url: `http://${port}/booking/del${query}`,
				method: 'POST',
				success: (res) => {
					if (res.statusCode === 200) {
						uni.showModal({
							title: '取消报名成功',
							icon: 'success',
							duration: 2000,
							showCancel: false,
						});
						isBooking.value = false;
					}
				},
				fail: () => {
					uni.showToast({
						title: '请求失败，请稍后再试',
						icon: 'none',
						duration: 2000
					});
				}
			});
		} else {
			uni.showToast({
				title: '请先登陆',
				icon: 'none',
				duration: 2000
			});
		}
	}

	function LectureInfo() {
		const query = lectureInfo.lecture_id ? `?lecture_id=${lectureInfo.lecture_id}` : '';
		// 然后再发送请求获取数据
		uni.request({
			url: `http://${port}/lecturesInfo${query}`,
			method: 'GET',
			// data: {
			//     lecture_id: lectureId
			// },
			success: (res) => {
				console.log("获得数据", res.data)
				// 请求成功后更新 lectureInfo
				if (res.data.result && res.data.result.length > 0) {
					const data = res.data.result[0];
					lectureInfo.lecture_id = data.lecture_id;
					lectureInfo.lecture_name = data.lecture_name;
					lectureInfo.student_id = data.student_id;
					lectureInfo.lecture_time = data.lecture_time;
					lectureInfo.lecture_image_url = data.lecture_image_url;
					lectureInfo.location = data.location;
					lectureInfo.latitude = data.latitude;
					lectureInfo.longitude = data.longitude;
					lectureInfo.lecture_introduction = data.lecture_introduction;
					lectureInfo.lecture_announcement = data.lecture_announcement;
					lectureInfo.viewed = data.viewed;
					lectureInfo.style = data.style;

					const dateTime = new Date(lectureInfo.lecture_time);
					let year = dateTime.getFullYear();
					let month = dateTime.getMonth() + 1; // 月份从0开始，需要加1
					let day = dateTime.getDate();
					lectureInfo.lecture_time =
						`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
				}
				fetchStudentId();
			},
			fail: (err) => {
				console.error('请求失败', err);
			}
		});
	}

	function fetchStudentId() {
		uni.request({
			url: `http://${port}/bookInfo/studentId?lecture_id=${lectureInfo.lecture_id}`,
			method: 'GET',
			success: (res) => {
				// console.log("获得studentId数据", res.data)
				ParticipationList.value = res.data
				console.log('ParticipationList', ParticipationList.value)
			},
			fail: (err) => {
				console.error('请求studentId失败', err);
			}

		})
	}

	// 页面加载钱
	onLoad((e) => {
		// 获取全局的 studentId
		const studentId = store.getters.studentId;
		console.log('页面传参:', e, studentId);
		lectureInfo.lecture_id = e.lecture_id
	});

	// 在页面加载时发送请求获取数据
	onMounted(() => {
		//获取讲座信息
		LectureInfo();
		// 判断是否预约
		IsBooking();


	});
</script>

<style lang="scss" scoped>
	.whole {
		width: 100%;

		// height: 1200rpx;
		.Base_Information_pic {
			height: 400rpx;
			overflow: hidden;

			image {
				width: 100%;
				// height: 400rpx;
			}
		}

		background-color: #ececec;

		.Base_Information {
			// height: 600rpx;
			display: flex;
			background-color: #FFFFFF;
			flex-direction: column;
			padding: 30rpx 40rpx;

			// <!-- 标题 -->
			.LectureName {
				font-size: 40rpx;
				font-weight: bold;
				letter-spacing: 2rpx;
				height: 70rpx;
				display: flex;
				align-items: center;
				// margin-left: 20rpx;
			}

			// <!-- 学院 -->
			.CollegeBar {
				height: 100rpx;

				display: flex;
				justify-content: space-between;
				align-items: center;

				.college {
					display: flex;
					align-items: center;

					text {
						font-size: 28rpx;
						letter-spacing: 2rpx
					}

					image {
						width: 60rpx;
						height: 60rpx;
						border-radius: 30rpx;
						background-color: #df9500;
						margin-right: 20rpx;
					}
				}

				.follow {
					width: 110rpx;
					height: 50rpx;
					background-color: rgba(255, 209, 117, 0.4);
					color: #df9500;
					font-size: 28rpx;
					font-weight: bold;
					letter-spacing: 3rpx;
					border-radius: 12rpx;

					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 28rpx;
						height: 28rpx;
						margin: 0 3rpx;
					}
				}
			}
		}

		// 内容
		.content {
			// width: 100%;	
			// height: 500rpx;
			margin-top: 20rpx;
			padding: 30rpx;
			background-color: #FFFFFF;

			.tabbar {
				display: flex;
				justify-content: space-around;
				margin-bottom: 20rpx;
				align-items: center;

				text {
					font-size: 32rpx;
					height: 50rpx;
					width: 150rpx;

					display: flex;
					justify-content: center;
					align-items: flex-start;

				}

				.textselected {
					font-weight: bold;
					letter-spacing: 1rpx;
					box-shadow: 0rpx 6rpx 2rpx -2rpx #ffaa00;
				}
			}

			.LectureParticipant {
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;
				height: 500rpx;
				width: 100%;

				// height: 200rpx
				.Participant {
					display: flex;
					align-items: center;
					flex-direction: center;
					padding: 20rpx;
				}
			}

			.LectureDetails {

				image {
					height: 30rpx;
					width: 30rpx;

				}

				/* 公告部分的样式 */
				.announcement-section {
					padding: 10px;
					background-color: #f2f2f2;
					border-radius: 5px;
					margin: 10px 0;
				}

				.announcement-section .title {
					font-weight: bold;
				}

				.announcement-section .content {
					color: #333;
				}

				/* 讲座简介部分的样式 */
				.lecture-introduction {
					padding: 10px;
					background-color: #f2f2f2;
					border-radius: 5px;
					margin-bottom: 10px;
				}

				.lecture-introduction .title {
					font-weight: bold;
				}

				.lecture-introduction .content {
					color: #333;
				}

			}
		}
	}

	// 联系
	.contact {

		image {
			height: 30rpx;
			width: 30rpx;

		}
	}

	/* 新增底部按钮样式 */
	.bottom-bar {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		padding-bottom: 100rpx;
	}

	.enroll-button {
		width: 300rpx;
		height: 100rpx;
		background-color: #ff8800;
		color: white;
		padding: 10rpx 20rpx;
		border-radius: 5px;
	}

	.enroll-button-disabled {
		width: 300rpx;
		height: 100rpx;
		background-color: #ccc;
		color: white;
		padding: 10rpx 20rpx;
		border-radius: 5px;
	}

	.share-button {
		background-color: #555;
		color: white;
		padding: 10rpx 20rpx;
		border-radius: 5px;
	}

	/* 新增已举办样式 */
	.hold.held {
		color: #999;
	}
</style>