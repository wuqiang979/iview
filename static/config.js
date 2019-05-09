/* eslint-disable no-unused-vars */
var envType = 1 // 1，本地  2，测试  3，线上
// eslint-disable-next-line no-unused-vars
var baseUrl = ''
var uploadBaseUrl = ''

switch (envType) {
  case 1:
    baseUrl = 'http://192.168.1.152:8081'
    // uploadBaseUrl = 'http://47.92.29.189:9001/upload'
    uploadBaseUrl = 'http://192.168.1.152:8081/ftp/ftp'
    break
  case 2:
    baseUrl = 'http://demo.bridge.kingchannels.cn/transfer'
    break
  case 3:
    baseUrl = 'http://bridge.keledge.com/transfer'
    break
}
