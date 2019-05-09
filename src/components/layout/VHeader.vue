<template>
  <div class="v-header">
    <Row class="v-row">
      <Col class="row-title" :xs="8" :sm="8" :md="8" :lg="8">
        <span>茶壶-管理后台</span>
      </Col>
      <Col class="row-menu" :xs="16" :sm="16" :md="16" :lg="16">
        <div class="item-menu item-user-face-box" @click="modifyModal=true">
          <img class="user-face" :src="userFace?userFace:'/static/imgs/user-face.png'" alt="">
          <span>admin</span>
        </div>
        <div class="item-menu" @click="$router.push('/layout/home')">
          <Icon type="ios-home-outline"/>
        </div>
        <div class="item-menu item-menu-last" @click="loginoutModal=true">
          <Icon type="ios-power"/>
        </div>
      </Col>
    </Row>
    <!-- 修改密码的modal -->
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
          <FormItem label="登录账号：" prop="userNo">
            <Input v-model="formValidate.userNo" disabled></Input>
          </FormItem>
          <FormItem class="password" label="登录密码：" prop="passWord">
            <Input type="password" v-model="formValidate.passWord" disabled></Input>
            <span class="btn-modify" @click="modify=!modify">
              <i class="iconfont iconicon-modify"></i>
            </span>
          </FormItem>
          <FormItem v-show="modify" class="password" label="新密码：" prop="newPassWord">
            <Input type="password" v-model="formValidate.newPassWord" placeholder="请输入新密码"></Input>
          </FormItem>
          <FormItem v-show="modify" class="password" label="确认密码：" prop="confirmPassWord">
            <Input type="password" v-model="formValidate.confirmPassWord" placeholder="请再次输入密码"></Input>
          </FormItem>
        </Form>
      </div>
      <!--重点就是下面的代码了-->
      <div slot="footer">
        <Button type="text" size="large" @click="modifyModal=false">取消</Button>
        <Button type="primary" size="large" @click="submitModify">确定</Button>
      </div>
    </Modal>

    <!-- 推出系统 -->
    <Modal
      class='modal-login-out'
      title="退出系统"
      v-model="loginoutModal"
      :mask-closable="false"
      width="360">
      <!--重点就是下面的代码了-->
      <p class="login-out-content">
        确认要退出系统吗？
      </p>
      <div slot="footer">
        <Button type="text" size="large" @click="loginoutModal=false">取消</Button>
        <Button type="primary" :loading='loading' size="large" @click="loginOut">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import ModifyPassword from '@/components/login/ModifyPassword'
import { getUserInfo, deleteUserInfo } from '@/utils/storage'
import {decrypt} from '@/utils/cryptoJs'
export default {
  name: 'vheader',
  data () {
    // 验证新密码
    const validateNewPassword = (result, value, callback) => {
      if (!value) {
        callback(new Error('新密码不能为空'))
      } else {
        if (this.formValidate.confirmPassWord) {
          this.$refs.formValidate.validateField('confirmPassWord')
        }
        callback()
      }
    }
    // 验证确认密码
    const validatePasswdCheck = (result, value, callback) => {
      if (!value) {
        callback(new Error('确认密码不能为空'))
      } else if (value !== this.formValidate.newPassWord) {
        callback(new Error('密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      modifyModal: false, // 修改密码modal
      modify: true,
      loginoutModal: false, // 退出系统modal
      userFace: '',
      formValidate: {
        userNo: '',
        passWord: '',
        newPassWord: '',
        confirmPassWord: ''
      },
      ruleValidate: {
        newPassWord: [
          {
            required: true,
            validator: validateNewPassword,
            trigger: 'blur'
          }
        ],
        confirmPassWord: [
          {
            required: true,
            validator: validatePasswdCheck,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  components: {
    ModifyPassword
  },
  mounted () {
    let userInfo = getUserInfo().sysUser
    this.userFace = userInfo.photo
    this.formValidate.userNo = userInfo.userNo
    this.formValidate.passWord = decrypt(localStorage.getItem('passWord'))
  },
  methods: {
    getModify (flag) {
      this.modifyModal = flag
    },
    openModal () {
      this.modifyModal = true
    },
    loginOut () {
      this.$router.replace('/login')
      deleteUserInfo()
    },
    // 提交表单
    submitModify () {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http.post('/sysUser/changePassword', this.formValidate).then(res => {
            if (res.date.code === 1) {
              this.modifyModal = false
              this.loading = false
              this.$Message.success('Success!')
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
.v-header {
  height: 64px;
  background: #515a6e;
  color: #fff;
  padding: 0 20px;
  .v-row {
    height: 100%;
  }
  .row-menu,
  .row-title {
    @include dp-flex;
    font-size: 18px;
    height: 100%;
    .ivu-icon {
      font-size: 24px;
    }
  }
  .row-title {
  }
  .row-menu {
    justify-content: flex-end;
    .item-menu {
      @include dp-flex;
      padding: 0 20px;
      position: relative;
      cursor: pointer;
      &:not(.item-menu-last):after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -7px;
        height: 14px;
        width: 1px;
        background: #ddd;
      }
      .user-face {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
}
// 修改用户密码
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

// 退出系统
.modal-login-out{
  .login-out-content{
    text-align: center;
    font-size: 16px;
    line-height: 60px;
  }
}
</style>
