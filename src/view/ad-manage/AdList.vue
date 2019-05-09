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
          <FormItem label="广告名称：" >
            <Input type="text" style="width:200px" v-model="formData.adName" placeholder="广告名称" clearable/>
          </FormItem>
          <FormItem label="所属商家：">
            <Select v-model="formData.advertiserId" style="width:200px" clearable>
                <Option v-for="item in advertiserData" :value="item.id.toString()" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="广告位置：">
            <Select v-model="formData.spaceId" style="width:200px" clearable>
                <Option v-for="item in adSpaceList" :value="item.id.toString()" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="上下架：">
            <Select v-model="formData.status" style="width:200px" clearable>
                <Option v-for="item in arrStatus" :value="item.status" :key="item.name">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem style="margin-left:-60px;">
            <Button type="primary" @click="filterSearch">查询</Button>
          </FormItem>
        </Form>
      </div>
    </div>
      <div class="table-box">
        <h3 class="h3-title">
          <span>数据列表</span>
          <Button type="primary" @click="pathTo('addAd')">+添加广告商</Button>
        </h3>
        <VTable
          :columns="columns"
          :data="tableData"
          :totalPage="totalPage"
          @onPageSizeChange="onPageSizeChange"
          @onChange="onChange"
        >
          <div slot="imgBox" slot-scope="props" style="line-height:0;padding: 10px 0;">
            <img style="max-width: 100%;max-height:200px" :src="props.row.imgUrl" alt="">
          </div>
          <div slot="online" slot-scope="props">
            <Switch v-model="props.row.status" :loading='props.row.isLoading' @on-change='modifyData(props.row)'/>
          </div>
          <div slot="action" slot-scope="props">
            <Button type="primary" style="margin-right: 5px" @click="pathTo('/layout/addAd?id='+props.data.row.id)">编辑</Button>
          </div>
        </VTable>
      </div>
    </div>
    <!-- 确认删除框 -->
    <Modal
      class="v-delModal"
      title="删除广告商"
      v-model="delModal"
      :styles="{top: '100px', width: '360px'}"
      @on-ok="true"
      :mask-closable="false"
    >
      <p>删除商家将会连同广告数据一并删除，确认要删除吗</p>
      <div slot="footer">
        <Button type="text" size="large" @click="delModal=false">取消</Button>
        <Button type="primary" size="large" :loading="modal_loading" @click="true">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import VBread from '@/components/common/VBread'
import VTable from '@/components/common/VTable'
export default {
  name: 'advertiser',
  data () {
    return {
      switch1: true,
      delModal: false,
      modal_loading: false,
      arrStatus: [{
        status: 1,
        name: '上架'
      }, {
        status: 0,
        name: '下架'
      }],
      formData: {
        pageNum: 1,
        pageSize: 10
      },
      advertiserData: [], // 广告商
      adSpaceList: [], // 广告位
      // 表格数据
      totalPage: 0,
      columns: [
        {
          title: '广告名称',
          key: 'adName',
          align: 'center'
        },
        {
          title: '广告位置',
          key: 'adSpaceName',
          align: 'center'
        },
        {
          title: '所属广告商',
          key: 'name',
          align: 'center'
        },
        {
          title: '广告图片',
          slot: 'imgBox',
          align: 'center',
          width: 300
        },
        {
          title: '开始时间',
          key: 'startDate',
          align: 'center'
        },
        {
          title: '截止时间',
          key: 'endDate',
          align: 'center'
        },
        {
          title: '上下架',
          slot: 'online',
          align: 'center'
        },
        {
          title: '累计点量',
          key: 'number',
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
    this.getAdList()
    this.getAdveritorData()
    this.getAdSpaceList()
  },
  mounted () {},
  methods: {
    // 传给table自定义事件：分页数改变时触发
    onChange (pageNum) {
      this.formData.pageNum = pageNum
      this.getAdList()
    },
    // 传给table自定义事件：单页条数改变时触发
    onPageSizeChange (pageSize) {
      this.formData.pageSize = pageSize
      // 当前分页数为1时从新请求数据，不为1时通过组件自带事件触发onchange
      if (this.currentPage === 1) {
        this.getAdList()
      }
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
    },
    // 获取广告列表
    getAdList () {
      this.$http.post('/ad/list', this.formData).then(res => {
        if (res.data.code === 1) {
          res.data.data.list.forEach(element => {
            if (element.status) {
              element.status = true
            } else {
              element.status = false
            }
            element.isLoading = false
            element.startDate = this.dateYmdhms(new Date(element.startDate))
            element.endDate = this.dateYmdhms(new Date(element.endDate))
          })
          this.tableData = res.data.data.list
          this.totalPage = res.data.data.total
        }
      })
    },
    // 过滤查询
    filterSearch () {
      this.formData.pageNum = 1
      this.formData.pageSize = 10
      this.getAdList()
    },
    // 修改广告上下架状态
    modifyData (row) {
      row.isLoading = true
      let updateData = Object.assign({}, row)// 直接赋值在下面更改值时 row 和updateData会联动
      if (row.status) {
        updateData.status = 1
      } else {
        updateData.status = 0
      }
      updateData.startDate = new Date(updateData.startDate).toJSON()
      updateData.endDate = new Date(updateData.endDate).toJSON()
      this.$http.post('/ad/update', updateData).then(res => {
        row.isLoading = false
        if (res.data.code === 1) {
          this.$Message.success(res.data.msg)
        } else {
          this.$Message.warning(res.data.msg)
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
