<template>  
	<view class="whole">
		<!-- 轮播器 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="6000" :duration="900" circular="ture">
			<swiper-item v-for="item in swiper_index" :key="item.id">
				<image :src="item.pic" mode="scaleToFill" class="swiper_image"></image>
			</swiper-item>	  	
		</swiper>	
	  
		<!-- 功能栏 -->
		<view class="function">
			<view v-for="(item,index) in function_index" :key="index" :class="['function_item', `function_${index+1}_item`]" @click="navigateTo(item.url)">
				<image :src="item.pic" mode="aspectFit"></image>
				<text class="function_text">{{item.name}}</text>
				<text class="note_text">{{item.note_text}}</text>
				
				<!-- 添加模糊 -->
				<view :class="['vague',`vague_${index+1 }`]"></view>
			</view>
		</view>
		<!-- 推荐讲座 -->
		<view class="scroll_recommand">
			<!-- 上栏 -->
			<view class="recommand_text">
				<text>{{reconmmandText}}</text>
				<view class="more_recommand" @click="navigaToActivity">
					<text>更多</text>
					<image src="/static/image/icon/右箭头.png" mode="aspectFit"></image>
				</view>
			</view>
			<!-- 下栏 -->
			<scroll-view  class="scroll" scroll-x ="ture" >		
				<view class="scroll_item" v-for="(item) in scroll_recommend" :key="item.id">
					<view class="item_composition" @click="navigateToDetail(item)">
						<image :src="item.pic" mode="aspectFit"></image>
						<text>{{item.name}}{{item.id}}</text>
						<text style="color: #919191;">{{item.time}}</text>
					</view>
				</view>
			</scroll-view>  		
		</view>
	
		<!-- 最新讲座 -->
		<view class="scroll_recommand">
				<!-- 上栏 -->
				<view class="recommand_text" @click="navigaToActivity"> 
					<text>{{newText}}</text>
					<view class="more_recommand">
						<text>更多</text>
						<image src="/static/image/icon/右箭头.png" mode="aspectFit"></image>
					</view>
				</view>
				<!-- 下栏 -->
			<scroll-view  class="scroll" scroll-x ="ture" show-scrollbar="false">		
				<view class="scroll_item" v-for="(item) in scroll_recommend" :key="item.id">
						<view class="item_composition" @click="navigateToDetail(item)">
							<image :src="item.pic" mode="aspectFit"></image>
							<text>{{item.name}}{{item.id}}</text>
							<text style="color: #919191;">{{item.time}}</text>
						</view>
				</view>
			</scroll-view>
			
		</view>
	
		<!-- 热门讲座 -->
		<view class="scroll_new_hot">
					<!-- 上栏 -->
					<view class="newhot_text">
						<text>{{hotText}}</text>
						<view class="more_new" @click="navigaToActivity">
							<text>更多</text>
							<image src="/static/image/icon/右箭头.png" mode="aspectFit"></image>
						</view>
					</view>
					<!-- 中栏 -->
					<view class="scroll_type">
						<view v-for="(item,index) in typeSelect" class="typeitem" :class="{'selectitem': currentTypeIndex === index}" @click="typeSelectChangeHot(index)">
							{{item}}
						</view>
						
					</view>
					<!-- 下栏 -->
				<scroll-view  class="scroll" scroll-x ="ture" show-scrollbar="false">		
					<view class="scroll_item" v-for="(item) in filterhot" :key="item.id">
							<view class="item_composition" @click="navigateToDetail(item)">
								<image :src="item.pic" mode="aspectFit"></image>
								<text>{{item.name}}{{item.id}}</text>
								<!-- <text style="color: #919191;">{{item.time}}</text> -->
							</view>
					</view>
				</scroll-view>
				
			</view>
	</view>
</template>  
  
	
	
	
<script setup>  
	import {computed, reactive, ref} from "vue";
	
	
	const reconmmandText = ref("推荐讲座");
	const newText = ref("最新讲座");
	const hotText = ref("热门讲座");
	
	// 类别选择器中的内容
	const typeSelect = ref([ '美育','三创','经典百书','其他']);
	const filternew = ref([]);
	const currentTypeIndex = ref(0);  //默认是第一个-美育
	
	// 首页轮播图
	const swiper_index = ref(
		[
			{
				id:1,
				pic:'https://www.freeimg.cn/i/2024/01/31/65b9de8cb4a8f.jpg',
			},
			{
				id:2,
				pic:'https://www.freeimg.cn/i/2024/01/31/65b9de9a30031.jpg',
			},
			{
				id:3,
				pic:'https://www.freeimg.cn/i/2024/01/31/65b9de9b7022d.jpg', 
			},
			{
				id:4,
				pic:'https://www.freeimg.cn/i/2024/01/31/65b9de9a57c43.jpg',
			},		
		]
	);
	
	// 功能选项
	const function_index = reactive(
		[
			{
				pic:'/static/image/icon/定位打卡.png',
				name:"打卡",
				note_text: "人到心也到",
				url: '/pages/index/deputy_index/locationClockin/locationClockin'
			},
			{
				pic:'/static/image/icon/打招呼.png',
				name:"我要发布",
				note_text: "活动在于你我",
				url: '/pages/index/deputy_index/publish/publish'
			},
			{
				pic:'/static/image/icon/敬请期待.png',
				name:"更多精彩",
				note_text: "敬请期待",
				url: '/pages/test/test',
				// 真实的在下面
				// url: 'deputy_index/moreExciting/moreExciting'
			}
		]
	)
	// 推荐滚动视图
	// type表类型(三创=0 美育=1 经典百书=2 其他=3)
	const scroll_recommend = reactive(
		[
			{
				id:1,
				name:'测试',
				pic:'https://www.freeimg.cn/i/2024/01/31/65b9de9a57c43.jpg',
				time:'2024/3/11',
				type:3
			},
			{
				id:2,
				name:'测试',
				pic:'https://www.freeimg.cn/i/2024/01/31/65b9de9a57c43.jpg',
				time:'2024/4/11',
				type:1
			},
			{
				id:3,
				name:'测试',
				pic:'https://www.freeimg.cn/i/2024/01/31/65b9de9a57c43.jpg',
				time:'2024/1/11',
				type:0
			},
			{
				id:4,
				name:'测试',
				pic:'https://www.freeimg.cn/i/2024/01/31/65b9de9a57c43.jpg',
				time:'2024/1/11',
				type:1
			},
			{
				id:5,
				name:'测试',
				pic:'https://www.freeimg.cn/i/2024/01/31/65b9de8cb4a8f.jpg',
				time:'2024/2/11',
				type:2
			},
			{
				id:6,
				name:'测试',
				pic:'https://www.freeimg.cn/i/2024/01/31/65b9de8cb4a8f.jpg',
				time:'2024/2/11',
				type:2
			}
		]
	);
	
	//页面跳转
	function navigateTo(link){
		uni.navigateTo({
			url:link
		})
	}
	// 跳转到活动
	function navigaToActivity() {
	    uni.switchTab({
	        url: '/pages/activity/activity'
	    });
	}
	// 跳转到讲座详情页面
	function navigateToDetail(item){
		uni.navigateTo({
			url: '/pages/lectureDetail/lectureDetail?itemId=' + item.id
		});
	}
	
	
	// 加分类型选择器筛选更新数据-热门
	function typeSelectChangeHot(index){
		// console.log(index);	//检查当先选中的序号
		currentTypeIndex.value = index;
	}
	const filterhot = computed(()=>{
		return scroll_recommend.filter(item => item.type === currentTypeIndex.value)
	})
	
</script>  
  
<style lang="scss">  
	.whole{	
		background-color:#ececec ;
		// 轮播器
		swiper{
			height: 400rpx;
			width: 100%;
			swiper-item{
				align-items: center;
				justify-content: center;
				
				.swiper_image{
					height: 400rpx;
					width: 100%;
				}
			}			
		}
		
		// 功能栏
		.function{
			// width: 100%;
			height: 300rpx;
			margin: 0rpx 0rpx;
			padding: 0rpx 25rpx;
			border-bottom-right-radius: 20rpx;
			border-bottom-left-radius: 20rpx;
			background-color: #FFFFFF;
			box-shadow: 0rpx 10rpx 18rpx -10rpx #8a8a8a;
			
			display: flex;
			justify-content: space-around;
			flex-direction: row;
			align-items: center;
			
			.function_item{				  
				width: 30%;
				height: 70%;
				border: 2rpx #cecece solid;
				border-radius: 20rpx;
				// padding: 20rpx;
				display: flex;
				justify-content: space-around;
				flex-direction: column;
				align-items: center;
				
				position: relative;
				overflow: hidden; /* 确保模糊区域不会溢出 */  
				z-index: 1; /* 提高这些元素的堆叠顺序，确保它们在模糊区域之上 */  
				image{
					width: 60rpx;
					height: 60rpx;
					margin-top: 30rpx;
					margin-bottom: 10rpx;
				}
				.function_text{
					font-size: 28rpx;
					margin-top: 10rpx;
					letter-spacing: 2rpx;
					font-weight: bold;
				}
				.note_text{
					font-size: 20rpx;
					margin-bottom: 20rpx;
				}				
				.vague{
					position: absolute;
					top: 20rpx;  
					right: 20rpx;  
					width: 65%; 
					height: 66%;  
					
					filter: blur(18px); /* 模糊效果，你可以调整这个值来改变模糊程度 */
					z-index: -1; /* 提高这些元素的堆叠顺序，确保它们在模糊区域之上 */  
				}
				.vague_1{
					background-color: rgba(255, 130, 249, 0.5); /* 半透明背景 */  
				}
				.vague_2{
					background-color: rgba(255, 244, 87, 0.5); /* 半透明背景 */  
				}
				.vague_3{
					background-color: rgba(222, 162, 92, 0.6); /* 半透明背景 */  
				}
				
			}
			.function_1_item{
				.function_text{
					color: #560081;
					// font-size: 28rpx;
					// margin-top: 10rpx;
				}
				.note_text{
					color: #560081;
					// font-size: 20rpx;
					// margin-bottom: 20rpx;
				}
			}
			.function_2_item{
				.function_text{
					color: #dda46b;
					// font-size: 28rpx;
					// margin-top: 10rpx;
				}
				.note_text{
					color: #dda46b;
					// font-size: 20rpx;
					// margin-bottom: 20rpx;
				}
			}
			.function_3_item{
				.function_text{
					color: #000000;
				}
				.note_text{
					color: #000000;
					// font-size: 20rpx;
					// margin-bottom: 20rpx;
				}
			}
		}
		
		// 推荐讲座 
		.scroll_recommand{
			// width: 100%;
			height: 400rpx;
			margin: 30rpx 30rpx;
			background-color: #FFFFFF;
			border-radius: 25rpx;
			
			// 上栏
			.recommand_text{
				height: 60rpx;
				padding: 20rpx 20rpx 0rpx 20rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				
				text{
					font-size: 36rpx;
					font-weight: 600;
				}
				
				.more_recommand{
					text{
						font-size: 32rpx;
						font-weight: normal;
						// color: #b8b8b8;
					}
					image{
						height: 25rpx;
						width: 25rpx;
					}
				}
			}
			
			// 下栏
			.scroll{
				width: 100%;
				height: 320rpx;			
				white-space: nowrap; 
				// x轴滑动需要此项1/2
				
				.scroll_item{				
					width: 46%;
					height: 100%;
					
					display: inline-block;
					// x轴滑动需要此项2/2
					.item_composition{
						height: 280rpx;
						padding: 20rpx 0rpx 20rpx 20rpx;
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						justify-content: space-around;
						image{
							width: 100%;
							height: 170rpx;
							
							// margin-top: 20rpx;
							border-radius: 25rpx;
						}
					}
					
				}
			}
		}
		
		// 热门/最新讲座
		.scroll_new_hot{
			height: 450rpx;
			margin: 30rpx 30rpx;
			background-color: #FFFFFF;
			border-radius: 25rpx;
			
			// 上栏
			.newhot_text{
				height: 60rpx;
				padding: 20rpx 20rpx 0rpx 20rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				
				text{
					font-size: 36rpx;
					font-weight: 600;
				}
				
				.more_new{
					text{
						font-size: 32rpx;
						font-weight: normal;
						// color: #;
					}
					image{
						height: 25rpx;
						width: 25rpx;
					}
				}
			}
			
			// 中栏
			.scroll_type{
				height: 100rpx;
				width: 100%;
				
				display: flex;
				align-items: center;
				
				.typeitem{
					// width: 150rpx;
					height: 50rpx;
					margin: 0rpx 20rpx;
					padding: 0rpx 10rpx;
					background-color: #ececec;
					
					align-items: center;
				}
				
				.selectitem{
					background-color: #ffe2e2;
					color: #ff7878;
				}
			}
			// 下栏
			.scroll{
				width: 100%;
				height: 320rpx;			
				white-space: nowrap; 
				// x轴滑动需要此项1/2
				
				
				.scroll_item{				
					width: 46%;
					height: 100%;
					
					display: inline-block;
					// x轴滑动需要此项2/2
					.item_composition{
						height: 230rpx;
						padding: 20rpx 0rpx 20rpx 20rpx;
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						justify-content: space-around;
						image{
							width: 100%;
							height: 170rpx;
							
							// margin-top: 20rpx;
							border-radius: 25rpx;
						}
					}
					
				}
			}
		}
	}
	
	
	
</style>