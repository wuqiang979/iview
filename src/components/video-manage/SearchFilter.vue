/* eslint-disable space-before-function-paren */
<template>
  <div class="search-filter-wrap">
    <h2 class="title">
      <Icon type="md-search" size="22"/>搜索查询
    </h2>
    <div class="search-box">
      <Form ref="formInline" :model="formInline" :label-width="80" inline>
        <FormItem label="视频名称：" >
          <Input type="text" style="width:200px" v-model="formInline.user" placeholder="Username"/>
        </FormItem>
        <FormItem v-if="type==1" label="视频分类：">
          <Select v-model="model1" style="width:200px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem v-else label="上传时间：">
            <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem label="上下架：">
          <Select v-model="model1" style="width:200px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem style="margin-left:-60px;">
          <Button type="primary" @click="true">查询</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import VBread from '@/components/common/VBread'
export default {
  name: 'uploadVideo',
  props: ['type'], // type: 1电影 2小视频
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      model1: ''
    }
  },
  components: {
    VBread
  },
  mounted () {},
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
@import '@/assets/css/mixin.scss';

</style>
