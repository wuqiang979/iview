/* eslint-disable import/first */
/* eslint-disable semi */
/* eslint-disable no-multiple-empty-lines */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/common.scss'
import './assets/css/mixin.scss'
// import { Button, Table } from 'iview';
// Vue.component('Button', Button);
// Vue.component('Table', Table);
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

// 引入公共方法
import Utils from './utils/utils'
Vue.use(Utils)

// 引入axios
import Axios from './utils/http'
Vue.prototype.$http = Axios

Vue.config.productionTip = false

/* eslint-disable no-new */
window.$vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
