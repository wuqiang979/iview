/* eslint-disable eqeqeq */
<template>
  <div class="add-class-wrap">
    <VBread>{{`视频分类/${pageTitle}`}}</VBread>
    <div class="content-wrap">
      <div class="form-box">
        <Form ref="formAddClass" :model="formCustom" :rules="ruleCustom" :label-width="120">
          <FormItem label="分类名称：" prop="sortName" style="width:400px">
            <Input type="text" v-model="formCustom.sortName"/>
          </FormItem>
          <FormItem label="排序：" prop="num" style="width:400px">
            <Input type="text" v-model.number="formCustom.num"/>
          </FormItem>
          <FormItem label="分类图片：" prop="icon">
            <div class="uploap-img">
              <div class="demo-upload-list" v-for="(item,index) in uploadList.slice(-1)"  :key="index">
                  <template v-if="item.status === 'finished'">
                      <img :src="item.url">
                      <div class="demo-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                      </div>
                  </template>
                  <template v-else>
                      <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                  </template>
              </div>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                type="drag"
                :action="updataImgUrl"
                :headers="{ACCESS_TOKEN: accessToken}"
                style="display: inline-block;width:100px;">
                <!-- updataImgUrl -->
                <!-- action="http://jsonplaceholder.typicode.com/posts/" -->
                <div style="width: 100px;height:100px;line-height: 100px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
              <Modal title="View Image" v-model="visible">
                  <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
              </Modal>
            </div>
            <span style='color: #999'>图片格式为：jpg、jpeg、png</span>
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
import { getUserInfo } from '@/utils/storage'
import VBread from '@/components/common/VBread'
export default {
  name: 'addClass',
  data () {
    // 验证排序权重
    const validateWeightNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('权重排序不能为空'))
      }
      if (!Number.isInteger(value * 1)) {
        callback(new Error('请输入一个正确的权重：0-1000'))
      } else {
        callback()
      }
    }
    return {
      updataImgUrl: uploadBaseUrl,
      accessToken: '',
      pageTitle: '',
      formCustom: {
        sortName: '',
        num: '',
        icon: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
        recommend: 0
      },
      ruleCustom: {
        sortName: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }],
        num: [{ required: true, validator: validateWeightNum, trigger: 'blur' }],
        icon: [{ required: true, message: '图标不能为空', trigger: 'blur' }]
      },
      imgName: '',
      visible: false,
      uploadList: []
    }
  },
  components: {
    VBread
  },
  computed: {

  },
  created () {
    this.pageTitle = this.$route.query.title
    this.accessToken = getUserInfo().token
    if (this.$route.query.id) {
      this.getClassData()
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  },
  methods: {
    handleView (name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      this.formCustom.img = ''
    },
    handleSuccess (res, file) {
      // file.url = res.fileUrl
      // this.formCustom.icon = res.fileUrl
      file.url = res.data
      this.formCustom.icon = res.data
      if (this.$refs.upload.fileList.length > 1) {
        this.$refs.upload.fileList.splice(0, 1)
      }
    },
    handleFormatError (file) {
      this.$Message.warning('请上传制定格式的图标')
    },
    handleMaxSize (file) {
      this.$Message.warning('图片尺寸最大不能操作2M')
    },
    handleBeforeUpload () {
      // return check
    },
    getClassData () {
      this.$http.get('/sort/edit', {
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.formCustom = res.data.data
          this.uploadList.push({
            url: res.data.data.icon,
            status: 'finished'
          })
        }
      })
    },
    submitAddClass () {
      this.$refs['formAddClass'].validate((valid) => {
        if (valid) {
          let url = this.$route.query.id ? '/sort/update' : '/sort/add'
          this.$http.post(url, this.formCustom).then(res => {
            this.$Message.success(res.data.msg)
            if (res.data.code === 1) {
              this.$router.push('/layout/videoclass')
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
