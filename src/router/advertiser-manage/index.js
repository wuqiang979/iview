/* eslint-disable indent */
export default[{
  path: 'advertiser',
  meta: {
    title: `广告商列表`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/advertiser-manage/AdvertiserList')), 'advertiser-manage')
}, {
  path: 'addAdvertiser',
  meta: {
    title: `添加广告商`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/advertiser-manage/AddAdvertiser')), 'advertiser-manage')
}]
