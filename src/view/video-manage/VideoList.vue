<template>
  <div class="video-list-wrap">
    <VBread>视频列表</VBread>
    <div class="content-wrap">
      <h2 class="top-title">
        <span @click="changeType(index)" v-for="(item,index) in titleList" :key="item" :class="{selected:titleType==index}">{{item}}</span>
      </h2>
      <div class="list-content">
        <MoiveList v-show="titleType==0"></MoiveList>
        <SmallVideoList v-show="titleType==1"></SmallVideoList>
      </div>
    </div>
  </div>
</template>

<script>
import VBread from '@/components/common/VBread'
import MoiveList from '@/components/video-manage/MoiveList'
import SmallVideoList from '@/components/video-manage/SmallVideoList'
export default {
  name: 'videoList',
  data () {
    return {
      titleType: 0, // 0为电影 1：小视频
      titleList: ['电影', '小视频']
    }
  },
  components: {
    VBread,
    MoiveList,
    SmallVideoList
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
.video-list-wrap {
  .content-wrap {
    padding: 20px;
    .top-title{
      border-bottom: 1px solid #ddd;
      @include dp-flex(flex-start);
      span{
        width: 135px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        font-weight: normal;
        font-size: 14px;
        cursor: pointer;
        &.selected{
          background: #2d8cf0;
          color: #fff;
        }
      }
      span:last-child{
        border-right: 1px solid #ddd;
      }
    }
    .list-content{
      padding: 20px 0;
    }
  }
}
</style>
