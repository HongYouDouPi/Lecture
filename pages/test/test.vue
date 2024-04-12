<template>
	<view class="ShowSomething">
		<text>从mysql获得静态的讲座信息</text>
	</view>
    <view class="content">
        <!-- 显示讲座信息 -->
        <view class="content_item" v-for="(lecture, index) in lectures" :key="index">
            <text class="lecture-name">{{ lecture.name }}</text>
            <text class="lecture-time">{{ lecture.time }}</text>
            <text class="lecture-location">{{ lecture.location }}</text>
            <!-- 其他讲座信息... -->
        </view>
    </view>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    // 导入 uni.request 方法用于发送 HTTP 请求
    // import uni from 'uni';

    // 定义存放讲座信息的数组
    const lectures = ref([]);

    // 在组件挂载后发送请求获取讲座信息
    onMounted(() => {
        // 发送 HTTP GET 请求获取讲座信息
        uni.request({
            url: 'http://127.0.0.1:8080/lectures', // 替换为你的后端接口地址
            method: 'GET',
            success(res) {
                // 将获取到的讲座信息数组赋值给 lectures 变量
                lectures.value = res.data;
            },
            fail(err) {
                console.error('Failed to fetch lectures:', err);
            }
        });
    });
</script>

<style>
	.ShowSomething{
		text-align: center;
		margin-top: 20px;
		font-size: 16px;
		color: #666;
	}
	.content{
		padding: 20px;
	}

	.content_item{
		background-color: #f5f5f5;
		border-radius: 8px;
		margin-bottom: 20px;
		padding: 16px;
	}

	.lecture-name{
		font-size: 18px;
		font-weight: bold;
		color: #333;
		margin-bottom: 8px;
	}

	.lecture-time, .lecture-location{
		font-size: 14px;
		color: #999;
	}
</style>
