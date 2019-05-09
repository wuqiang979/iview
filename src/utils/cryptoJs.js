import CryptoJS from 'crypto-js'
const key = 'b30d59ec77d3512c'
// 解密方法
export const decrypt = (word) => {
  // var parseKey = CryptoJS.enc.Utf8.parse(this.formInline.userNo)
  var parseKey = CryptoJS.enc.Utf8.parse(key)// 随意定的一个16字符串
  var decrypted = CryptoJS.AES.decrypt(word, parseKey,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

// 加密方法
export const encrypt = (word) => {
  // var parseKey = CryptoJS.enc.Utf8.parse(this.formInline.userNo)
  var parseKey = CryptoJS.enc.Utf8.parse(key)
  var encrypted = CryptoJS.AES.encrypt(word, parseKey,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
  return encrypted.toString()
}
