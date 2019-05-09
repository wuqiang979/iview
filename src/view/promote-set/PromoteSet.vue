/* eslint-disable eqeqeq */
<template>
  <div class="promote-set-wrap">
    <VBread>推广规则设置-推广规则</VBread>
    <div class="content-wrap">
      <div class="form-box">
        <Form ref="formRules" :model="formData" :rules="rules" :label-width="200">
          <FormItem label="每分享1个用户可获得观影次数：" prop="inviteNum" >
            <Input type="text" v-model="formData.inviteNum" style="width:380px"/>
          </FormItem>
          <FormItem label="邀请第1个用户可获得观影次数：" prop="firstInviteNum">
            <Input type="text" v-model="formData.firstInviteNum" style="width:380px"/>
          </FormItem>
          <FormItem class="mark-box" label="邀请规则说明：" prop="inviteRule">
            <div ref="editor" style="text-align:left;width: 820px;"></div>
          </FormItem>
          <FormItem>
            <Button type="default" @click="back()">返回</Button>
            <Button  type="primary" :loading='btn_loading' @click="submitRules" style="margin-left: 20px">提交</Button>
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
  name: 'addClass',
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
    const inviteRule = (rule, value, callback) => {
      if (!this.formData.inviteRule) {
        callback(new Error('请输入观影规则说明'))
      } else {
        if (value === '<p><br></p>') {
          callback(new Error('请输入规则说明'))
        } else {
          callback()
        }
      }
    }
    return {
      btn_loading: false,
      editor: '', // 富文本
      formData: {
        inviteNum: '',
        firstInviteNum: '',
        inviteRule: '',
        id: null
      },
      rules: {
        inviteNum: [{required: true, validator: number, trigger: 'change'}],
        firstInviteNum: [{required: true, validator: number, trigger: 'change'}],
        inviteRule: [{required: true, validator: inviteRule, trigger: 'blur'}]
      }
    }
  },
  components: {
    VBread
  },
  computed: {

  },
  mounted () {
    // editor.txt.html
    this.editor = new E(this.$refs.editor)
    this.editor.customConfig.onchange = (html) => {
      this.formData.inviteRule = html
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
          this.editor.txt.html(this.formData.inviteRule)
        }
      })
    },
    submitRules () {
      this.$refs['formRules'].validate((valid) => {
        if (valid) {
          this.btn_loading = true
          this.$http.post('/rule/update', this.formData).then(res => {
            this.btn_loading = false
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
.promote-set {
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
</style>
