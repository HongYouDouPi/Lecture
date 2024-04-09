<template>
	<view class="whole">
		<view class="Base_Information_pic">
			<image :src="LectureImage" mode="aspectFill" ></image>
		</view>
		<view class="Base_Information">
			<!-- 标题 -->
			<text class="LectureName">{{LectureName}}</text>
			<!-- 时间： -->
			<text style="font-size: 26rpx; color: #888888;letter-spacing: 1rpx;">{{DateTime}}</text>
			<view class="CollegeBar">
				<!-- 学院 -->
				<view class="college">
					<image src="../../static/image/icon/我的.png" mode="aspectFit"></image>
					<text>{{CollegeName}}</text>
				</view>
				
				<!-- 关注 -->
					<!-- 由于不涉及其他功能 这里的关注就直接跳出那个二维码或者是相关链接就好了 -->
				<view class="follow">
					<image src="../../static/image/icon/加.png" mode="aspectFit"></image>
					<text>关注</text>	
				</view>
			</view>
		</view>
		
		<view class="content">  
			<!-- 切换栏 -->  
			<view class="tabbar">  
				<text @click="getView('detail')" :class="{'textselected':showDetail}">详情</text>
				<text @click="getView('list')" :class="{'textselected':showList}">参与名单</text>
			</view>  
			<!-- 详情容器 -->
			<view v-if="showDetail" class="LectureDetails"> 
				 <!-- 添加的公告部分 -->
				 <view class="announcement-section">
					 <view class="title">公告</view>
					 <view class="content">这里添加讲座相关的公告信息。</view>
				 </view>
				 
				 <!-- 添加的讲座简介部分 -->
				 <view class="lecture-introduction">
					 <view class="title">讲座简介</view>
					 <view class="content">这里添加讲座的详细介绍。</view>
				 </view>
				<text>
					<image src="../../static/image/icon/打招呼.png" mode="aspectFit"></image>
					公告
				</text>
			</view>
	  
			<!-- 参与名单容器 -->  
			<view v-if="showList" class="LectureParticipant">  
				<view v-for="(participant, index) in ParticipationList" :key="index" class="">  
					<text>姓名：{{ participant.name }}</text>  
					<text>学号：{{ participant.studentId }}</text>  
				</view>  
			</view>  
			
		</view>  
		
		<!-- 联系 -->
		<view class="contact">
			<view class="share">
				<image src="../../static/image/icon/定点.png" mode=""></image>
			</view>
			
		</view>    
			
	</view>
	
	
</template>

<script setup>
import { reactive, ref } from 'vue';
	// 基本信息
	const LectureImage = "../../static/image/user/boy.png";
	const LectureName = "宣讲会";
	const DateTime = "2024/4/10";
	
	// 学院栏
	const CollegeName = "计算机学院";
	
	
// 各种参数
	
	// 默认是显示详情的
	const showDetail = ref(true);
	const showList = ref(false);
	// 后面可以换成用户名和学号		---自定义
	const ParticipationList= reactive([  
			{ name: '张三', studentId: '20230001' },  
			{ name: '李四', studentId: '20230002' },  
			{ name: '王五', studentId: '20230003' },  
			{ name: '赵六', studentId: '20230004' },  
			{ name: '孙七', studentId: '20230005' }  
	]);
	function getView(e){
		if( e === 'detail'){
			showDetail.value = true;
			showList.value = false;
		}
		else{
			showDetail.value = false;
			showList.value = true;
		}
	}
		
	
</script>

<style lang="scss" scoped>
	.whole{
		width: 100%;
		.Base_Information_pic{
			height: 400rpx;
			overflow: hidden;
			image{
				width: 100%;
				// height: 400rpx;
			}
		}
		background-color: #ececec;
		.Base_Information{
			// height: 600rpx;
			display: flex;
			background-color: #FFFFFF;
			flex-direction: column;
			padding: 30rpx 40rpx;	
			// <!-- 标题 -->
			.LectureName{
				font-size: 40rpx;
				font-weight: bold;
				letter-spacing: 2rpx;
				height: 70rpx;
				display: flex;
				align-items: center;
				// margin-left: 20rpx;
			}
			// <!-- 学院 -->
			.CollegeBar{
				height: 100rpx;
				
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.college{
					display: flex;
					align-items: center;
					
					text{
						font-size: 28rpx;
						letter-spacing: 2rpx
					}
					image{
						width: 60rpx;
						height: 60rpx;
						border-radius: 30rpx;
						background-color: #df9500;
						margin-right: 20rpx;
					}
				}
				.follow{
					width: 110rpx;
					height: 50rpx;
					background-color: rgba(255, 209, 117, 0.4);
					color: #df9500;
					font-size: 28rpx;
					font-weight: bold;
					letter-spacing: 3rpx;
					border-radius: 12rpx;
					
					display: flex;
					align-items: center;
					justify-content: center;
					image{
						width: 28rpx;
						height: 28rpx;
						margin: 0 3rpx;
					}
				}
			}
		}
		
		// 内容
		.content{
			// width: 100%;	
			height: 500rpx;
			margin-top: 20rpx;
			padding: 30rpx;
			background-color: #FFFFFF;
			.tabbar{
				display: flex;
				justify-content: space-around;
				margin-bottom: 20rpx;
				align-items: center;
				
				text{
					font-size: 32rpx;
					height: 50rpx;
					width: 150rpx;
					
					display: flex;
					justify-content: center;
					align-items: flex-start;
					
				}
				.textselected{
					font-weight: bold;
					letter-spacing: 1rpx;
					box-shadow: 0rpx 6rpx 2rpx -2rpx #ffaa00;
				}
			}
			
			.LectureParticipant{
				
			}
			.LectureDetails{
				
				image{
					height: 30rpx;
					width: 30rpx;
					
				}
				
				/* 公告部分的样式 */
				.announcement-section {
				    padding: 10px;
				    background-color: #f2f2f2;
				    border-radius: 5px;
				    margin: 10px 0;
				}
				.announcement-section .title {
				    font-weight: bold;
				}
				.announcement-section .content {
				    color: #333;
				}
				
				/* 讲座简介部分的样式 */
				.lecture-introduction {
				    padding: 10px;
				    background-color: #f2f2f2;
				    border-radius: 5px;
				    margin-bottom: 10px;
				}
				.lecture-introduction .title {
				    font-weight: bold;
				}
				.lecture-introduction .content {
				    color: #333;
				}

			}
		}
	}
		
		// 联系
		.contact{
			
			image{
				height: 30rpx;
				width: 30rpx;
				
			}
		}
</style>
