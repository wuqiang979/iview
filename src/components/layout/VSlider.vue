<template>
  <Sider
    hide-trigger
    collapsible
    :collapsed-width="78"
    v-model="isCollapsed"
    class="v-slider"
    :style="{background: '#fff'}"
  >
    <Menu v-if="!isCollapsed" active-name theme="light" width="auto" :open-names="[]">
      <span class="to-right on-off-menu" @click="collapseToggle">
        <Icon type="ios-keypad"/>
      </span>
      <Submenu :name="item.title" v-for="item in menuData" :key="item.title">
        <template slot="title">
          <Icon :type="item.icon"></Icon>
          <span>{{item.title}}</span>
        </template>
        <MenuItem :name="citem.title" v-for="citem in item.menuItem" :key="citem.title" :to='citem.target'>{{citem.title}}</MenuItem>
      </Submenu>
    </Menu>
    <Menu v-if="isCollapsed" theme="light" width="auto">
      <span class="to-right on-off-menu" @click="collapseToggle">
        <Icon type="ios-keypad-outline"/>
      </span>
      <MenuItem :name="item.title" v-for="item in menuData" :key="item.title">
        <Icon :type="item.icon"></Icon>
      </MenuItem>
    </Menu>
  </Sider>
</template>

<script>
export default {
  name: 'vslider',
  data () {
    return {
      isCollapsed: false,
      menuData: [
        {
          icon: 'logo-youtube',
          title: '视频管理',
          menuItem: [
            {
              icon: 'ios-navigate',
              title: '视频分类',
              target: '/layout/videoclass'
            }, {
              icon: 'ios-navigate',
              title: '视频标签',
              target: '/layout/videomark'
            }, {
              icon: 'ios-navigate',
              title: '视频上传',
              target: '/layout/upload'
            }, {
              icon: 'ios-navigate',
              title: '视频列表',
              target: '/layout/videolist'
            }, {
              icon: 'ios-navigate',
              title: '首页推荐设置',
              target: '/layout/popsetting'
            }
          ]
        },
        {
          icon: 'md-people',
          title: '广告商管理',
          menuItem: [
            {
              icon: 'ios-navigate',
              title: '添加广告商',
              target: 'addAdvertiser'
            }, {
              icon: 'ios-navigate',
              title: '广告商列表',
              target: 'advertiser'
            }
          ]
        },
        {
          icon: 'ios-navigate',
          title: '广告管理',
          menuItem: [
            {
              icon: 'ios-navigate',
              title: '广告列表',
              target: 'adList'
            }, {
              icon: 'ios-navigate',
              title: '新增广告',
              target: 'AddAd'
            }
          ]
        },
        {
          icon: 'ios-navigate',
          title: '观影规则设置',
          menuItem: [
            {
              icon: 'ios-navigate',
              title: '规则设置',
              target: 'watchRule'
            }
          ]
        },
        {
          icon: 'ios-navigate',
          title: '推广规则设置',
          menuItem: [
            {
              icon: 'ios-navigate',
              title: '等级设置',
              target: 'levelList'
            },
            {
              icon: 'ios-navigate',
              title: '推广规则',
              target: 'promoteSet'
            }
          ]
        },
        {
          icon: 'ios-navigate',
          title: '用户管理',
          menuItem: [
            {
              icon: 'ios-navigate',
              title: '用户列表',
              target: 'userList'
            }
          ]
        },
        {
          icon: 'ios-navigate',
          title: '公告管理',
          menuItem: [
            {
              icon: 'ios-navigate',
              title: '发布公告',
              target: 'publishNotice'
            },
            {
              icon: 'ios-navigate',
              title: '发布记录',
              target: 'noticeList'
            }
          ]
        },
        {
          icon: 'ios-navigate',
          title: '资源配置',
          menuItem: [
            {
              icon: 'ios-navigate',
              title: '资源配置',
              target: 'sourceConfig'
            }
          ]
        }
      ]
    }
  },
  methods: {
    collapseToggle () {
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
.v-slider {
  height: 100%;
  overflow: auto;
  .ivu-menu {
    height: 100%;
  }
  .on-off-menu {
    padding: 14px 24px;
    display: block;
  }
}
.ivu-menu-vertical .ivu-menu-submenu-title{
  white-space: nowrap;
}
</style>
