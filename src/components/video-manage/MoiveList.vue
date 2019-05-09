<template>
  <div class="movie-list-wrap">
    <div class="search-filter-wrap">
      <h2 class="title">
        <Icon type="md-search" size="22"/>搜索查询
      </h2>
      <div class="search-box">
        <Form ref="formData" :model="formData" :label-width="80" inline>
          <FormItem label="视频名称：" >
            <Input type="text" style="width:200px" clearable v-model="formData.name" placeholder="王者不可阻挡"/>
          </FormItem>
          <FormItem label="视频分类：">
            <Select v-model="formData.sortId" style="width:200px" clearable>
                <Option v-for="item in classData" :value="item.id" :key="item.value">{{ item.sortName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="上下架：">
            <Select v-model.number="formData.status" style="width:200px" clearable>
                <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
        <Button type="primary" @click="$router.push('/layout/upload?type=1')">+添加电影</Button>
      </h3>
      <VTable
        :columns="columns"
        :data="tableData"
        :totalPage="totalPage"
        @onPageSizeChange="onPageSizeChange"
        @onChange="onChange">
        <div slot="online" slot-scope="props">
          <Switch v-model="props.row.isOnline" :loading='props.row.isLoading' @on-change="modifyData(props.row)"/>
        </div>
        <div slot="action" slot-scope="props">
          <Button type="primary" style="margin-right: 5px" @click="$router.push({path: '/layout/modifyMovie',query:{id:props.data.row.id}})">编辑</Button>
          <Button type="error" @click="remove(props)">删除</Button>
        </div>
      </VTable>
    </div>
  </div>
</template>

<script>
import SearchFilter from '@/components/video-manage/SearchFilter'
import VTable from '@/components/common/VTable'
export default {
  name: 'MovieList',
  data () {
    return {
      status: [{value: 0, label: '下架'}, {value: 1, label: '上架'}],
      formData: {
        name: '',
        sortId: '',
        type: 1,
        status: '', // 0下家 1上架
        pageNum: 1,
        pageSize: 10
      },
      totalPage: 0,
      switch1: true,
      classData: [], // 分类数据
      columns: [
        {
          title: '视频名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '视频分类',
          key: 'sortName',
          align: 'center'
        },
        {
          title: '播放热度',
          key: 'heat',
          align: 'center'
        },
        {
          title: '文件格式',
          key: 'format',
          align: 'center'
        },
        {
          title: '上传日期',
          key: 'uploadDate',
          align: 'center'
        },
        {
          title: '上下架',
          slot: 'online',
          align: 'center'
        },
        {
          title: '备注',
          key: 'remark',
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
    SearchFilter,
    VTable
  },
  created () {
    this.getData()
    this.getClassData()
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
      this.pageSize = pageSize
      // 当前分页数为1时从新请求数据，不为1时通过组件自带事件触发onchange
      if (this.currentPage === 1) {
        this.getData()
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
    // 获取电影列表
    getData () {
      this.$http.post('/video/list', this.formData).then(res => {
        if (res.data.code === 1) {
          let arrData = res.data.data.list
          arrData.map(item => {
            item.status === 1 ? item.isOnline = true : item.isOnline = false
            item.isLoading = false
            return item
          })
          this.tableData = arrData
          this.totalPage = res.data.data.total
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    // 过滤查询
    filterSearch () {
      this.formData.pageNum = 1
      this.formData.pageSize = 10
      this.getData()
    },
    // 修改视频上下架
    modifyData (row) {
      row.isLoading = true
      let updateData = {
        id: row.id,
        status: row.status,
        type: 1
      }
      if (row.isOnline) {
        updateData.status = 1
      } else {
        updateData.status = 0
      }
      this.$http.post('/video/updateStatus', updateData).then(res => {
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
.movie-list-wrap {
  .table-box {
    padding: 20px 0;
  }
}
</style>
