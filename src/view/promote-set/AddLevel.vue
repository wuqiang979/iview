/* eslint-disable eqeqeq */
<template>
  <div class="add-level-wrap">
    <VBread>推广规则设置-等级设置/添加等级</VBread>
    <div class="content-wrap">
      <div class="form-box">
        <Form ref="formData" :model="formData" :rules="rules" :label-width="120">
          <FormItem label="等级名称：" prop="gradeName" style="width:500px">
            <Input type="text" v-model="formData.gradeName"/>
          </FormItem>
          <FormItem label="邀请人数满足点：" prop="peopleNum" style="width:500px">
            <Input type="text" v-model="formData.peopleNum"/>
          </FormItem>
          <FormItem label="可获得观影次数：" prop="num" style="width:500px">
            <Input type="text" v-model="formData.num"/>
          </FormItem>
          <FormItem class="mark-box" label="备注说明：" style="width:500px">
            <Input clearable v-model="formData.remark" :maxlength='100' :autosize="{minRows: 4,maxRows: 6}" type="textarea" placeholder="选填（100字内）"/>
          </FormItem>
          <FormItem>
            <Button type="default" @click="back()">返回</Button>
            <Button  type="primary" @click="submitAddClass" style="margin-left: 20px">提交</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import VBread from '@/components/common/VBread'
export default {
  name: 'addClass',
  data () {
    // 验证数字
    const number = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入数字'))
      }
      if (!Number.isInteger(value * 1) || value <= 0) {
        callback(new Error('请输入一个正确的数子'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        btn_loading: false,
        gradeName: '',
        peopleNum: '',
        num: '',
        remark: ''
      },
      rules: {
        gradeName: [{ required: true, message: '等级名称不能为空', trigger: 'blur' }],
        peopleNum: [{ required: true, validator: number, trigger: 'blur' }],
        num: [{ required: true, validator: number, trigger: 'blur' }]
      }
    }
  },
  components: {
    VBread
  },
  computed: {

  },
  created () {
    this.getDetail()
  },
  methods: {
    // 获取等级详情
    getDetail () {
      if (!this.$route.query.id) {
        return
      }
      this.$http.get('/grade/edit', {
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.formData = res.data.data
        }
      })
    },
    submitAddClass () {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          this.btn_loading = true
          let url = this.$route.query.id ? '/grade/update' : '/grade/add'
          this.$http.post(url, this.formData).then(res => {
            this.btn_loading = false
            if (res.data.code === 1) {
              this.$Message.success(res.data.msg)
              this.pathTo('/layout/levelList')
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
.add-level-wrap {
  .content-wrap{
    width: 600px;
    padding: 50px;
    .form-box{
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
