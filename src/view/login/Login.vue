<template>
  <div class="login-wrap">
    <div class="form-box">
      <h2 class="sys-title">茶壶视频管理后台</h2>
      <Form class="login-form" ref="formData" :model="formData" :rules="ruleInline" @keyup.enter.native="login">
        <FormItem prop="userNo">
          <Input type="text" v-model="formData.userNo" size="large" placeholder="用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="passWord">
          <Input type="password" v-model="formData.passWord" size="large" placeholder="密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="savepassword">
          <Checkbox class="check-box" v-model="single">记住密码</Checkbox>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="loading" size="large" long @click="login" @keyup.enter="login">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { setUserInfo, getSessionStorage } from '@/utils/storage'
import {encrypt, decrypt} from '@/utils/cryptoJs'
// const key = CryptoJS.enc.Utf8.parse('1234567890abcdef') // 十六位十六进制数作为秘钥
export default {
  name: 'login',
  data () {
    return {
      single: false,
      loading: false,
      formData: {
        userNo: '',
        passWord: ''
      },
      ruleInline: {
        userNo: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        passWord: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }

    }
  },
  created () {
    if (localStorage.getItem('loginInfo')) {
      this.single = true
      const loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
      this.formData.userNo = loginInfo.userNo
      this.formData.passWord = decrypt(loginInfo.passWord)
    }
  },
  mounted () {
  },
  methods: {
    login () {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          if (this.loading) {
            return
          }
          this.loading = true
          this.$http.post('/sysUser/login', this.formData).then(res => {
            if (res.data.code === 1) {
              this.$Message.success('Success!')
              setUserInfo(res.data.data)
              localStorage.setItem('passWord', encrypt(this.formData.passWord))
              if (this.single) {
                localStorage.setItem('loginInfo', JSON.stringify({
                  userNo: this.formData.userNo,
                  passWord: encrypt(this.formData.passWord)
                }))
              } else {
                localStorage.removeItem('loginInfo')
              }
              if (getSessionStorage()) {
                this.$router.replace(getSessionStorage())
              } else {
                this.$router.push('/')
              }
            } else {
              this.loading = false
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
.login-wrap {
  width: 100vw;
  height: 100vh;
  @include dp-flex(center, center);
  background: url('/static/imgs/login_bg.png');
  background-size: cover;
  background-position: center;
  .form-box {
    @include dp-flex(center, center, column);
    width: 460px;
    height: auto;
    padding: 20px;
    border-radius: 7px;
    background: rgba(255,255,255,0.5);
    margin-top: -100px;
    .sys-title {
      padding: 20px 0 40px;
    }
    .login-form {
      width: 300px;
      .ivu-input-group-prepend {
        .ivu-icon {
          font-size: 20px;
        }
      }
      .check-box{
        // font-size: 14px;
      }
    }
  }
}
</style>
