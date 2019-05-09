/* eslint-disable eqeqeq */
<template>
  <div class="add-class-wrap">
    <VBread>{{$route.query.id?'广告管理-编辑':'广告管理-添加广告'}}</VBread>
    <div class="content-wrap">
      <div class="form-box">
        <Form ref="formData" :model="formData" :rules="rules" :label-width="120">
          <FormItem label="广告名称：" prop="adName" style="width:520px">
            <Input type="text" v-model="formData.adName"/>
          </FormItem>
          <FormItem label="广告位置：" prop="spaceId" style="width:520px">
            <Select v-model="formData.spaceId" filterable size="large">
              <Option v-for="item in adSpaceList" :value="item.id.toString()" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="所属广告商：" prop="advertiserId" style="width:520px">
            <Select v-model="formData.advertiserId" filterable size="large">
              <Option v-for="item in advertiserData" :value="item.id.toString()" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="开始时间：" prop="startDate" style="width:520px">
            <DatePicker v-model="arrData.startDate" @on-change="formatStartTime('startDate')" type="datetime" placeholder="请选择开始时间" style="width: 400px"></DatePicker>
          </FormItem>
          <FormItem label="到期时间：" prop="endDate" style="width:520px">
            <DatePicker v-model="arrData.endDate" @on-change="formatStartTime('endDate')" type="datetime" placeholder="请选择到期时间" style="width: 400px"></DatePicker>
          </FormItem>
          <FormItem label="上架/下架：" prop="status" style="width:520px">
            <RadioGroup v-model="formData.status">
              <Radio label="1">上架</Radio>
              <Radio label="0">下架</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem class="mark-box" label="广告图片：" prop="imgUrl" style="width:500px">
            <Upload
              ref="uploadImg"
              :show-upload-list="false"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              :on-error='handleError'
              type="drag"
              :headers="{ACCESS_TOKEN: accessToken}"
              :action="updataImgUrl"
              style="display: inline-block;width:400px;">
              <div style="width: 400px;height:180px;line-height: 180px;">
                <Icon type="ios-camera" size="60" v-if="!formData.imgUrl"></Icon>
                <img v-else :src="formData.imgUrl" alt="">
              </div>
            </Upload>
          </FormItem>
          <FormItem label="跳转链接：" prop="url" style="width:520px">
            <Input type="text" placeholder="http://www.google.com" v-model="formData.url"/>
          </FormItem>
          <FormItem class="mark-box" label="备注说明：" prop="remark" style="width:520px">
            <Input clearable v-model="formData.remark" :maxlength='100' :autosize="{minRows: 3,maxRows: 4}" type="textarea" placeholder="选填（100字内）"/>
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
import { getUserInfo } from '@/utils/storage'
import VBread from '@/components/common/VBread'
export default {
  name: 'addAd',
  data () {
    const startDate = (rule, value, callback) => {
      if (!this.arrData.startDate) {
        return callback(new Error('开始时间不能为空'))
      } else {
        if (this.arrData.endDate) {
          if (new Date(this.arrData.startDate).getTime() >= new Date(this.arrData.endDate).getTime()) {
            return callback(new Error('开始时间不能大于结束时间'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
    }
    const endDate = (rule, value, callback) => {
      if (!this.arrData.endDate) {
        return callback(new Error('结束时间不能为空'))
      } else {
        if (this.arrData.startDate) {
          if (new Date(this.arrData.startDate).getTime() >= new Date(this.arrData.endDate).getTime()) {
            return callback(new Error('开始时间不能大于结束时间'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
    }
    return {
      btn_loading: false,
      updataImgUrl: uploadBaseUrl,
      accessToken: '',
      adSpaceList: [], // 广告位置列表
      advertiserData: [], // 广告商列表
      detailData: '', // 广告详情
      arrData: {
        startDate: '',
        endDate: ''
      },
      formData: {
        adName: '',
        spaceId: '',
        advertiserId: '',
        startDate: '',
        endDate: '',
        status: '1',
        imgUrl: '',
        url: '',
        remark: ''
      },
      cityList: [
        {
          value: '1',
          label: '成都'
        },
        {
          value: '2',
          label: '遂宁'
        }
      ],
      rules: {
        adName: [{ required: true, message: '广告名称不能为空', trigger: 'blur' }],
        spaceId: [{ required: true, message: '广告位置不能为空', trigger: 'change' }],
        advertiserId: [{ required: true, message: '请选择所属广告商', trigger: 'change' }],
        startDate: [{ required: true, validator: startDate, trigger: 'blur' }],
        endDate: [{ required: true, validator: endDate, trigger: 'blur' }],
        status: [{ required: true, message: '请选择上下架', trigger: 'change' }],
        imgUrl: [{ required: true, message: '请上传广告图片', trigger: 'blur' }],
        url: [{ required: true, message: '请输入跳转链接', trigger: 'blur' }]
      }
    }
  },
  components: {
    VBread
  },
  computed: {

  },
  created () {
    this.accessToken = getUserInfo().token
    this.getAdveritorData()
    this.getAdSpaceList()
    this.getDetailData()
  },
  mounted () {

  },
  methods: {
    handleView (name) {

    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      this.formData.img = ''
    },
    handleSuccess (res, file) {
      this.formData.imgUrl = res.data
    },
    handleFormatError (file) {

    },
    handleMaxSize (file) {

    },
    handleBeforeUpload () {

    },
    handleError () {

    },
    // 格式化时间
    formatStartTime (date) {
      if (this.arrData[date]) {
        this.formData[date] = this.arrData[date].toJSON()
      }
    },
    // 提交广告数据
    submitData () {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          this.btn_loading = true
          let url = this.$route.query.id ? '/ad/update' : '/ad/add'
          this.$http.post(url, this.formData).then(res => {
            this.btn_loading = false
            this.$Message.success(res.data.msg)
            if (res.data.code === 1) {
              this.pathTo('/layout/adList')
            }
          })
        }
      })
    },
    // 获取广告详情
    getDetailData () {
      if (!this.$route.query.id) {
        return
      }
      this.$http.get('/ad/edit', {
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        if (res.data.code === 1) {
          // 处理num为字符串
          res.data.data.status = res.data.data.status.toString()
          res.data.data.advertiserId = res.data.data.advertiserId.toString()
          res.data.data.spaceId = res.data.data.spaceId.toString()
          this.arrData.startDate = new Date(res.data.data.startDate)
          this.arrData.endDate = new Date(res.data.data.endDate)
          this.formData = res.data.data
        }
      })
    },
    // 获取广告商列表
    getAdveritorData () {
      this.$http.get('/advertiser/list', {
        params: {
          pageNum: 1,
          pageSize: 100
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.advertiserData = res.data.data.list
        }
      })
    },
    // 获取广告位置列表
    getAdSpaceList () {
      this.$http.get('/ad/adSpaceList').then(res => {
        if (res.data.code === 1) {
          this.adSpaceList = res.data.data
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
