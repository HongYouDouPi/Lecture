<template>  
  <view>  
    <button @click="chooseImages">选择图片</button>  
    <button @click="previewImages" v-if="selectedImages.length > 0">预览图片</button>  
    <button @click="uploadImages" v-if="selectedImages.length > 0">上传图片</button>  
  </view>  
</template>  
  
<script>  
export default {  
  data() {  
    return {  
      selectedImages: [] // 存储选择的图片路径  
    };  
  },  
  methods: {  
    // 从相册中选择图片  
    async chooseImages() {  
      try {  
        const res = await uni.chooseImage({  
          count: 9,  
          sizeType: ['original', 'compressed'],  
          sourceType: ['album', 'camera'],  
          success: (chooseImageRes) => {  
            this.selectedImages = chooseImageRes.tempFilePaths;  
          }  
        });  
      } catch (error) {  
        console.error('选择图片失败', error);  
      }  
    },  
  
    // 预览图片  
    async previewImages() {  
      if (this.selectedImages.length) {  
        try {  
          await uni.previewImage({  
            current: this.selectedImages[0],  
            urls: this.selectedImages  
          });  
        } catch (error) {  
          console.error('预览图片失败', error);  
        }  
      } else {  
        uni.showToast({  
          title: '请先选择图片',  
          icon: 'none'  
        });  
      }  
    },  
  
    // 上传图片  
    async uploadImages() {  
      if (!this.selectedImages.length) {  
        uni.showToast({  
          title: '请先选择图片',  
          icon: 'none'  
        });  
        return;  
      }  
  
      for (let i = 0; i < this.selectedImages.length; i++) {  
        const filePath = this.selectedImages[i];  
        const formData = {  
          // 设置你的上传表单信息  
          'user': 'someone'  
        };  
  
        try {  
          const uploadRes = await uni.uploadFile({  
            url: '你的上传接口地址', // 替换为你的上传接口地址  
            filePath: filePath,  
            name: 'file', // 后端接收的文件字段名  
            formData: formData,  
            success: (uploadFileRes) => {  
              console.log('上传成功', uploadFileRes);  
              // 处理上传成功后的逻辑  
            },  
            fail: (error) => {  
              console.error('上传失败', error);  
              // 处理上传失败的情况  
            }  
          });  
        } catch (error) {  
          console.error('上传图片失败', error);  
        }  
      }  
    }  
  }  
};  
</script>  
  
<style scoped>  
/* 在这里添加你的样式 */  
</style>