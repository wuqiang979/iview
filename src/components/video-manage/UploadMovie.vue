<template>
  <div class="upload-movie-wrap">
    <Form
      ref="uploadVideo"
      :model="uploadVideoFormData"
      :rules="uploadVideoFormDataValidate"
      :label-width="100"
      style="width: 1200px"
    >
      <FormItem label="选择分类：" prop="sortId" style="width:500px">
        <Select v-model="uploadVideoFormData.sortId" filterable size="large" placeholder="选择分类" clearable>
          <Option v-for="item in classData" :value="item.id.toString()" :key="item.sortName">{{item.sortName}}</Option>
        </Select>
      </FormItem>
      <FormItem class="mark-box" label="视频标签：" prop="tagList" style="width:1200px">
        <Button type="dashed" @click="openMarkModal">
          <Icon type="md-add"/>添加标签
        </Button>
        <span class="item-mark" v-for="item in submitMarkData" :key="item.id">{{item.tagName}}
          <Icon class="btn-close" type="md-close-circle" @click="removeMark(item)"/>
        </span>
        <p class="mark-tips">说明:最多可添加4个标签</p>
      </FormItem>
      <FormItem class="mark-box" label="视频名称：" prop="name" style="width:500px">
        <Input type="text" v-model="uploadVideoFormData.name" size="large" placeholder="请输入视频名称" clearable/>
      </FormItem>
      <FormItem class="mark-box" label="视频封面：" prop="imgUrl" style="width:500px">
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
          <div style="width: 400px;height:160px;line-height: 160px;">
            <Icon type="ios-camera" size="60" v-if="!uploadVideoFormData.imgUrl"></Icon>
            <img v-else :src="uploadVideoFormData.imgUrl" alt="">
          </div>
        </Upload>
      </FormItem>
      <FormItem class="mark-box" label="视频简介：" prop="summary" style="width:500px">
        <Input clearable v-model="uploadVideoFormData.summary" :maxlength='500' :autosize="{minRows: 5,maxRows: 10}" type="textarea" placeholder="选填（500字内）"/>
      </FormItem>
      <FormItem class="mark-box" label="视频热度：" prop="heat" style="width:500px">
        <Input type="text" v-model="uploadVideoFormData.heat" size="large" placeholder="请输入视频热度：0-100"><span slot="append" style="padding: 10px">%</span></Input>
      </FormItem>
      <FormItem class="mark-box" label="视频文件：" prop="url" style="width:500px">
        <Upload
          ref="uploadVideo"
          :show-upload-list="true"
          :on-success="handleSuccessVideo"
          :format="['mp4','ogg','wmv','rmvb','avi','flv', 'rm', 'asf','mpeg']"
          :max-size="2097152"
          :on-format-error="handleFormatErrorVideo"
          :on-exceeded-size="handleMaxSizeVideo"
          :before-upload="handleBeforeUploadVideo"
          :on-error='handleErrorVideo'
          type="drag"
          :headers="{ACCESS_TOKEN: accessToken}"
          :action="updataImgUrl"
          style="display: inline-block;width:400px;">
          <div style="width: 400px;min-height:200px;">
            <div v-if='!uploadVideoFormData.url'  style="line-height:200px">
              <Icon type="ios-camera" size="60"></Icon>
            </div>
            <div v-else style="line-height: 0">
              <video controls width='400' :src='uploadVideoFormData.url'></video>
            </div>
          </div>
        </Upload>
      </FormItem>
      <FormItem class="mark-box" label="备注说明：" style="width:500px">
        <Input clearable v-model="uploadVideoFormData.remark" :maxlength='50' :autosize="{minRows: 3,maxRows: 3}" type="textarea" placeholder="选填（50字内）"/>
      </FormItem>
      <FormItem class="mark-box" prop="category" style="width:500px;text-align:center;">
          <Button size='large' @click="$router.go(-1)">返回</Button>
          <Button size='large' type="primary" style="margin-left:40px;" @click="submitVideoInfo">
            <span v-if="$route.query.id">修改</span>
            <span v-else>保存</span>
          </Button>
      </FormItem>
    </Form>
    <!-- 添加视频标签弹窗 -->
    <Modal
      class="v-markModal"
      title="选择标签"
      v-model="markModal"
      :styles="{top: '100px', width: '460px'}"
      @on-ok="true"
      :mask-closable="false"
    >
      <div class="mark-list-box">
        <span :class="{'item-mark': true,selected: isSelected(item.id)}" @click="clickMark(item)" v-for="item in markData" :key="item.id">{{item.tagName}}</span>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="markModal=false">取消</Button>
        <Button type="primary" size="large" :loading="modal_loading" @click="addMark">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getUserInfo } from '@/utils/storage'
export default {
  name: 'uploadVideo',
  data () {
    // 验证数字
    const tagList = (rule, value, callback) => {
      if (this.submitMarkData.length === 0) {
        return callback(new Error('请添加视频标签'))
      } else {
        callback()
      }
    }
    // 验证数字
    const heat = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('权重排序不能为空'))
      }
      if (!Number.isInteger(value * 1) || value * 1 > 100) {
        callback(new Error('请输入一个正确的权重：0-100'))
      } else {
        callback()
      }
    }
    return {
      updataImgUrl: uploadBaseUrl,
      accessToken: '',
      uploadVideoFormData: {
        type: 1,
        status: 1,
        sortId: '',
        tagList: [],
        name: '',
        imgUrl: '',
        summary: '',
        heat: '',
        url: '',
        remark: ''
      },
      uploadVideoFormDataValidate: {
        sortId: [{ required: true, message: '请选择分类', trigger: 'change' }],
        tagList: [{ required: true, validator: tagList, trigger: 'blur' }],
        name: [{ required: true, message: '请输入视频名称', trigger: 'blur' }],
        imgUrl: [{ required: true, message: '请上传视频封面', trigger: 'blur' }],
        summary: [{ required: true, message: '请输入视频简介', trigger: 'blur' }],
        heat: [{ required: true, validator: heat, trigger: 'blur' }],
        url: [{ required: true, message: '请上传指定格式的视频文件', trigger: 'blur' }]
      },
      classData: [], // 分类列表
      markData: [], // 标签列表
      selectedMarkData: [], // 已添加的标+已选择的标签
      submitMarkData: [], // 已添加的标
      markModal: false, // 添加标签弹窗
      currentMarkId: '', // 当前高亮的markId
      modal_loading: false,
      uploadImgList: [], // 上传图片
      uploadVideoList: []
    }
  },
  created () {
    this.accessToken = getUserInfo().token
    this.getClassData()
    this.getMarkData()
    this.getMovieData()
  },
  mounted () {

  },
  methods: {
    handleSuccess (res, file) {
      // if(res.data.code === 1){
      this.uploadVideoFormData.imgUrl = res.data
      // }else{
      //   this.$Message.error(res.data.msg)
      // }
    },
    handleFormatError (file) {
      this.$Message.warning('请上传制定格式的图标')
    },
    handleMaxSize (file) {
      this.$Message.warning('图片尺寸最大不能操作2M')
    },
    handleBeforeUpload () {

    },
    handleError () {
      this.$Notice.warning({
        title: '上传失败，请重试'
      })
    },

    // 上传视频
    handleSuccessVideo (res, file) {
      this.uploadVideoFormData.url = res.data
    },
    handleFormatErrorVideo () {
      this.$Message.warning('不支持此种视频格式')
    },
    handleMaxSizeVideo () {
      this.$Message.warning('视频最大不能操作2G')
    },
    handleBeforeUploadVideo () {

    },
    handleErrorVideo () {
      // console.log(file)
      // file.url = 'https://img2.9000ji.com/20190313/587026622.mp4'
    },
    // 获取电影详情
    getMovieData () {
      if (this.$route.query.id) {
        this.$http.get('/video/edit', {
          params: {
            id: this.$route.query.id,
            type: 1
          }
        }).then(res => {
          if (res.data.code === 1) {
            res.data.data.sortId = res.data.data.sortId.toString()
            this.submitMarkData = res.data.data.tagList ? res.data.data.tagList : []
            this.uploadVideoFormData = res.data.data
          } else {
            this.$Message.error(res.data.msg)
          }
        })
      }
    },
    // 获取分类列表
    getClassData () {
      this.$http.get('/sort/list', {
        params: {
          pageNum: 1,
          pageSize: 100
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.classData = res.data.data.list
        }
      })
    },
    // 获取标签列表
    getMarkData () {
      this.$http.get('/tag/list').then(res => {
        if (res.data.code === 1) {
          this.markData = res.data.data
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    // 计算mark是否被选中
    isSelected (id) {
      let flag = this.selectedMarkData.find(item => {
        return item.id === id
      })
      if (flag) {
        return true
      } else {
        return false
      }
    },
    // 点击操作mark
    clickMark (obj) {
      let objIndex = this.selectedMarkData.findIndex(item => {
        return item.id === obj.id
      })
      if (objIndex === -1) {
        if (this.selectedMarkData.length === 3) {
          this.$Message.warning('最多可添加四个标签')
          return
        }
        this.selectedMarkData.push(obj)
      } else {
        this.selectedMarkData.splice(objIndex, 1)
      }
    },
    // 打开标签modal
    openMarkModal () {
      this.selectedMarkData = []
      // 防止submitMarkData和selectedMarkData联动
      this.submitMarkData.forEach(item => {
        this.selectedMarkData.push(item)
      })
      this.markModal = true
    },
    // 添加标签
    addMark () {
      // 防止submitMarkData和selectedMarkData联动
      this.submitMarkData = []
      this.selectedMarkData.forEach(item => {
        this.submitMarkData.push(item)
      })
      this.uploadVideoFormData.tagList = this.submitMarkData
      this.markModal = false
    },
    // 移除标签
    removeMark (obj) {
      let objIndex = this.submitMarkData.findIndex(item => {
        return item.id === obj.id
      })
      if (objIndex !== -1) {
        this.submitMarkData.splice(objIndex, 1)
      }
    },
    // 提交/修改视频信息
    submitVideoInfo () {
      this.$refs['uploadVideo'].validate((valid) => {
        if (valid) {
          let url = this.$route.query.id ? '/video/update' : '/video/add'
          this.$http.post(url, this.uploadVideoFormData).then(res => {
            this.$Message.success(res.data.msg)
            if (res.data.code === 1) {
              this.$router.push('/')
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
.upload-movie-wrap {
  .mark-box {
    .item-mark {
      position: relative;
      min-width: 50px;
      margin-left: 20px;
      padding: 0 10px;
      border-radius: 5px;
      background: #eee;
      display: inline-block;
      text-align: center;
      border: 1px dashed #eee;
      line-height: 30px;
      &:hover {
        background: transparent;
        .btn-close {
          display: block;
        }
      }
      .btn-close {
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 24px;
        color: #999;
        display: none;
      }
    }
    .mark-tips{
      color: #999;
      margin-top: 5px;
    }
  }
}
// iview modal
.v-markModal{
  .mark-list-box{
    @include dp-flex(flex-start,top);
    .item-mark{
      line-height: 28px;
      padding: 0 10px;
      border-radius: 14px;
      min-width: 76px;
      border: 1px solid #ededed;
      text-align: center;
      margin-right: 20px;
      cursor: pointer;
    }
    .item-mark.selected{
      background: #eee;
    }
  }
}
</style>
