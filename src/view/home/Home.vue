<template>
  <div class="home-index">
    <h2>广告数据统计</h2>
    <div class="content-wrap">
      <Table border="" :columns="columns1" :data="data1"></Table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      columns1: [
        {
          title: '广告位置',
          key: 'adress'
        },
        {
          title: '广告名称',
          key: 'name'
        },
        {
          title: '所属广告商',
          key: 'belongs'
        },
        {
          title: '累计点击次数',
          key: 'visitNum'
        }
      ],
      data1: [
        {
          adress: 'John Brown',
          name: 18,
          belongs: 'New York No. 1 Lake Park',
          visitNum: '2016-10-03'
        },
        {
          adress: 'John Brown',
          name: 18,
          belongs: 'New York No. 1 Lake Park',
          visitNum: '2016-10-03'
        },
        {
          adress: 'John Brown',
          name: 18,
          belongs: 'New York No. 1 Lake Park',
          visitNum: '2016-10-03'
        },
        {
          adress: 'John Brown',
          name: 18,
          belongs: 'New York No. 1 Lake Park',
          visitNum: '2016-10-03'
        }
      ]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http.get('/adData/adData').then(res => {
        if (res.data.code === 1) {

        } else {

        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.home-index {
  padding: 20px;
  width: 100%;
}
</style>
