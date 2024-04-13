<template>
    <view class="whole">
        <view class="mine">
            <view class="my">
                <view class="my_basic">
                    <image :src="my_image_url" mode="aspectFit"></image>
                    <text>{{ username }}</text>
                </view>
                <view class="my_avtiveInformation">
                    <view class="">参加次数</view>
                    <view class="">报名次数</view>
                </view>
            </view>
        </view>

        <view class="my_information">
            <!-- 性别选择 -->
            <view class="info_item">
                <text>性别：</text>
                <picker mode="selector" :range="genderSelcet" @change="handleGenderChange">
                    <view>选择</view>
                </picker>
            </view>
            <!-- 学号输入 -->
            <view class="info_item">
                <text>学号：</text>
                <input v-model="studentId" placeholder="请输入学号" />
            </view>
            <!-- 学院班级输入 -->
            <view class="info_item">
                <text>学院班级：</text>
                <input v-model="departmentClass" placeholder="选填" />
            </view>
            <!-- 手机号输入 -->
            <view class="info_item">
                <text>手机号：</text>
                <input v-model="phoneNumber" placeholder="请输入手机号" />
            </view>
            <!-- 邮箱输入 -->
            <view class="info_item">
                <text>邮箱：</text>
                <input v-model="email" placeholder="选填" />
            </view>
            <!-- 保存按钮 -->
            <view class="save_button" @click="saveInformation">保存</view>
        </view>
    </view>
</template>

<script setup>
import { ref,onMounted } from 'vue';

const username = ref('');
const gender = ref('');
const my_image_url = 'https://www.freeimg.cn/i/2024/02/07/65c2f64ebb38d.png';
const student_id = ref('');
const college = ref('');
const phone_number = ref('');
const email = ref('');

const genderSelcet = ref(['男', '女', '神秘']);
// 处理性别选择改变事件
function handleGenderChange(event) {
    const selectedIndex = event.detail.value;
    console.log('Selected gender:', genderSelcet.value[selectedIndex]);
}

// 保存信息函数
function saveInformation() {
	uni.request({
		url:'http://127.0.0.1:8080/user_edit',
		method:'POST',
		data:{
			
		}
	})
    // 添加保存信息的逻辑代码，例如将数据发送给后端
    console.log('Saving information...');
}

onMounted(()=>{
	// 先加载用户信息
	uni.request({
		url:'http://127.0.0.1:8080/userInfo',
		method:'GET',
		data:{
			
		},
		
		success(res){
			var data = res
			username.value = data.user_name;
			gender.value = data.gender;
			my_image_url.value = data.my_image_url;
			student_id.value = data.student_id;
			college.value = data.college;
			phone_number.value = data.phone_number;
			email.value = data.email;
					
		}
	})
})
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
            }

            .my_avtiveInformation {
                width: 210rpx;
                height: 100%;
                background-color: #b8b8b8;
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
        margin-bottom: 20rpx;

        text {
            margin-right: 10rpx;
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
        margin-top: 20rpx;
        cursor: pointer;
    }
}
</style>
