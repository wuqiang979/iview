<template>
  <div class="advertiser-list-wrap">
    <VBread>广告商管理-广告商列表</VBread>
    <div class="content-wrap">
      <div class="search-filter-wrap">
      <h2 class="title">
        <Icon type="md-search" size="22"/>搜索查询
      </h2>
      <div class="search-box">
        <Form ref="formData" :model="formData" :label-width="100" inline>
          <FormItem label="广告商名称：" >
            <Input type="text" style="width:200px" v-model="formData.name" placeholder="广告商名称"/>
          </FormItem>
          <FormItem style="margin-left:-60px;">
            <Button type="primary" @click="filterData">查询</Button>
          </FormItem>
        </Form>
      </div>
    </div>
      <div class="table-box">
        <h3 class="h3-title">
          <span>数据列表</span>
          <Button type="primary" @click="pathTo('addAdvertiser')">+添加广告商</Button>
        </h3>
        <VTable
          :columns="columnsData"
          :data="tableData"
          :totalPage="totalPage"
          @onPageSizeChange="onPageSizeChange"
          @onChange="onChange"
        >
          <div slot="online" slot-scope="props">
            <Switch v-model="switch1" />
          </div>
          <div slot="action" slot-scope="props">
            <Button type="primary" style="margin-right: 5px" @click="pathTo('/layout/addAdvertiser?id='+props.data.row.id)">编辑</Button>
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
  name: 'advertiser',
  data () {
    return {
      delModal: false,
      modal_loading: false,
      formData: {
        name: '',
        pageNum: 1,
        pageSize: 10
      },
      totalPage: 0,
      // 表格数据
      columnsData: [
        {
          title: '广告商名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '联系电话',
          key: 'phone',
          align: 'center'
        },
        {
          title: '地址',
          key: 'address',
          align: 'center'
        },
        {
          title: '广告数量',
          key: 'phone',
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
  mounted () {},
  methods: {
    // 传给table自定义事件：分页数改变时触发
    onChange (pageNum) {
      this.formData.pageNum = pageNum
      this.getData()
    },
    // 传给table自定义事件：单页条数改变时触发
    onPageSizeChange (pageSize) {
      this.formData.pageSize = pageSize
      // 当前分页数为1时从新请求数据，不为1时通过组件自带事件触发onchange
      if (this.currentPage === 1) {
        this.getData()
      }
    },
    // 获取广告商列表
    getData () {
      this.$http.get('/advertiser/list', {
        params: this.formData
      }).then(res => {
        if (res.data.code === 1) {
          this.tableData = res.data.data.list
          this.totalPage = res.data.data.total
        }
      })
    },
    // 过滤查询数据
    filterData () {
      this.formData.pageNum = 1
      this.formData.pageSize = 10
      this.getData()
    },
    // 编辑
    editAdvertise (data) {
      this.pathTo('addAdvertiser', {id: 123})
    },
    // 删除
    remove (id) {
      this.$Modal.confirm({
        title: '删除广告商',
        content: '<p>删除商家将会连同广告数据一并删除，确认要删除吗？</p>',
        loading: true,
        onOk: () => {
          this.$http.delete('/advertiser/del', {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
@import '@/assets/css/mixin.scss';
.advertiser-list-wrap {
  .table-box {
    padding: 20px 0;
  }
}
</style>
