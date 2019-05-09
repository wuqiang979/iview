<template>
  <div class="ndr-upload">
    <Upload
      ref="upload"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="['png','svg','jpg','jpge']"
      :max-size="2097152"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      :on-error='handleError'
      type="drag"
      :headers="headers"
      :action="updataImgUrl"
      style="display: inline-block;width:190px;height:200">
      <div style="width: 190px;min-height:200px;">
        <div v-if='!fileData.url'  style="line-height:200px">
          <Icon type="ios-camera" size="60"></Icon>
        </div>
        <div v-else style="line-height: 0">
          <img width='190' :src='fileData.url'/>
        </div>
      </div>
    </Upload>
  </div>
</template>

<script>
export default {
  name: 'ndrUpload',
  props: {
    headers: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return {}
      }
    },
    data: {
      type: Object,
      default: function () {
        return {}
      }
    },
    url: {
      type: String,
      defualt: ''
    }
  },
  data () {
    return {
      updataImgUrl: uploadBaseUrl,
      fileData: {}
    }
  },
  created () {
    this.fileData.url = this.url
    console.log(this.url)
  },
  mounted () {
    // this.uploadList = this.$refs.upload.fileList
  },
  methods: {
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      this.formCustom.img = ''
    },
    handleSuccess (res, file) {
      file.url = res.data
      this.fileData = file
      if (this.$refs.upload.fileList.length > 1) {
        this.$refs.upload.fileList.splice(0, 1)
      }
      this.$emit('getUrl', res.data)
    },
    handleFormatError (file) {
      this.$Message.warning('请上传制定格式的图标')
    },
    handleMaxSize (file) {
      this.$Message.warning('图片尺寸最大不能操作2M')
    },
    handleError () {
      // console.log(file)
      // file.url = 'https://img2.9000ji.com/20190313/587026622.mp4'
    },
    handleBeforeUpload () {
      // return check
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
@import '@/assets/css/mixin.scss';
.ndr-upload {

}
</style>
