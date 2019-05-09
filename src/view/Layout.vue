<template>
  <div class="layout-wrap">
    <!-- 头部 -->
    <VHeader></VHeader>
    <div class="content-box">
      <!-- 左侧菜单栏 -->
      <VSlider></VSlider>
      <!-- 右侧内容区域 -->
      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import VHeader from '@/components/layout/VHeader'
import VSlider from '@/components/layout/VSlider'
export default {
  name: 'layout',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    VHeader,
    VSlider
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/assets/css/mixin.scss';
.layout-wrap {
  height: 100vh;
  width: 100%;
  .content-box{
    height: calc(100vh - 64px);
    @include dp-flex(flex-start,top);
    .content{
      height: 100%;
      width: calc(100vw - 200px);
      overflow: auto;
    }
  }
}
</style>
