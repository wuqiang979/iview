/* eslint-disable eqeqeq */
<template>
  <div class="add-publishnotice-wrap">
    <VBread>公告管理/发布公告</VBread>
    <div class="content-wrap">
      <div class="form-box">
        <Form ref="formData" :model="formData" :rules="rules" :label-width="120" style='width:520px'>
          <FormItem label="公告标题：" prop="title">
            <Input type="text" :maxlength="25" placeholder="请输入标题（25字内)" v-model="formData.title"/>
          </FormItem>
          <FormItem class="mark-box" label="公告内容：" prop="content">
            <Input clearable v-model="formData.content" :maxlength='300' :autosize="{minRows: 6,maxRows: 8}" type="textarea" placeholder="请输入想要发布的内容（300字内）"/>
          </FormItem>
          <FormItem>
            <Button type="default" @click="back()">返回</Button>
            <Button  type="primary" @click="submitData" style="margin-left: 20px">提交</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import VBread from '@/components/common/VBread'
export default {
  name: 'publishNotice',
  data () {
    return {
      pageTitle: '',
      formData: {
        title: '',
        content: ''
      },
      rules: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      }
    }
  },
  components: {
    VBread
  },
  computed: {

  },
  mounted () {
    
  },
  methods: {
    submitData () {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          this.$http.post('/announcement/add',this.formData).then(res=>{
            if(res.data.code===1){
              this.$Message(res.data.msg)
              this.pathTo('/layout/noticeList')
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
.add-publishnotice-wrap {
  .content-wrap{
    width: 600px;
    padding: 50px;
    .form-box{

    }
  }
}
</style>
