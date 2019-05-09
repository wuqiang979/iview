<template>
  <div class="v-tabel">
    <Table border="" :columns="columns" :data="data">
      <!-- 排序设置权重模板 -->
      <template slot-scope="{ row, index }" slot="weight">
        <slot name="weight" :row="row"></slot>
      </template>
      <!-- 后面操作按钮模板 -->
      <template slot-scope="{ row, index }" slot="action">
        <slot name="action" :data="{row}"></slot>
      </template>
      <slot></slot>
    </Table>
    <!-- 分页控件 -->
    <Page
      v-if="totalPage&&totalPage>0"
      class="table-page"
      :total="totalPage"
      show-elevator
      show-sizer
      @on-change="onChange"
      @on-page-size-change="onPageSizeChange"
    />
  </div>
</template>

<script>
export default {
  name: 'vtable',
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    currentPage: {
      type: [Number, String],
      default: 1
    },
    totalPage: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {}
  },
  methods: {
    // 父组绑定自定义onChange,给父组件传分页数
    onChange (page) {
      this.$emit('onChange', page)
    },
    // 父组绑定自定义onChange,给父组件传单页条数
    onPageSizeChange (num) {
      this.$emit('onPageSizeChange', num)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
@import '@/assets/css/mixin.scss';
.v-tabel {
  .table-page {
    padding: 20px 0;
  }
}
</style>
