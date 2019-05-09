/* eslint-disable eqeqeq */
<template>
  <div class="add-class-wrap">
    <VBread>观影规则设置-规则设置</VBread>
    <div class="content-wrap">
      <div class="form-box">
        <Form ref="formRules" :model="formData" :rules="rules" :label-width="240">
          <FormItem label="游客可获得观影次数：" prop="touristNum" >
            <Input type="text" v-model="formData.touristNum" style="width:200px"/>
            <p class="tips">说明：用户未注册时，可获得的免费观影次数，不使用不过期</p>
          </FormItem>
          <FormItem label="注册可获得观影次数：" prop="loginNum">
            <Input type="text" v-model="formData.loginNum" style="width:200px"/>
            <p class="tips">说明：用户注册后，可获得的免费观影次数，与游客观影次数可叠加，不使用不过期</p>
          </FormItem>
          <FormItem label="点击单个广告可获得观影次数：" prop="clickAdNum">
            <Input type="text" v-model="formData.clickAdNum" style="width:200px"/>
            <p class="tips">说明：用户注册后，点击页面内任意广告可获得的免费观影次数，单个广告每个用户ID每日只计算一次点击量。通过点击广告获得的观影次数在每日凌晨会进行清零。</p>
          </FormItem>
          <FormItem label="每日可获得观影次数上限（广告）：" prop="adNumLimit">
            <Input type="text" v-model="formData.adNumLimit" style="width:200px"/>
            <p class="tips">说明：用户注册后，每日点击广告可免费获得的观影次数上限，通过点击广告获得的观影次数在每日凌晨会进行清零。</p>
          </FormItem>
          <FormItem class="mark-box" label="观影规则说明：" prop="viewingRule">
            <div ref="editor" style="text-align:left;width: 820px;"></div>
          </FormItem>
          <FormItem>
            <Button type="default" @click="back()">返回</Button>
            <Button  type="primary" @click="submitRules" style="margin-left: 20px">提交</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
import VBread from '@/components/common/VBread'
export default {
  name: 'watchRules',
  data () {
    // 验证数字
    const number = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入次数'))
      }
      if (!Number.isInteger(value * 1) || value <= 0) {
        callback(new Error('请输入一个正确的次数'))
      } else {
        callback()
      }
    }
    // 验证富文本
    const viewingRul = (rule, value, callback) => {
      if (!this.formData.viewingRul) {
        callback(new Error('请输入观影规则说明'))
      } else {
        if (value === '<p><br></p>') {
          callback(new Error('请输入观影规则说明'))
        } else {
          callback()
        }
      }
    }
    return {
      editor: '', // 富文本
      formData: {
        touristNum: '',
        loginNum: '',
        clickAdNum: '',
        adNumLimit: '',
        viewingRule: '',
        id: null
      },
      rules: {
        touristNum: [{required: true, validator: number, trigger: 'change'}],
        loginNum: [{required: true, validator: number, trigger: 'change'}],
        clickAdNum: [{required: true, validator: number, trigger: 'change'}],
        adNumLimit: [{required: true, validator: number, trigger: 'change'}],
        viewingRul: [{required: true, validator: viewingRul, trigger: 'blur'}]
      }
    }
  },
  components: {
    VBread
  },
  mounted () {
    // editor.txt.html
    this.editor = new E(this.$refs.editor)
    this.editor.customConfig.onchange = (html) => {
      this.formData.viewingRule = html
    }
    this.editor.create()
    this.getRules()
  },
  methods: {
    // 获取规则
    getRules () {
      this.$http.get('/rule/list').then(res => {
        if (res.data.code === 1) {
          this.formData = Object.assign({}, res.data.data)
          this.editor.txt.html(this.formData.viewingRule)
        }
      })
    },
    submitRules () {
      this.$refs['formRules'].validate((valid) => {
        if (valid) {
          this.$http.post('/rule/update', this.formData).then(res => {
            this.$Message.success(res.data.msg)
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
.add-class-wrap {
  .content-wrap{
    width: 1060px;
    padding: 50px;
    .form-box{
      .ivu-form-item-content{
        @include dp-flex();
        .tips{
          line-height: 18px;
          width: 600px;
          margin-left: 20px;

        }
      }
    }
  }
}
.uploap-img{
  .demo-upload-list{
    display: inline-block;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
}
</style>
