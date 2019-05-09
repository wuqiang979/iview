/**
 * @author: YouJie
 * @date: 2018-08-13 18:24:28
 */

import Axios from 'axios'
import { getUserInfo, deleteUserInfo, setSessionStorage } from '../utils/storage'
import router from '../router'

Axios.defaults.timeout = 200000
Axios.defaults.baseURL = baseUrl
// request 拦截
Axios.interceptors.request.use(
  config => {
    if (getUserInfo()) {
      config.headers['ACCESS_TOKEN'] = getUserInfo().token
    } else {
      router.replace('/login')
    }
    return config
  },

  error => {
    return Promise.reject(error)
  }
)

// response 拦截
Axios.interceptors.response.use(
  response => {
    if (response.data.code !== 1) {
      $vm.$Message.error(response.data.msg)
    }
    return response
  },

  error => {
    if (error.code === 'ECONNABORTED') {

    } else {
      try {
        if (error.response.status === 401) {
          if (router.currentRoute.fullPath !== '/login') {
            setSessionStorage(router.currentRoute.fullPath)
            deleteUserInfo()
          }
          router.replace('/login')
        } else {
          $vm.$Message.error(error.response.data)
        }
      } catch (error) {}
    }
    return Promise.reject(error)
  }
)

export default Axios
