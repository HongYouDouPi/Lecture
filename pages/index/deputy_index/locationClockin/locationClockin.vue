<template>
	<view class="map-page">
		<map id="map" class="map" :latitude="latitude" :longitude="longitude" :markers="covers"
			@regionchange="regionchange"></map>
		<!-- <cover-view class="btn-box">
			<cover-view class="btn" @click="submit">确认并保存</cover-view>
		</cover-view> -->
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				latitude: 23.040467,
				longitude: 113.370429,
				covers: [], //存放标记点数组
			}
		},
		onLoad() {
			this.getLocation();
			this.setCovers(this.latitude, this.longitude)
 
		},
		methods: {
			//获取经纬度
			getLocation() {
				let that = this;
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						let {
							latitude,
							longitude
						} = res;
						that.latitude = latitude;
						that.longitude = longitude;
						that.setCovers(latitude, longitude)
					},
 
				})
			},
			//地图视野发生变化
			regionchange(e) {
				if (e.type === 'end') {
					let {
						latitude,
						longitude
					} = e.detail.centerLocation;
					this.setCovers(latitude, longitude);
				} else if (e.type == 'regionchange') {
					let self = this
					this.mapContext = uni.createMapContext("map", this);
					this.mapContext.getCenterLocation({
						type: 'gcj02',
						success: (res) => {
							let {
								latitude,
								longitude
							} = res;
							this.setCovers(latitude, longitude);
						},
						fail: (err) => {
							// console.log('获取当前地图中心的经纬度2', err);
						}
					})
				}
			},
			//设置点位
			setCovers(latitude, longitude) {
				let location = {
					id: "0",
					latitude: Number(latitude),
					longitude: Number(longitude),
					width: uni.upx2px(20),
					height: uni.upx2px(20),
					iconPath: '../../../static/定点.png'
				}
				this.covers = [location]
			},
			//提交
			submit() {
				let that = this
				uni.showLoading({
					title: '提交中'
				});
				that.myAmapFun.getRegeo({
					location: `${this.longitude},${this.latitude}`,
					success: function(res) {
						uni.hideLoading();
						if(res.length > 0) {
						  uni.$emit('changeAddress', res[0]);
						  uni.navigateBack({
						    delta: 1
						  });
						} else {
						  uni.$u.toast('地址解析失败');
						}
					},
					fail: function(res) {
						uni.hideLoading();
						uni.$u.toast('地址解析失败');
					}
				})
			},
		}
	}
</script>
 
<style lang="scss">
	page {
		height: 100%;
	}
 
	.map-page {
		height: 100%;
 
		.map {
			width: 100%;
			height: 100%;
		}
 
		.btn-box {
			position: fixed;
			left: 0;
			bottom: 100rpx;
			right: 0;
			padding: 15rpx;
			padding-bottom: calc(constant(safe-area-inset-bottom) + 15rpx);
			padding-bottom: calc(env(safe-area-inset-bottom) + 15rpx);
 
			.btn {
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				border-radius: 10rpx;
				font-size: 32rpx;
				background-color: #ff6735;
				color: #fff;
			}
		}
	}
</style>