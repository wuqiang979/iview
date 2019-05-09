<template>
  <div class="notice-list-wrap">
    <VBread>公告内容</VBread>
    <div class="content-wrap">
      <div class="search-filter-wrap">
        <h2 class="title">
          <Icon type="md-search" size="22"/>搜索查询
        </h2>
        <div class="search-box">
          <Form ref="formData" :model="formData" :label-width="100" inline>
            <FormItem label="日期：">
              <DatePicker
                type="datetimerange"
                v-model="rangeDate"
                placement="bottom-end"
                placeholder="请选择日期时间"
                style="width: 300px"
                @on-change="rangeDateChange"
              ></DatePicker>
            </FormItem>
            <FormItem style="margin-left:-60px;">
              <Button type="primary" @click="true">查询</Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <div class="table-box">
        <h3 class="h3-title">
          <span>数据列表</span>
        </h3>
        <VTable
          :columns="columns"
          :data="tableData"
          :totalPage="totalPage"
          @onPageSizeChange="onPageSizeChange"
          @onChange="onChange"
        >
          <div slot="online" slot-scope="props">
            <Switch v-model="switch1"/>
          </div>
          <div slot="action" slot-scope="props">
            <Button type="primary" style="margin-right: 5px" @click="checkDetail(props.data.row)">查看详情</Button>
            <Button type="error" @click="remove(props.data.row.id)">删除</Button>
          </div>
        </VTable>
      </div>
    </div>
    <!-- 查看公告详情modal -->
    <Modal v-model="detailModal" title="查看详情" footer-hide>
      <div class="detail-content">
        <div class="item"><span class="left">公告标题：</span><p class="content">{{detailData.title}}</p></div>
        <div class="item"><span class="left">发布时间：</span><p class="content">{{detailData.crateDate}}</p></div>
        <div class="item"><span class="left">公告内容：</span><p class="content">{{detailData.content}}</p></div>
      </div>
    </Modal>
  </div>
</template>

<script>
import VBread from '@/components/common/VBread'
import VTable from '@/components/common/VTable'
export default {
  name: 'noticeList',
  data () {
    return {
      detailModal: false,
      totalPage: 0,
      rangeDate: [],
      formData: {
        pageNum: 1,
        pageSize: 10,
        startDate: null,
        endDate: null
      },
      detailData: {// 公告详情
        title: '',
        crateDate: '',
        content: ''
      },
      // 表格数据
      columns: [
        {
          title: '标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '发布日期',
          key: 'crateDate',
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
    this.getNoticeData()
  },
  methods: {
    // 传给table自定义事件：分页数改变时触发
    onChange (pageNum) {
      this.formData.pageNum = pageNum
      this.getNoticeData()
    },
    // 传给table自定义事件：单页条数改变时触发
    onPageSizeChange (pageSize) {
      this.formData.pageSize = pageSize
      // 当前分页数为1时从新请求数据，不为1时通过组件自带事件触发onchange
      if (this.currentPage === 1) {
        this.getNoticeData()
      }
    },
    rangeDateChange () {
      if (this.rangeDate[0]) {
        this.formData.startDate = this.rangeDate[0].toJSON()
        this.formData.endDate = this.rangeDate[1].toJSON()
      } else {
        this.formData.startDate = null
        this.formData.endDate = null
      }
    },
    // 获取公告列表
    getNoticeData () {
      this.$http.post('/announcement/list', this.formData).then(res => {
        if (res.data.code === 1) {
          res.data.data.list.forEach(item => {
            item.crateDate = this.dateYmdhms(new Date(item.crateDate))
          })
          this.tableData = res.data.data.list
          this.totalPage = res.data.data.total
        }
      })
    },
    // 查看详情
    checkDetail (data) {
      this.detailModal = true
      this.detailData = Object.assign({}, data)
    },
    // 删除
    remove (id) {
      this.$Modal.confirm({
        title: '删除公告',
        content: '<p>确定删除分类</p>',
        loading: true,
        onOk: () => {
          this.$http.delete('/announcement/del', {
            params: {
              id: id
            }
          }).then(res => {
            this.$Message.info(res.data.msg)
            this.$Modal.remove()
            if (res.data.code === 1) {
              this.getNoticeData()
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
.notice-list-wrap {
  .table-box {
    padding: 20px 0;
  }
}
.detail-content{
  font-size: 14px;
  .item{
    @include dp-flex(flex-start,flex-start);
    margin-bottom: 20px;
    .left{
      font-weight: bold;
    }
    .content{
      flex: 1
    }
  }
}
</style>
