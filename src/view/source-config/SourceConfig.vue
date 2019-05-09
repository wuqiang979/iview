/* eslint-disable eqeqeq */
<template>
  <div class="source-config-wrap">
    <VBread>资源配置</VBread>
    <div class="content-wrap">
      <div class="form-box">
        <Form ref="formData" :model="formData" :rules="rules" :label-width="120" style="width: 420px">
          <div class="block-title"><span>APP启动页</span></div>
          <FormItem label="启动页背景：" prop="url">
            <Upload v-if="dataLoaded" @getUrl='getOpenBgFromChild' :url='formData.url'></Upload>
            <span style='color: #999'>图片格式为：jpg、jpge、png</span>
          </FormItem>
          <FormItem label="LOGO图片：" prop="logoUrl">
            <Upload v-if="dataLoaded"  width='200' @getUrl='getLogoFromChild' :url='formData.logoUrl'></Upload>
            <span style='color: #999'>图片格式为：jpg、jpge、png</span>
          </FormItem>
          <FormItem label="中间文字：">
            <Input type="text" v-model="formData.text1" :maxlength="15" placeholder="请输入内容（15字内，选填)"/>
          </FormItem>
          <FormItem label="底部文字：">
            <Input type="text" v-model.number="formData.text2" :maxlength="20" placeholder="请输入内容（20字内，选填)"/>
          </FormItem>
          <div class="block-title"><span>分享页面</span></div>
          <FormItem label="背景图片：" prop="bgUrl">
            <Upload v-if="dataLoaded" @getUrl='getBgUrlFromChild' :url='formData.bgUrl'></Upload>
            <span style='color: #999'>图片格式为：jpg、jpge、png</span>
          </FormItem>
          <FormItem>
            <Button type="default" @click="back()">返回</Button>
            <Button  type="primary" :loading='btn_loading' @click="submitData" style="margin-left: 20px">提交</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/utils/storage'
import VBread from '@/components/common/VBread'
import Upload from '@/components/common/Upload'
export default {
  name: 'sourceConfig',
  data () {
    // 验证图片不能为空
    const imgUrl = (rule, value, callback) => {
      if (!this.formData.url) {
        return callback(new Error('启动背景图片不能为空'))
      } else {
        callback()
      }
    }
    // 验证图片不能为空
    const logoUrl = (rule, value, callback) => {
      if (!this.formData.logoUrl) {
        return callback(new Error('logo图片不能为空'))
      } else {
        callback()
      }
    }
    // 验证图片不能为空
    const bgUrl = (rule, value, callback) => {
      if (!this.formData.bgUrl) {
        return callback(new Error('分享页面背景图片不能为空'))
      } else {
        callback()
      }
    }
    return {
      btn_loading: false,
      dataLoaded: false,
      updataImgUrl: uploadBaseUrl,
      accessToken: '',
      pageTitle: '',
      formData: {
        url: '',
        logoUrl: '',
        text1: '',
        text2: '',
        bgUrl: ''
      },
      rules: {
        url: [{ required: true, validator: imgUrl, trigger: 'blur' }],
        logoUrl: [{ required: true, validator: logoUrl, trigger: 'blur' }],
        bgUrl: [{ required: true, validator: bgUrl, trigger: 'blur' }]
      },
      imgName: '',
      visible: false,
      uploadList: []
    }
  },
  components: {
    VBread,
    Upload
  },
  computed: {

  },
  created () {
    this.pageTitle = this.$route.query.title
    this.accessToken = getUserInfo().token
    this.getConfigData()
  },
  methods: {
    // 从Upload中获取启动页的url
    getOpenBgFromChild (url) {
      this.formData.url = url
    },
    // 从Upload中获取LOGO图片的url
    getLogoFromChild (url) {
      this.formData.logoUrl = url
    },
    // 从Upload中获取分享页面背景图片的url
    getBgUrlFromChild (url) {
      this.formData.bgUrl = url
    },
    // 获取资源配置
    getConfigData () {
      this.$http.get('/rule/config').then(res => {
        if (res.data.code === 1) {
          this.formData = res.data.data
          this.$nextTick(res => {
            this.dataLoaded = true
          })
        }
      })
    },
    submitData () {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          this.btn_loading = true
          this.$http.post('/rule/updateConfig', this.formData).then(res => {
            this.btn_loading = false
            if (res.data.code === 1) {
              this.$Message.success(res.data.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/assets/css/mixin.scss';
.source-config-wrap {
  .content-wrap{
    .form-box{
      .block-title{
        border-left: 4px solid #2d8cf0;
        position: relative;
        height: 20px;
        font-weight: bold;
        margin-bottom: 20px;
        span{
          position: absolute;
          bottom: 0px;
          left: 9px;
          line-height: 14px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
