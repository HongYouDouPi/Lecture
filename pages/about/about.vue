<template>
  <view class="whole">
    <!-- 我-头像和名字 -->
    <view class="mine">
      <image :src="myImgUrl" mode="aspectFill" class="my_background"></image>
      <!-- 信息栏 -->
      <view class="list">
        <!-- 参加/未完成 -->
        <view class="attend">
          <view class="attend_list" v-for="(item, index) in list" :key="index" @click="navigateTo(item.path)">
            <image :src="item.pic" mode="aspectFit" class="attend_pic"></image>
            <text>{{ item.name }}</text>
          </view>
        </view>
        
        <!-- 小功能 -->
        <view class="function">
          <!-- 收藏发布 -->
          <view class="function_mine base_appearance">
            <view class="favorites base_appearance_single">
              <image src="https://www.freeimg.cn/i/2024/02/19/65d2c509c96f3.png" mode="aspectFit" class="favorites"></image>
              <text>我的收藏</text>
            </view>                      
            <view class="base_appearance_single" @click="navigateTo_mypublish">
              <image src="https://www.freeimg.cn/i/2024/02/19/65d2c509cbce9.png" mode="aspectFit"></image>
              <text>我的发布</text>
            </view>
          </view>
          
          <!-- 编辑个人信息 -->
          <view class="edit base_appearance" @click="navigateTo_edit">
            <view class="base_appearance_single">
              <image src="https://www.freeimg.cn/i/2024/02/19/65d2c509c395c.png" mode="aspectFit"></image>
              <text>编辑个人信息</text>
            </view>                      
          </view> 
          
          <!-- 分享交流 -->
          <view class="share base_appearance">
            <view class="base_appearance_single">
              <image src="https://www.freeimg.cn/i/2024/02/19/65d2c726be67d.png" mode="aspectFit"></image>
              <text>联系反馈</text>
            </view>
            <view class="base_appearance_single">
              <image src="https://www.freeimg.cn/i/2024/02/19/65d2c509cac2f.png" mode="aspectFit"></image>
              <text>分享好友</text>
            </view>                      
          </view>
          
		  <!-- 登录/注册 -->
		  <view class="sign_up" @click="showLoginModal = true" v-if="!isLoggedIn">
		    <text>登录/注册</text>
		  </view>
		  <!-- 退出登录 -->
		  <view class="sign_out" v-if="isLoggedIn">
		    <text>退出登录</text>
		  </view>
				
		  <!-- 登录模态窗口 -->
		    <view class="modal" v-if="showLoginModal">
		      <view class="modal-content">
		        <view class="input-field">
		          <text>学号:</text>
		          <input type="number" v-model="student_id" placeholder="请输入学号" />
		        </view>
		        <view class="input-field">
		          <text>密码:</text>
		          <input type="password" v-model="password" placeholder="请输入密码" />
		        </view>
		        <button @click="submitLogin">确认</button>
		      </view>
		    </view>
		  
        </view>
	  </view>
		<!-- 头像名字 -->
		<view class="my">
			<image :src="myImgUrl" class="my_img"></image>
			<text class="my_text">{{ myName }}</text>
		</view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const isLoggedIn = ref(false); // 用户是否登录
const showLoginModal = ref(false); // 是否显示登录模态
const student_id = ref(''); // 用户名
const password = ref(''); // 密码
const myImgUrl = ref('');
const defaultImg = ref('https://www.freeimg.cn/i/2024/02/07/65c2f64ebb38d.png')
const myName = ref('游客');
myImgUrl.value = defaultImg.value;


// 选项
const list = ref([
  { name: '全部参加', pic: 'https://www.freeimg.cn/i/2024/02/15/65cd870a725bc.png', path: '/pages/alljoin/alljoin' },
  { name: '已完成', pic: 'https://www.freeimg.cn/i/2024/02/15/65cd860bcb186.png', path: '/pages/finished/finished' },
  { name: '待参加', pic: 'https://www.freeimg.cn/i/2024/02/15/65cd860be609d.png', path: '/pages/waitjoin/waitjoin' },
]);


function navigateTo_mypublish() {
  uni.navigateTo({
    url: '/pages/mypublish/mypublish'
  });
}

function navigateTo_edit() {
  uni.navigateTo({
    url: '/pages/edit/edit'
  });
}

// 提交登录信息
function submitLogin() {
  console.log('登录信息：', student_id.value, password.value);
  showLoginModal.value = false;
  
  // 发送 HTTP 请求到后端
    uni.request({
      url: 'http://127.0.0.1:8080/lecturelogin', // 修改成你的后端登录接口地址
      method: 'POST',
      data: {
        student_id: student_id.value,
        password: password.value
      },
      success(res) {
        console.log('请求成功',res.data); // 输出后端返回的数据
        // 处理后端返回的数据，例如显示登录结果
      },
      fail(err) {
        console.error('请求失败',err);
      }
    });
}


</script>

<style lang="scss">
	.whole{
		width: 100%;
		// background-color: #aaaaff;
		// 我-头像和名字-背景图片
		.mine{
			height: 550rpx;
			width: 100%;
			
			// 一般祖先容器使用相对定位 也就是relative
			position: relative;
			
			// .hide-scrollbar::-webkit-scrollbar {  
			//   display: none;  
			// }  
			
			.my_background{
				// 背景图片高度
				height: 425rpx;
				width: 100%;	
			}
			
			//信息栏
			.list{
				// height: 2000rpx;
				width: 100%;
				background-color: #ececec;
				border-top-left-radius: 30rpx;
				border-top-right-radius: 30rpx;
				
				position: absolute;
				top:400rpx;
				//参加/未完成
				.attend{
					height: 200rpx;
					// width: 670rpx;
					margin: 100rpx 40rpx 40rpx 40rpx;
					border-radius: 25rpx;
					background-color: #ffffff;
					box-shadow: 0rpx 15rpx 30rpx -20rpx #a88383;
					
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-around;
					.attend_list{
						width: 150rpx;
						height: 120rpx;
						font-size: 30rpx;
						font-weight: 500;
						
						display: flex;
						align-items: center;
						flex-direction: column;
						justify-content: space-around;
						.attend_pic{
							width: 60rpx;
							height: 60rpx;
						}
					}
					
				}
				
				.function{
					
					width: 100%;
					image{
						width: 50rpx;
						height: 50rpx;
						margin: 0rpx 10rpx 0rpx 20rpx;
					}
					text{
						// margin-left: 10rpx;
						font-size: 30rpx;
						font-weight: 500;
						letter-spacing: 1rpx;
					}
					.base_appearance{
						
						margin: 0rpx 40rpx 40rpx 40rpx;
						border-radius: 25rpx;
						background-color: #ffffff;
						box-shadow: 0rpx 15rpx 30rpx -20rpx #a88383;
					}
					.base_appearance_single{
						height: 100rpx;
						display: flex;
						align-items: center;
						margin: 0rpx 15rpx;
					}
					.sign_up{
						height: 100rpx;
						margin: 80rpx 150rpx 240rpx 150rpx;
						background-color: #55aa00;
						border-radius: 30rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						
						text{
							font-size: 36rpx;
							color: #ffffff;
							letter-spacing: 5rpx;
						}
					}
					.sign_out{
						// width: 500rpx;
						height: 100rpx;
						margin: 80rpx 150rpx 240rpx 150rpx;
						background-color: #ff8c7d;
						border-radius: 30rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						
						text{
							font-size: 36rpx;
							color: #ffffff;
							letter-spacing: 5rpx;
						}
					}
				}
			}
			.my{
				width: 300rpx; /* 宽度为容器的一半 */
				height: 320rpx; /* 高度与容器相同 */  
				// 位置为绝对位置 绝对于祖先容器
				position: absolute;  
				top:310rpx; /* 从顶部开始，向下450rpx */  
				left: 50%; /* 从左侧开始，不偏移 */  
				transform: translate(-50%,-50%); /* 改变原来的中心点 向x轴左边 y轴下边偏移50% 就使得其图片/元素居中 */  
			
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				
				.my_img{
					// margin-top: 10rpx;
					height: 200rpx;
					width: 200rpx;
					box-shadow: 0rpx 0rpx 28rpx 4rpx #ffffff;
					border-radius: 20rpx;
				}
				
				.my_text{
					height: 60rpx;
					font-size: 40rpx;
					font-weight: 700;
				}
			}
		}
		.modal {
		  position: fixed;
		  top: 0;
		  left: 0;
		  right: 0;
		  bottom: 0;
		  background-color: rgba(0, 0, 0, 0.6);
		  display: flex;
		  justify-content: center;
		  align-items: center;
		}
		
		.modal-content {
		  background: white;
		  padding: 20px;
		  border-radius: 5px;
		}
		
		.input-field {
		  margin-bottom: 10px;
		}
		
	}
</style>
