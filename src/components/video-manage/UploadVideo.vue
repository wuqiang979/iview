<template>
  <div class="upload-movie-wrap">
    <Form
      ref="uploadVideo"
      :model="uploadVideoFormData"
      :rules="uploadVideoFormDataValidate"
      :label-width="100"
      style="width: 1200px"
    >
      <FormItem class="mark-box" label="视频名称：" prop="name" style="width:500px">
        <Input type="text" v-model="uploadVideoFormData.name" size="large" placeholder="请输入视频名称" clearable/>
      </FormItem>
      <FormItem class="mark-box" label="视频热度：" prop="heat" style="width:500px">
        <Input type="text" v-model="uploadVideoFormData.heat" size="large" placeholder="请输入视频热度：0-100"><span slot="append" style="padding: 10px">%</span></Input>
      </FormItem>
      <FormItem class="mark-box" label="视频封面：" prop="imgUrl" style="width:500px">
        <Upload
          ref="uploadImg"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          :on-error='handleError'
          type="drag"
          :headers="{ACCESS_TOKEN: accessToken}"
          :action="updataImgUrl"
          style="display: inline-block;width:400px;">
          <div style="width: 400px;height:160px;line-height: 160px;">
            <Icon type="ios-camera" size="60" v-if="!uploadVideoFormData.imgUrl"></Icon>
            <img v-else :src="uploadVideoFormData.imgUrl" alt="">
          </div>
        </Upload>
      </FormItem>
      <FormItem class="mark-box" label="视频文件：" prop="url" style="width:500px">
        <Upload
          ref="uploadVideo"
          :show-upload-list="true"
          :on-success="handleSuccessVideo"
          :format="['mp4','ogg','wmv','rmvb','avi','flv', 'rm', 'asf','mpeg']"
          :max-size="2097152"
          :on-format-error="handleFormatErrorVideo"
          :on-exceeded-size="handleMaxSizeVideo"
          :before-upload="handleBeforeUploadVideo"
          :on-error='handleErrorVideo'
          type="drag"
          :headers="{ACCESS_TOKEN: accessToken}"
          :action="updataImgUrl"
          style="display: inline-block;width:400px;">
          <div style="width: 400px;min-height:200px;">
            <div v-if='!uploadVideoFormData.url'  style="line-height:200px">
              <Icon type="ios-camera" size="60"></Icon>
            </div>
            <div v-else style="line-height: 0">
              <video controls width='400' :src='uploadVideoFormData.url'></video>
            </div>
          </div>
      </Upload>
      </FormItem>
      <FormItem class="mark-box" label="备注说明：" style="width:500px">
        <Input clearable v-model="uploadVideoFormData.remark" :maxlength='50' :autosize="{minRows: 3,maxRows: 3}" type="textarea" placeholder="选填（50字内）"/>
      </FormItem>
      <FormItem class="mark-box" prop="category" style="width:500px;text-align:center;">
          <Button size='large' @click="$router.go(-1)">返回</Button>
          <Button size='large' type="primary" style="margin-left:40px;" @click="submitVideoInfo">
            <span v-if="$route.query.id">修改</span>
            <span v-else>保存</span>
          </Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { getUserInfo } from '@/utils/storage'
export default {
  name: 'uploadVideo',
  data () {
    // 验证排序权重
    const tagList = (rule, value, callback) => {
      if (this.submitMarkData.length === 0) {
        return callback(new Error('请添加视频标签'))
      } else {
        callback()
      }
    }
    // 验证排序权重
    const heat = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('权重排序不能为空'))
      }
      if (!Number.isInteger(value * 1) || value * 1 > 100) {
        callback(new Error('请输入一个正确的权重：0-100'))
      } else {
        callback()
      }
    }
    return {
      updataImgUrl: uploadBaseUrl,
      accessToken: '',
      uploadVideoFormData: {
        type: 0,
        status: 1,
        name: '',
        imgUrl: '',
        heat: '',
        url: '',
        remark: ''
      },
      uploadVideoFormDataValidate: {
        name: [{ required: true, message: '请输入视频名称', trigger: 'blur' }],
        heat: [{ required: true, validator: heat, trigger: 'blur' }],
        imgUrl: [{ required: true, message: '请上传视频封面', trigger: 'blur' }],
        url: [{ required: true, message: '请上传指定格式的视频文件', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.accessToken = getUserInfo().token
    this.getMovieData()
  },
  mounted () {

  },
  methods: {
    handleSuccess (res, file) {
      // if(res.data.code === 1){
      this.uploadVideoFormData.imgUrl = res.data
      // }else{
      //   this.$Message.error(res.data.msg)
      // }
    },
    handleFormatError (file) {
      this.$Message.warning('请上传制定格式的图标')
    },
    handleMaxSize (file) {
      this.$Message.warning('图片尺寸最大不能操作2M')
    },
    handleBeforeUpload () {

    },
    handleError () {
      this.$Notice.warning({
        title: '上传失败，请重试'
      })
    },

    // 上传视频
    handleSuccessVideo (res, file) {
      this.uploadVideoFormData.url = res.data
    },
    handleFormatErrorVideo () {
      this.$Message.warning('不支持此种视频格式')
    },
    handleMaxSizeVideo () {
      this.$Message.warning('视频最大不能操作2G')
    },
    handleBeforeUploadVideo () {

    },
    handleErrorVideo () {
      // console.log(file)
      // file.url = 'https://img2.9000ji.com/20190313/587026622.mp4'
    },
    // 获取电影详情
    getMovieData () {
      if (this.$route.query.id) {
        this.$http.get('/video/edit', {
          params: {
            id: this.$route.query.id,
            type: 0
          }
        }).then(res => {
          if (res.data.code === 1) {
            this.uploadVideoFormData = res.data.data
          } else {
            this.$Message.error(res.data.msg)
          }
        })
      }
    },
    // 提交/修改视频信息
    submitVideoInfo () {
      this.$refs['uploadVideo'].validate((valid) => {
        if (valid) {
          console.log(valid)
          let url = this.$route.query.id ? '/video/update' : '/video/add'
          this.$http.post(url, this.uploadVideoFormData).then(res => {
            if (res.data.code === 1) {
              this.$Message.success('res.data.msg')
              this.$router.push('/layout/videolist')
            } else {
              this.$Message.warning(res.data.msg ? res.data.msg : '返回数据错误')
            }
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
@import '@/assets/css/mixin.scss';
.upload-movie-wrap {

}
</style>
