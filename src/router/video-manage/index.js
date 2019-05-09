/* eslint-disable indent */
export default[{
  path: 'videoclass',
  meta: {
    title: `视频分类`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/video-manage/VideoClass')), 'video-manage')
}, {
  path: 'addClass',
  meta: {
    title: `视频分类`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/video-manage/AddClass')), 'video-manage')
}, {
  path: 'videomark',
  meta: {
    title: `视频标签`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/video-manage/VideoMark')), 'video-manage')
}, {
  path: 'upload',
  meta: {
    title: `视频上传`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/video-manage/UpLoad')), 'video-manage')
}, {
  path: 'videolist',
  meta: {
    title: `视频列表`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/video-manage/VideoList')), 'video-manage')
}, {
  path: 'modifyMovie',
  meta: {
    title: `编辑电影`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/video-manage/ModifyMovie')), 'video-manage')
}, {
  path: 'modifyVideo',
  meta: {
    title: `编辑视频`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/video-manage/ModifyVideo')), 'video-manage')
}, {
  path: 'popsetting',
  meta: {
    title: `首页推荐设置`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/video-manage/PopSetting')), 'video-manage')
}]
