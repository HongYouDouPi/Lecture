<template>
	<view class="whole">
		<view class="mine">
			<view class="my">
				<view class="my_basic">
					<image :src="myImgUrl" mode=""></image>
					<text>{{name}}</text>
				</view>
				<view class="my_information">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'红油豆皮',
				myImgUrl:'https://www.freeimg.cn/i/2024/02/07/65c2f64ebb38d.png',
			};
		}
	}
</script>

<style lang="scss">
	.whole{
		
		background-color: #ececec;
		height: 2000rpx;
		.mine{
			height: 550rpx;
			// width: 100%;
			width: 750rpx;
			background-color: #ffffff;
			.my{
				height: 350rpx;
				margin: 60rpx 50rpx;
				padding: 40rpx 20rpx 30rpx 60rpx;
				border-radius: 30rpx;
				box-shadow: 0rpx 0rpx 80rpx 1rpx #b8b8b8;
				
				display: flex;
				flex-direction: row;
				image{
					height: 240rpx;
					width: 240rpx;
					border-radius: 120rpx;
				}
				text{
					font-size: 50rpx;
					font-weight: bold;
					letter-spacing: 4rpx;
					margin-top: 10rpx;
				}
				.my_basic{
					height: 100%;
					width: 360rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
				}
				.my_information{
					width: 210rpx;
					height: 100%;
					background-color: #b8b8b8;
				}
			}
		}
	}
	
</style>
