/**
 * @author: YouJie
 * @date: 2018-05-22 18:47:51
 * 有关本地存储的一些方法
 */

const USER_INFO = 'nineThousandSetsUserInfo'
const CURRENT_ROUTER = 'currentRouter'

/**
 * 获取用户信息
 * @returns {string}
 */
export const getUserInfo = () => {
  return JSON.parse(sessionStorage.getItem(USER_INFO))
}

/**
 * 设置用户登录的信息
 * @param {object} userInfo
 */
export const setUserInfo = (userInfo) => {
  return sessionStorage.setItem(USER_INFO, JSON.stringify(userInfo))
}

/**
 * 删除用户登录的信息
 */
export const deleteUserInfo = () => {
  return sessionStorage.removeItem(USER_INFO)
}

/************************************************************************************
 * 关于路由SessionStorage储存
 */

/**
 * 获取路由SessionStorage储存
 * @returns {string}
 */
export const getSessionStorage = () => {
  return sessionStorage.getItem(CURRENT_ROUTER)
}

/**
 * 设置路由SessionStorage储存
 * @param {string}
 */
export const setSessionStorage = (routeUrl) => {
  sessionStorage.setItem(CURRENT_ROUTER, routeUrl)
}
