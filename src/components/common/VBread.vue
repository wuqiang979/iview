<template>
  <div class="v-bread">
    <i class="shuxian"></i><span><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: 'vbread',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
@import '@/assets/css/mixin.scss';
.v-bread {
  @include dp-flex;
  height: 34px;
  padding: 0 10px;
  background: #ededed;
  font-size: 15px;
  .shuxian{
    width: 2px;
    height: 14px;
    background: $wColor;
    margin-right: 4px;
  }
}
</style>
