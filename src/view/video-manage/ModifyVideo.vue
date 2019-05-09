<template>
  <div class="video-upload-wrap">
    <VBread>视频列表/视频/编辑</VBread>
    <div class="content-wrap">
      <UploadVideo></UploadVideo>
    </div>
  </div>
</template>

<script>
import VBread from '@/components/common/VBread'
import UploadVideo from '@/components/video-manage/UploadVideo'
export default {
  name: 'modifyVideo',
  data () {
    return {

    }
  },
  components: {
    VBread,
    UploadVideo
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
