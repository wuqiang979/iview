<template>
  <div class="advertiser-list-wrap">
    <VBread>推广规则设置-等级设置</VBread>
    <div class="content-wrap">
      <div class="table-box">
        <h3 class="h3-title">
          <span>数据列表</span>
          <Button type="primary" @click="pathTo('addlevel')">+添加等级</Button>
        </h3>
        <VTable
          :columns="columns"
          :data="tableData"
        >
          <div slot="online" slot-scope="props">
            <Switch v-model="switch1" />
          </div>
          <div slot="action" slot-scope="props">
            <Button type="primary" style="margin-right: 5px" @click="pathTo('/layout/addlevel?id='+props.data.row.id)">编辑</Button>
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
  name: 'level',
  data () {
    return {
      // 表格数据
      columns: [
        {
          title: '等级名称',
          key: 'gradeName',
          align: 'center'
        },
        {
          title: '邀请人数满足点',
          key: 'peopleNum',
          align: 'center'
        },
        {
          title: '可获得观影次数',
          key: 'num',
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
    VBread,
    VTable
  },
  created () {
    this.getLevelList()
  },
  mounted () {},
  methods: {
    // 获取等级列表
    getLevelList () {
      this.$http.get('/grade/list').then(res => {
        if (res.data.code === 1) {
          this.tableData = res.data.data
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

  }
}
</style>
