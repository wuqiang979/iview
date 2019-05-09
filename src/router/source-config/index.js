/* eslint-disable indent */
export default[{
  path: 'sourceConfig',
  meta: {
    title: `规则设置`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/source-config/SourceConfig')), 'watch-set')
}]
