<template>
  <div class="popsetting-wrap">
    <VBread>首页推荐设置</VBread>
    <div class="content-wrap">
      <h3>选择首页显示的分类</h3>
      <p class="tips">
        <Icon type="md-lock" size="20"/>
        <span>最多可选择三种分类，选择后首页将推荐该分类的影片（影片按视频排序推荐排序值最大的前3个）</span>
      </p>
      <div class="category-box">
        <!-- <CheckboxGroup v-model="social" @on-change='groupOnchange'> -->
          <Checkbox v-for="(item,index) in classData" v-model='markArr[index]' @on-change="submitClassData(item,index)" :key="item.id" class="item-check">
            <span>{{item.sortName}}</span>
          </Checkbox>
        <!-- </CheckboxGroup> -->
      </div>
      <!-- <div class='button-box'>
        <Button type="primary" size='large' :loading='btn_loading'>确定</Button>
      </div> -->
    </div>
  </div>
</template>

<script>
import VBread from '@/components/common/VBread'
export default {
  name: 'popSetting',
  data () {
    return {
      btn_loading: false,
      classData: [], // 分类数据
      markArr: [] // 初次渲染 首页选中的分类
    }
  },
  components: {
    VBread
  },
  created () {
    this.getClassData()
  },
  methods: {
    // 获取分类列表
    getClassData () {
      this.$http.get('/sort/list', {
        params: {
          pageNum: 1,
          pageSize: 100
        }
      }).then(res => {
        if (res.data.code === 1) {
          res.data.data.list.forEach(item => {
            if (item.recommend) {
              this.markArr.push(true)
            } else {
              this.markArr.push(false)
            }
          })
          this.classData = res.data.data.list
        }
      })
    },
    // 提交修改首页分类状态
    submitClassData (obj, index) {
      if (this.markArr[index]) {
        obj.recommend = 1
      } else {
        obj.recommend = 0
      }
      this.$http.post('/sort/updateRecommend', obj).then(res => {
        if (res.data.code === 1) {
          this.$Message.success('修改成功')
        } else {
          this.$Message.success(res.data.msg)
        }
      })
    },
    groupOnchange (item) {
      console.log(item)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/assets/css/mixin.scss';
.popsetting-wrap {
  .content-wrap {
    // padding: 20px;
    .tips {
      padding: 10px 0;
      @include dp-flex(flex-start, flex-end);
      color: #999;
    }
    .category-box {
      width: 800px;
      min-height: 200px;
      border: 1px solid #ededed;
      padding: 30px 30px 0;
      .item-check {
        margin-right: 30px;
        font-size: 16px;
        margin-bottom: 30px;
      }
    }
    .button-box {
      margin-top: 20px;
    }
  }
}
</style>
