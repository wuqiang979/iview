/* eslint-disable indent */
export default[{
  path: 'adList',
  meta: {
    title: `广告列表`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/ad-manage/adList')), 'ad-manage')
}, {
  path: 'addAd',
  meta: {
    title: `添加广告`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/ad-manage/AddAd')), 'ad-manage')
}]
