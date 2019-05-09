/* eslint-disable indent */
export default[{
  path: 'watchRule',
  meta: {
    title: `规则设置`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/watch-set/WatchRule')), 'watch-set')
}]
