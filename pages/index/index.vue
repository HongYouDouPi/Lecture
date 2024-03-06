<template>  
  <view class="whole">
	  
	  <swiper :indicator-dots="true" :autoplay="true" :interval="6000" :duration="1500" circular="ture">
	  	<swiper-item v-for="(item,index) in swiper" :key="item.id">
	  		<image :src="item.pic" mode="scaleToFill" class="swiper_image"></image>
	  	</swiper-item>
	  	
	  </swiper>
	  
  	出现一点什么东西吧
  </view>
   <!-- <tab-bar @tab-change="handleTabChange"></tab-bar> -->
</template>  
  
<script>  
 
export default {  
	data(){
		return{
			
			swiper:[
				{
					id:'1',
					pic:'https://www.freeimg.cn/i/2024/01/31/65b9de8cb4a8f.jpg',
					
				},
				{
					id:'2',
					pic:'https://www.freeimg.cn/i/2024/01/31/65b9de9a30031.jpg',
					
				},
				{
					id:'3',
					pic:'https://www.freeimg.cn/i/2024/01/31/65b9de9b7022d.jpg',
					
				},
				{
					id:'4',
					pic:'https://www.freeimg.cn/i/2024/01/31/65b9de9a57c43.jpg',
					
				}
			]
		}
		
	}
  
}  
</script>  
  
  
  
<style lang="scss">  
	.whole{
		
		swiper{
			height: 400rpx;
			width: 100%;
			swiper-item{
				align-items: center;
				justify-content: center;
				
				.swiper_image{
					height: 400rpx;
					width: 750rpx;
				}
			}
			
		}
	}
</style>