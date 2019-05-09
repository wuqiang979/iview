<template>
  <div class="user-list-wrap">
    <VBread>用户管理/用户列表</VBread>
    <div class="content-wrap">
      <div class="search-filter-wrap">
        <h2 class="title">
          <Icon type="md-search" size="22"/>搜索查询
        </h2>
        <div class="search-box">
          <Form ref="formData" :model="formData" :label-width="100" inline>
            <FormItem label="用户账号：" >
              <Input type="text" style="width:200px" v-model="formData.user" placeholder="用户账号" clearable/>
            </FormItem>
            <FormItem label="注册时间：">
              <DatePicker type="datetimerange" v-model="rangeDate" placement="bottom-end" placeholder="请选择注册时间段" style="width: 300px" @on-change='rangeDateChange'></DatePicker>
            </FormItem>
            <FormItem label="等级：">
              <Select v-model="formData.gradeId" style="width:200px" clearable>
                  <Option v-for="item in levelList" :value="item.id.toString()" :key="item.value">{{ item.gradeName }}</Option>
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
          <span>累计注册用户：2000</span>
        </h3>
        <VTable
          :columns="columns"
          :data="tableData"
          :totalPage="totalPage"
          @onPageSizeChange="onPageSizeChange"
          @onChange="onChange"
        >
          <div slot="action" slot-scope="props">
            <Button type="primary" style="margin-right: 5px" @click="checkInvite(props.data.row)">查看邀请</Button>
          </div>
        </VTable>
      </div>
    </div>
    <!-- 邀请用户列表 -->
    <Modal
      class="invitation-modal"
      :title="`查看邀请—用户账号：${userNo}`"
      v-model="invitationModal"
      :styles="{top: '100px', width: '800px'}"
      :mask-closable="false"
      :footer-hide="true"
    >
      <div class='invitation-table-box' :style="{width: '100%','max-height': '700px','overflow-y': 'auto'}">
        <!-- 加个v-if保证每次都重新加载这个组件 以便获取数据 -->
        <InvitationList v-if="invitationModal" :userId='userId'></InvitationList>
      </div>
    </Modal>
  </div>
</template>

<script>
import VBread from '@/components/common/VBread'
import VTable from '@/components/common/VTable'
import InvitationList from '@/components/user-manage/InvitationList'
export default {
  name: 'userList',
  data () {
    return {
      invitationModal: false,
      rangeDate: '',
      userId: null, // 当初点击用户的id
      userNo: '', // 当初点击用户的账号
      formData: {
        userNo: null,
        startDate: null,
        endDate: null,
        gradeId: null,
        pageNum: 1,
        pageSize: 10
      },
      levelList: [], // 等级列表
      // 表格数据
      totalPage: 0,
      columns: [
        {
          title: '用户账号',
          key: 'userNo',
          align: 'center'
        },
        {
          title: '昵称',
          key: 'nickName',
          align: 'center'
        },
        {
          title: '等级',
          key: 'gradeName',
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'createDate',
          align: 'center'
        },
        {
          title: '剩余观影次数',
          key: 'overNum',
          align: 'center'
        },
        {
          title: '邀请注册人数',
          key: 'inviteNum',
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
    VTable,
    InvitationList
  },
  created () {
    this.getLevelList()
    this.getUserData()
  },
  mounted () {},
  methods: {
    // 传给table自定义事件：分页数改变时触发
    onChange (pageNum) {
      this.formData.pageNum = pageNum
      this.getUserData()
    },
    // 传给table自定义事件：单页条数改变时触发
    onPageSizeChange (pageSize) {
      this.formData.pageSize = pageSize
      // 当前分页数为1时从新请求数据，不为1时通过组件自带事件触发onchange
      if (this.currentPage === 1) {
        this.getUserData()
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
    // 获取等级列表
    getLevelList () {
      this.$http.get('/grade/list').then(res => {
        if (res.data.code === 1) {
          this.levelList = res.data.data
        }
      })
    },
    // 获取用户列表
    getUserData () {
      this.$http.post('/user/list', this.formData).then(res => {
        if (res.data.code === 1) {
          res.data.data.list.forEach(item => {
            item.createDate = this.dateYmdhms(new Date(item.createDate))
          })
          this.tableData = res.data.data.list
          this.totalPage = res.data.data.total
        }
      })
    },
    filterSearch () {
      this.formData.pageNum = 1
      this.formData.pageSize = 10
      this.getUserData()
    },
    // 邀请查看
    checkInvite (row) {
      this.userId = row.id
      this.userNo = row.userNo
      this.invitationModal = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import '@/assets/css/mixin.scss';
.user-list-wrap {
  .table-box {
    padding: 20px 0;
  }
}
</style>
