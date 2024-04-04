<template>
	<view>
		<view class="selectLocation"@click="navigateToMap">
			<text >地图选点</text>
			
		</view>
		
		
	</view>
</template>

<script setup>
	function navigateToMap(){
		uni.navigateTo({
			url:'/pages/index/deputy_index/obtainLocation/obtainLocation'
		})
	}
	
</script>

<style lang="scss">
	.selectLocation{
		height: 200rpx;
		width: 200rpx;
		// background-color: #000000;
		border : 1rpx #000000 solid;
	}
</style>
