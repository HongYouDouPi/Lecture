<template>
	<view class="ShowSomething">
		<text>讲座信息</text>
		<text>lectures</text>
	</view>
	<view class="content">
		<!-- 显示讲座信息 -->
		<view class="content_item" v-for="(lecture, index) in lectures" :key="index">
			<!-- 讲座图片 -->
			<image :src="lecture.lecture_image_url" mode="aspectFill" class="lecture-image"></image>
			<text class="lecture-name">{{ lecture.lecture_name }}</text>
			<!-- 格式化日期显示 -->
			<text class="lecture-time">{{ formatDate(lecture.lecture_time) }}</text>
			<text class="lecture-location">{{ lecture.location }}</text>
			<text class="lecture-introduction">{{ lecture.lecture_introduction }}</text>
			<text class="lecture-announcement">{{ lecture.lecture_announcement }}</text>
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
	const port = store.getters.port;
	const studentId = ref('')
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

	// 获取预约的讲座信息
	function fetchLecture() {
		uni.request({
			url: `http://${port}/bookInfo?student_id=${studentId.value}&style=${type.value}`,
			method: 'GET',
			success(res) {
				lectures.value = res.data;
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
		// console.log(studentId.value,type.value) //检验是否拿到
	})
	onMounted(() => {
		fetchLecture();
	});
</script>

<style>
	/* 其他样式保持不变 */

	.content_item {
		background-color: #fff;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		margin-bottom: 20px;
		padding: 16px;
		overflow: hidden;
		/* 防止内容溢出 */
	}

	.lecture-image {
		width: 100%;
		height: 200px;
		/* 设定一个固定高度或者使用aspectFill模式 */
		object-fit: cover;
		/* 覆盖整个容器 */
		border-top-left-radius: 8px;
		/* 圆角 */
		border-top-right-radius: 8px;
		margin-bottom: 12px;
	}

	.lecture-introduction,
	.lecture-announcement {
		color: #333;
		font-size: 14px;
		margin-top: 4px;
		/* 调整间距 */
	}

	.lecture-announcement {
		margin-top: 8px;
		/* 调整公告与介绍的间距 */
		color: #e53e3e;
		/* 用颜色区分公告 */
	}
</style>