/* eslint-disable indent */
import Vue from 'vue'
import Router from 'vue-router'
import videoManage from '../router/video-manage/index'
import AdvertiserManage from '../router/advertiser-manage/index'
import AdManage from '../router/ad-manage/index'
import WatchSet from '../router/watch-set/index'
import PromoteSet from '../router/promote-set/index'
import UserManage from '../router/user-manage/index'
import NoticeManage from '../router/notice-manage/index'
import SourceConfig from '../router/source-config/index'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/layout'
    },
    {
      path: '/login',
      meta: {
        title: `登录`
      },
      component: resolve => require.ensure([], () => resolve(require('@/view/login/Login')), 'login')
    }, {
      path: '/layout',
      redirect: '/layout/home',
      component: resolve => require.ensure([], () => resolve(require('@/view/Layout')), 'layout'),
      children: [
        {
          path: 'home',
          meta: {
            title: `首页`
          },
          component: resolve => require.ensure([], () => resolve(require('@/view/home/Home')), 'home')
        },
        ...videoManage,
        ...AdvertiserManage,
        ...AdManage,
        ...WatchSet,
        ...PromoteSet,
        ...UserManage,
        ...NoticeManage,
        ...SourceConfig
      ]
    }
  ]
})
