<template>
    <view class="content">
        <!-- 显示讲座信息 -->
        <view class="content_item" v-for="(lecture, index) in lectures" :key="index">
            <text>{{ lecture.name }}</text>
            <text>{{ lecture.time }}</text>
            <text>{{ lecture.location }}</text>
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
            url: 'http://yourbackend.com/lectures', // 替换为你的后端接口地址
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
