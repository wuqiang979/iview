/* eslint-disable indent */
export default[{
  path: 'publishNotice',
  meta: {
    title: `发布公告`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/notice-manage/PublishNotice')), 'notice-manage')
}, {
  path: 'noticeList',
  meta: {
    title: `公告列表`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/notice-manage/NoticeList')), 'notice-manage')
}]
