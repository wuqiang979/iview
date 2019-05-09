<template>
  <div class="video-mark-wrap">
    <VBread>视频标签</VBread>
    <div class="content-wrap">
      <h2 class="h2-title">
        <span>分类列表</span>
        <Button
          class="btn-box"
          type="primary"
          size="large"
          @click="openModal"
        >
          <Icon type="md-add"/>添加标签
        </Button>
      </h2>
      <div class="marker-box">
        <span v-for="(item,index) in markData" :key="index" @click="modifyMark(item)">{{item.tagName}}</span>
        <span class="no-data" v-if="markData.length==0">暂无数据...</span>
      </div>
    </div>
    <Modal v-model="addMarkModal" width="360" :title='modalTitle' :mask-closable="false">
      <div style="text-align:center;">
        <Form ref="markModal" :model="markFormData" :rules="markValidate" :label-width="100">
          <FormItem label="标签名称：" prop="tagName">
              <Input v-model="markFormData.tagName" placeholder="Enter something..."></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="addMarkModal=false">取消</Button>
        <Button type="primary" size="large" :loading="modal_loading" @click="addMark">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import VBread from '@/components/common/VBread'
export default {
  name: 'videoMark',
  data () {
    return {
      modalTitle: '添加标签',
      markData: [],
      addMarkModal: false,
      modal_loading: false, // 提交表单是的按钮loading
      // mark表单
      markFormData: {
        id: '',
        tagName: ''
      },
      // 验证Mark输入
      markValidate: {
        tagName: [{ required: true, message: '标签名称不能为空', trigger: 'blur' }]
      }
    }
  },
  components: {
    VBread
  },
  created () {
    this.getData()
  },
  mounted () {},
  methods: {
    // 获取标签列表
    getData () {
      this.$http.get('/tag/list').then(res => {
        if (res.data.code === 1) {
          this.markData = res.data.data
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    openModal () {
      this.modalTitle = '添加标签'
      this.addMarkModal = true
      this.markFormData = {}
    },
    modifyMark (data) {
      this.modalTitle = '修改标签'
      this.markFormData = data
      this.addMarkModal = true
    },
    // 添加Mark事件
    addMark () {
      this.$refs['markModal'].validate((valid) => {
        if (valid) {
          this.modal_loading = true
          let url = this.modalTitle === '添加标签' ? '/tag/add' : '/tag/update'
          this.$http.post(url, this.markFormData).then(res => {
            this.modal_loading = false
            this.$Message.success(res.data.msg)
            if (res.data.code === 1) {
              this.addMarkModal = false
              this.getData()
            }
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/assets/css/mixin.scss';
.video-mark-wrap {
  .content-wrap {
    width: 800px;
    .h2-title {
      @include dp-flex(space-between);
      font-size: 14px;
      padding: 10px 0;
      .ivu-icon {
        font-size: 20px;
        margin-top: -2px;
      }
      .btn-box {
        span {
          @include dp-flex;
        }
      }
    }
    .marker-box {
      min-height: 100px;
      border: 1px solid #eee;
      padding: 20px;
      @include dp-flex(flex-start, flex-start);
      flex-wrap: wrap;
      align-content: flex-start;
      span:not(.no-data) {
        margin-right: 20px;
        margin-bottom: 20px;
        background-color: #efefef;
        border-radius: 5px;
        height: 40px;
        line-height: 40px;
        padding: 0 13px;
        cursor: pointer;
      }
    }
  }
}
</style>
