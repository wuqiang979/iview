/* eslint-disable indent */
export default[{
  path: 'userList',
  meta: {
    title: `等级设置`
  },
  component: resolve => require.ensure([], () => resolve(require('@/view/user-manage/UserList')), 'promote-set')
}]
