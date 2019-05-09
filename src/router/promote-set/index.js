/* eslint-disable indent */
export default[{
  path: 'levelList',
  meta: {
    title: `等级设置`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/promote-set/LevelList')), 'promote-set')
}, {
  path: 'addlevel',
  meta: {
    title: `添加等级`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/promote-set/AddLevel')), 'promote-set')
}, {
  path: 'promoteSet',
  meta: {
    title: `推广设置`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/promote-set/PromoteSet')), 'promote-set')
}]
