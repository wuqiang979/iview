
export default {
  install (Vue, options) {
    // 路由公共方法
    Vue.prototype.back = function (url, obj = {}) {
      console.log(123)
      this.$router.back()
    }

    Vue.prototype.pathTo = function (url, obj = {}, type = 'push') {
      this.$router[type]({
        path: url,
        query: obj
      })
    }

    /**
     * @msg: 去掉字符串前后的空格
     * @param {type}
     * @return: 去除空格后的字符串
     */
    Vue.prototype.trim = function (param) {
      let vRet = ''

      if ((vRet = param) == '') {
        return vRet
      }
      while (true) {
        if (vRet.indexOf(' ') == 0) {
          vRet = vRet.substring(1, parseInt(vRet.length))
        } else if ((parseInt(vRet.length) != 0) && (vRet.lastIndexOf(' ') == parseInt(vRet.length) - 1)) {
          vRet = vRet.substring(0, parseInt(vRet.length) - 1)
        } else {
          return vRet
        }
      }
    }
    // 格式化日期 年月
    Vue.prototype.formatMyDate = function (date, type = 1) {
      let myDate = null
      if (date && date.indexOf('-') && date.indexOf(' ')) {
        let date1 = date.split(' ')[0]
        let date2 = date.split('-')
        let year = date2[0]
        let month = date2[1]
        if (type == 2) {
          myDate = year + '年' + parseInt(month) + '月'
        } else if (type == 3) {
          myDate = date.split('.')[0]
        } else {
          myDate = year + '/' + month
        }
      }
      return myDate || '--'
    }
    // 中国标准时间转 yyyy-MM-dd HH:mm:ss
    Vue.prototype.dateYmdhms = function (date) {
      return date.toISOString().substring(0, 10) + ' ' + date.toTimeString().substring(0, 8)
    }
  }
}
