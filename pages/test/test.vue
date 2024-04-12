<template>
	<view class="ShowSomething">
		<text>讲座信息</text>
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
            <!-- 删除图片链接，根据需要决定是否展示 -->
        </view>
    </view>
</template>

<script setup>
    import { ref, onMounted } from 'vue';

    const lectures = ref([]);

    // 日期格式化函数
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString('zh-CN', options);
    };

    onMounted(() => {
        uni.request({
            url: 'http://127.0.0.1:8000/lectures',
            method: 'GET',
            success(res) {
                lectures.value = res.data;
            },
            fail(err) {
                console.error('Failed to fetch lectures:', err);
            }
        });
    });
</script>

<style>
    /* 其他样式保持不变 */

    .content_item{
        background-color: #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        margin-bottom: 20px;
        padding: 16px;
        overflow: hidden; /* 防止内容溢出 */
    }

    .lecture-image {
        width: 100%;
        height: 200px; /* 设定一个固定高度或者使用aspectFill模式 */
        object-fit: cover; /* 覆盖整个容器 */
        border-top-left-radius: 8px; /* 圆角 */
        border-top-right-radius: 8px;
        margin-bottom: 12px;
    }

    .lecture-introduction, .lecture-announcement {
        color: #333;
        font-size: 14px;
        margin-top: 4px; /* 调整间距 */
    }

    .lecture-announcement {
        margin-top: 8px; /* 调整公告与介绍的间距 */
        color: #e53e3e; /* 用颜色区分公告 */
    }
</style>


