/* eslint-disable eqeqeq */
<template>
  <div class="add-class-wrap">
    <VBread>{{vbreadTitle}}</VBread>
    <div class="content-wrap">
      <div class="form-box">
        <Form ref="formAddClass" :model="formData" :rules="ruleCustom" :label-width="120">
          <FormItem label="广告商名称：" prop="name" style="width:400px">
            <Input type="text" v-model="formData.name"/>
          </FormItem>
          <FormItem label="联系方式：" prop="phone" style="width:400px">
            <Input type="text" v-model="formData.phone"/>
          </FormItem>
          <FormItem label="地址：" prop="address" style="width:400px">
            <Input type="text" v-model="formData.address"/>
          </FormItem>
          <FormItem class="mark-box" label="备注说明：" prop="remark" style="width:400px">
            <Input clearable v-model="formData.remark" :maxlength='50' :autosize="{minRows: 3,maxRows: 4}" type="textarea" placeholder="选填（100字内）"/>
          </FormItem>
          <FormItem>
            <Button type="default" @click="back()">返回</Button>
            <Button :loading='btn_loading' type="primary" @click="addAdvertiser" style="margin-left: 20px">
              <span v-if="$route.query.id">修改</span>
              <span v-else>提交</span>
            </Button>
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
    return {
      vbreadTitle: '广告商管理-添加广告商',
      btn_loading: false,
      formData: {
        name: '',
        phone: '',
        address: '',
        remark: ''
      },
      ruleCustom: {
        name: [{ required: true, message: '广告商名字不能为空', trigger: 'blur' }],
        phone: [{ required: true, message: '联系方式不能为空', trigger: 'blur' }],
        address: [{ required: true, message: '地址不能为空', trigger: 'blur' }]
      }
    }
  },
  components: {
    VBread
  },
  created () {
    if (this.$route.query.id) {
      this.vbreadTitle = '广告商管理-编辑'
      this.getDetail()
    }
  },
  methods: {
    // 获取广告商详情
    getDetail () {
      this.$http.get('/advertiser/edit', {
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.formData = res.data.data
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    // 添加广告商
    addAdvertiser () {
      this.$refs['formAddClass'].validate(valid => {
        if (valid) {
          this.btn_loading = true
          let url = this.$route.query.id ? '/advertiser/update' : '/advertiser/add'
          this.$http.post(url, this.formData).then(res => {
            this.btn_loading = false
            if (res.data.code === 1) {
              this.$Message.success('添加成功')
            } else {
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
.add-class-wrap {
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
