/* eslint-disable eqeqeq */
<template>
  <div class="invitation-list-wrap">
    <div class="content-wrap">
      <div class="table-box">
        <VTable
          :columns="columns"
          :data="tableData"
          :totalPage="totalPage"
          @onPageSizeChange="onPageSizeChange"
          @onChange="onChange"
          size='small'
        ></VTable>
      </div>
    </div>
  </div>
</template>

<script>
import VTable from '@/components/common/VTable'
export default {
  name: 'invitate',
  props: ['userId'],
  data () {
    return {
      totalPage: 0,
      formData: {
        pageNum: 1,
        pageSize: 10
      },
      columns: [
        {
          title: '账号',
          key: 'userNo',
          align: 'center'
        },
        {
          title: '昵称',
          key: 'nickName',
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'createDate',
          align: 'center'
        }
      ],
      tableData: []
    }
  },
  components: {
    VTable
  },
  created () {
    this.getDate()
  },
  methods: {
    // 传给table自定义事件：分页数改变时触发
    onChange (pageNum) {
      this.formData.pageNum = pageNum
      this.getDate()
    },
    // 传给table自定义事件：单页条数改变时触发
    onPageSizeChange (pageSize) {
      this.formData.pageSize = pageSize
      // 当前分页数为1时从新请求数据，不为1时通过组件自带事件触发onchange
      if (this.currentPage === 1) {
        this.getDate()
      }
    },
    // 获取邀请人列表
    getDate () {
      this.formData.userId = this.userId
      this.$http.get('/user/invite', {
        params: this.formData
      }).then(res => {
        if (res.data.code === 1) {
          this.tableData = res.data.data.list
          this.totalPage = res.data.data.total
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/assets/css/mixin.scss';
.invitation-list-wrap {
  .ivu-input-number-input {
    text-align: center;
  }
  .content-wrap {
    // padding: 10px 20px 20px;
  }
}
</style>
