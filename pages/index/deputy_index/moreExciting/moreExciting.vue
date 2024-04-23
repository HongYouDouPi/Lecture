
<template>
	<view>
		
	</view>
</template>

<script setup>
import { onMounted } from 'vue';


	onMounted(() => {
		uni.showModal({
			title:'功能待开发',
			conten:'多多支持吧！',
			showCancel:false,
			success: () => {
				// 在弹窗关闭后再执行页面跳转
				uni.navigateBack({
					delta: 1 // 返回上一页
				});
			}
		})
		
	})
	
</script>

<style lang="scss">

</style>
