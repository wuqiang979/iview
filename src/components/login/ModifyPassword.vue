<template>
  <Modal
    class="v-modifypassword"
    title="账号资料"
    v-model="modifyModal"
    :styles="{top: '100px', width: '460px'}"
    @on-ok="submitModify"
    :mask-closable="false"
  >
    <div class="form-box">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
        <FormItem label="登录账号：" prop="name">
          <Input v-model="formValidate.count" disabled placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem class="password" label="登录密码：" prop="mail">
          <Input v-model="formValidate.password" disabled placeholder="Enter your e-mail"></Input>
          <span class="btn-modify" @click="onOffMore">
            <i class="iconfont iconicon-modify"></i>
          </span>
        </FormItem>
        <FormItem v-show="modify" class="password" label="新密码：" prop="newpassword">
          <Input v-model="formValidate.newpassword" placeholder="请输入新密码"></Input>
        </FormItem>
        <FormItem v-show="modify" class="password" label="确认密码：" prop="confirmpassword">
          <Input v-model="formValidate.confirmpassword" placeholder="请再次输入密码"></Input>
        </FormItem>
      </Form>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'modifypassword',
  props: ['isShowModal'],
  data () {
    const abc = (result, value, callback) => {
      if (!value) {
        callback(new Error('新密码不能为空'))
      } else {
        if (this.formValidate.confirmpassword) {
          this.$ref.formValidate.validateField('confirmpassword')
        }
        callback()
      }
    }
    return {
      modify: true,
      formValidate: {
        count: '',
        password: '',
        newpassword: '',
        confirmpassword: ''
      },
      ruleValidate: {
        newpassword: [
          {
            required: true,
            validator: abc,
            message: '新密码不能为空',
            trigger: 'blur'
          }
        ],
        confirmpassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {

  },
  computed: {
    modifyModal: function () {
      return this.isShowModal
    }
  },
  methods: {
    onOffMore () {
      this.modify = !this.modify
    },
    submitModify () {
      console.log(123)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
@import '@/assets/css/mixin.scss';
.v-modifypassword {
  width: 200px;
  .form-box {
    .password {
      position: relative;
      .btn-modify {
        position: absolute;
        right: 0px;
        top: 0px;
        padding: 0 10px;
      }
    }
  }
}
</style>
