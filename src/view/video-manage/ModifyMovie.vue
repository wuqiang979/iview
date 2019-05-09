<template>
  <div class="video-upload-wrap">
    <VBread>视频列表/电影/编辑</VBread>
    <div class="content-wrap">
      <UploadMovie></UploadMovie>
    </div>
  </div>
</template>

<script>
import VBread from '@/components/common/VBread'
import UploadMovie from '@/components/video-manage/UploadMovie'
export default {
  name: 'upload',
  data () {
    return {

    }
  },
  components: {
    VBread,
    UploadMovie
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/assets/css/mixin.scss';
.video-upload-wrap {
  .content-wrap {
    padding: 20px;
  }
}
</style>
