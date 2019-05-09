<template>
  <div class="v-tabel">
    <Table border="" :columns="columns" :data="data" :size='size'>
      <!-- 排序设置权重模板 -->
      <template slot-scope="{ row, index }" slot="weight">
        <slot name="weight" :row="row"></slot>
      </template>
      <!-- 图片 -->
      <template slot-scope="{ row, index }" slot="imgBox">
        <slot name="imgBox" :row="row"></slot>
      </template>
      <!-- 上下架 -->
      <template slot-scope="{ row, index }" slot="online">
        <slot name="online" :row="row"></slot>
      </template>
      <!-- 后面操作按钮模板 -->
      <template slot-scope="{ row, index }" slot="action">
        <slot name="action" :data="{row,index}"></slot>
      </template>
      <slot></slot>
    </Table>
    <!-- 分页控件 -->
    <Page
      v-if="totalPage>0"
      class="table-page"
      :page-size='pageSize'
      :total="totalPage"
      :page-size-opts='pageSizeOpts'
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
    size: {
      type: String,
      default: 'default'
    },
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
    pageSize: {
      type: [Number, String],
      default: 10
    },
    totalPage: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      pageSizeOpts: [10, 20]
    }
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
