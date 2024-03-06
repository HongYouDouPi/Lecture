<template>  
  <view class="container">  
    <!-- 引入自定义导航栏组件 -->  
    <custom-navbar></custom-navbar>  
      
    <!-- 页面内容 -->  
    <view class="page-content">  
      <text>这是首页内容</text>  
    </view>
	  
	
	
  </view>  
</template>  
  
<script>  

import CustomNavbar from '@/components/custom-navbar/custom-navbar.vue';  
  
export default {  
  components: {  
    CustomNavbar // 注册自定义导航栏组件  
  }  
}  
</script>  
  
<style>  
.container {  
  padding-top: 44px; /* 确保内容不会遮挡导航栏 */  
}  
  
.page-content {  
  /* 页面内容样式 */  
}  
</style>