<template>
  <view>
    <!-- 整合后的发布条目输入字段 -->
    <view class="input-wrapper">
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
      <input type="file" @change="handleFileChange" accept="image/*" class="input-field">
    </view>
    <view class="input-wrapper">
      <view class="input-title">讲座详情：
		<textarea v-model="lectureDetail" placeholder="请输入讲座详情" class="large-input-field"></textarea>
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
  import { ref, onMounted , onUnmounted } from 'vue';
  
  const lectureName = ref('');
  const lectureDate = ref('');
  const lectureTime = ref('');
  const lectureDetail = ref('');
  const lectureAnnouncement = ref('');
  const location = ref('');
  
  let lectureImage = null;

  function dateChanged(event) {
    lectureDate.value = event.detail.value;
  }
  
  function timeChanged(event) {
    lectureTime.value = event.detail.value;
  }
  
  function handleFileChange(event) {
    lectureImage = event.target.files[0];
  }
  
	

  // 表单提交
async function submitForm() {
	const data = {
	        lectureName: lectureName.value,
	        lectureDate: lectureDate.value,
	        lectureTime: lectureTime.value,
	        lectureDetail: lectureDetail.value,
	        lectureAnnouncement: lectureAnnouncement.value,
	        lectureLocation: location.value
	    };	  
  
    try {
		const response = await uni.request({
		            url: '/lectures',
		            method: 'POST',
		            data: data
		        });
		        console.log(response.data);
    } catch (error) {
      console.error('上传错误：Error submitting form:', error);
    }
}
  
// 地图逻辑
function navigateToMap(){
    uni.navigateTo({
      url:'/pages/index/deputy_index/obtainLocation/obtainLocation'
    })
}
  
onMounted(() => {
	  // 监听事件
	  uni.$on('locationSelected', (e) => {
			// 接收到数据后的处理
			location.value = e;
			console.log("拿到数据" , location)
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
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    flex-direction: column; /* 垂直方向排列 */
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
    height: 200rpx; /* 调整文本框的高度 */
    // width: 100%;
    font-size: 28rpx;
    border: 1px solid #ccc;
    border-radius: 10rpx;
    padding: 20rpx; /* 增加内边距 */
    resize: none; /* 禁止文本框大小调整 */
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
    background-color: #d3f0d3; /* 淡绿色背景 */
    color: #333; /* 文字颜色稍深 */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10rpx;
    margin-bottom: 20rpx; /* 添加底部间距 */
    font-size: 28rpx;
    box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
    padding: 10rpx; /* 调整内边距 */
    margin-top: 20rpx; /* 添加顶部间距 */
  }

  
</style>
