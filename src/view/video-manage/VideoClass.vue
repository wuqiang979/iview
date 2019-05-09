/* eslint-disable eqeqeq */
<template>
  <div class="video-class-wrap">
    <VBread>视频分类</VBread>
    <div class="content-wrap">
      <h3 class="h3-title">
        <span>
          <Icon type="md-menu"/>分类列表
        </span>
        <Button
          class="btn-box"
          type="primary"
          size="large"
          @click="pathTo('/layout/addClass',{
            title: '添加分类'
          })"
        >
          <Icon type="md-add"/>添加分类
        </Button>
      </h3>
      <div class="table-box">
        <VTable
          :columns="columns"
          :data="tableData"
          :totalPage="pageData.totalPage"
          @onPageSizeChange="onPageSizeChange"
          @onChange="onChange"
        >
          <div slot="imgBox" slot-scope="props" style="line-height: 0; padding: 5px 0;">
            <img :src="props.row.icon" height="60" alt="">
          </div>
          <div slot="weight" slot-scope="props">
            <InputNumber
              :max="1000"
              :min="1"
              v-model.number="props.row.num"
              @on-change="weightOnchange(props.row)"
            ></InputNumber>
          </div>
          <div slot="action" slot-scope="props">
            <Button type="primary" style="margin-right: 5px" @click="editClass(props.data.row.id)">编辑</Button>
            <Button type="error" @click="remove(props.data.row.id)">删除</Button>
          </div>
        </VTable>
      </div>
    </div>
  </div>
</template>

<script>
import VBread from '@/components/common/VBread'
import VTable from '@/components/common/VTable'
export default {
  name: 'videoClass',
  data () {
    return {
      weightOnchangeTimer: null,
      pageData: {
        pageNum: 1,
        pageSize: 10,
        totalPage: 0
      },
      columns: [
        {
          type: 'index',
          title: '序号',
          width: 80,
          align: 'center'
        },
        {
          title: '分类名称',
          key: 'sortName',
          align: 'center'
        },
        {
          title: '分类图标',
          slot: 'imgBox',
          align: 'center'
        },
        {
          title: '排序',
          slot: 'weight',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          width: 200,
          align: 'center'
        }
      ],
      tableData: []
    }
  },
  components: {
    VBread,
    VTable
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取分类列表
    getData () {
      this.$http.get('/sort/list', {
        params: this.pageData
      }).then(res => {
        if (res.data.code === 1) {
          this.tableData = res.data.data.list
          this.pageData.totalPage = res.data.data.total
        } else {
          this.$Notice.warning({
            title: '',
            desc: res.data.msg
          })
        }
      })
    },
    // 编辑分类
    editClass (id) {
      this.pathTo('addClass', {
        id: id,
        title: '编辑分类'
      })
      // console.log(data.data.row)
    },
    // 删除分类
    remove (id) {
      this.$Modal.confirm({
        title: '删除',
        content: '<p>确定删除分类</p>',
        loading: true,
        onOk: () => {
          this.$http.delete('/sort/del', {
            params: {
              id: id
            }
          }).then(res => {
            this.$Message.info(res.data.msg)
            this.$Modal.remove()
            if (res.data.code === 1) {
              this.getData()
            }
          })
        }
      })
    },
    // 权重改变时
    weightOnchange (data) {
      if (this.weightOnchangeTimer) {
        clearTimeout(this.weightOnchangeTimer)
      }
      this.weightOnchangeTimer = setTimeout(() => {
        let params = {
          id: data.id,
          sortName: data.sortName,
          num: data.num,
          icon: data.icon,
          recommend: data.recommend
        }
        this.$http.post('/sort/update', params).then(res => {
          if (res.data.code === 1) {
            this.$Message.success(res.data.msg)
          } else {
            this.$Message.error(res.data.msg)
          }
        })
      }, 500)
    },
    // 传给table自定义事件：分页数改变时触发
    onChange (pageNum) {
      this.pageData.pageNum = pageNum
      this.getData()
    },
    // 传给table自定义事件：单页条数改变时触发
    onPageSizeChange (pageSize) {
      this.pageData.pageSize = pageSize
      // 当前分页数为1时从新请求数据，不为1时通过组件自带事件触发onchange
      if (this.currentPage === 1) {
        this.getData()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/assets/css/mixin.scss';
.video-class-wrap {
  .ivu-input-number-input {
    text-align: center;
  }
  .content-wrap {
    padding: 10px 20px 20px;
  }
}
</style>
