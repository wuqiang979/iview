<template>
  <div class="video-upload-wrap">
    <VBread>视频上传</VBread>
    <div class="content-wrap">
      <h2 class="top-title">
        <span
          @click="changeType(index)"
          v-for="(item,index) in titleList"
          :key="item"
          :class="{selected:titleType==index}"
        >{{item}}</span>
      </h2>
      <div class="upload-content">
        <UploadSmallVideo v-if="titleType==0"></UploadSmallVideo>
        <UploadMovie v-if="titleType==1"></UploadMovie>
      </div>
    </div>
  </div>
</template>

<script>
import VBread from '@/components/common/VBread'
import UploadMovie from '@/components/video-manage/UploadMovie'
import UploadSmallVideo from '@/components/video-manage/UploadVideo'
export default {
  name: 'upload',
  data () {
    return {
      titleType: 0, // 为电影 0：小视频
      titleList: ['上传小视频', '上传电影']
    }
  },
  components: {
    VBread,
    UploadMovie,
    UploadSmallVideo
  },
  created () {
    if (this.$route.query.type) {
      this.titleType = this.$route.query.type
    }
  },
  methods: {
    changeType (type) {
      this.titleType = type
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/assets/css/mixin.scss';
.video-upload-wrap {
  .content-wrap {
    padding: 20px;
    .top-title {
      border-bottom: 1px solid #ddd;
      @include dp-flex(flex-start);
      span {
        width: 135px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        font-weight: normal;
        font-size: 14px;
        cursor: pointer;
        &.selected {
          background: #2d8cf0;
          color: #fff;
        }
      }
      span:last-child {
        border-right: 1px solid #ddd;
      }
    }
    .upload-content {
      padding: 20px;
      width: 800px;
    }
  }
}
</style>
