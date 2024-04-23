<template>
	<view class="whole">
		<view class="show">
			<text class="title">看看都有些啥</text>
		</view>

		<view class="content">
			<!-- 显示讲座信息 -->
			<view class="content_item" v-for="(lecture, index) in lectures" :key="index">
				<!-- 讲座图片 -->
				<image :src="lecture.lecture_image_url" mode="aspectFill" class="lecture-image" @click="navigateToDetail(lecture)"></image>
				<view class="content_text">
					<view class="lectureText">
						<text class="lecture-name">{{ lecture.lecture_name }}</text>
						<!-- 格式化日期显示 -->
						<text class="lecture-time">{{ formatDate(lecture.lecture_time) }}</text>
						<text class="lecture-location">{{ lecture.location }}</text>
					</view>
					<view class="clock" @click="clockLecture(lecture)">
						打卡
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		useStore
	} from 'vuex';

	// 获取 Vuex Store 实例
	const store = useStore();

	// 获取全局的 studentId
	const studentId = ref('')
	studentId.value = store.getters.studentId;
	const lectures = ref([]);
	const type = ref('');

	// 日期格式化函数
	const formatDate = (dateString) => {
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric'
		};
		return new Date(dateString).toLocaleDateString('zh-CN', options);
	};

	// 跳转到讲座详情页面
	function navigateToDetail(item) {
		console.log('跳转页面的id', item.lecture_id)
		uni.navigateTo({
			url: `/pages/lectureDetail/lectureDetail?lecture_id=${item.lecture_id}`
		});
	}
	
	// 跳转到打卡
	function clockLecture(item){
		uni.navigateTo({
			url: `/pages/index/deputy_index/locationClockin/locationClockin?lecture_id=${item.lecture_id}&lat=${item.latitude}&lot=${item.longitude}&time=${item.lecture_time}`
		});
		console.log('跳转打卡', item)
	}
	
	function fetchLecture() {
		uni.request({
			url: `http://127.0.0.1:8080/bookInfo?student_id=${studentId.value}&style=${type.value}`,
			method: 'GET',
			success(res) {
				lectures.value = res.data.lecture.sort((a, b) => b.lecture_id - a.lecture_id);
				console.log(lectures.value)
			},
			fail(err) {
				console.error('Failed to fetch lectures:', err);
			}
		});

	}

	onLoad((e) => {
		const req = e;
		studentId.value = e.student_id;
		type.value = e.style;
		console.log(studentId.value, type.value) //查看页面传输的而数据
	})
	onMounted(() => {
		fetchLecture();
	});
</script>

<style lang="scss">
	.whole {
		background-color: #e3e3e3;

		.show {
			width: 100%;
			display: flex;
			/* align-items: center; */
			justify-content: center;
			/* margin-bottom: 20px; */
			font-weight: bold;
			background-color: #ffffff;
			padding: 10px 0;
			/* 增加上下的填充 */
		}

		.title {
			font-size: 20px;
			/* 字体大小调整 */
			color: #333;
		}
	}


	.content {
		display: flex;
		flex-direction: column;
		padding: 10px;
	}

	.content_item {
		margin-bottom: 25px;
		/* 增加内容项之间的间距 */
		border-radius: 10px;
		/* 调整圆角大小 */
		/* overflow: hidden; */
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		/* 调整阴影效果 */
		background-color: #fff;
		/* 卡片背景色 */
		padding: 15px;
		/* 卡片内边距 */
		display: flex;
		flex-direction: column;
	}

	.lecture-image {
		width: 100%;
		height: 200px;
		/* 根据实际情况调整 */
		object-fit: cover;
		border-radius: 8px 8px 0 0;
		/* 只给图片上方加圆角 */
	}

	.lecture-name {
		font-size: 18px;
		/* 字体大小调整 */
		color: #1a1a1a;
		margin: 12px 0 6px;
		/* 调整间距 */
		font-weight: 500;
		/* 调整字体权重 */
	}

	.lecture-time,
	.lecture-location,
	.lecture-introduction,
	.lecture-announcement {
		font-size: 14px;
		color: #666;
		margin: 2px 0;
		/* 细微调整间距 */
		// line-height: 1.5;
		/* 调整行高 */
	}

	/* 如果需要，可以添加一些悬停效果或者交互式元素的样式 */
	.content_item:hover {
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
		/* 悬停时的阴影效果 */
	}

	.content_text {
		display: flex;
		justify-content: space-between;
		height: 200rpx;

		.lectureText {
			width: 300rpx;
			display: flex;
			flex-direction: column;
		}

		.clock {
			display: flex;
			width: 100rpx;
			height: 80rpx;
			margin: 100rpx 0rpx 30rpx 20rpx;
			align-items: center;
			justify-content: center;
			background-color: #5f9ea0;
			color: white; 
			font-size: 34rpx;
			border-top-left-radius: 20rpx;
			/* 左上圆角 */
			border-bottom-left-radius: 20rpx;
			/* 左下圆角 */
			border: 1px solid #7f7f7f;
		}
	}
</style>