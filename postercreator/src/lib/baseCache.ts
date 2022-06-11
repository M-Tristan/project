import ImageUtil from "./ImageUtil"

let imageMap = {}
let fontMap = {}
let moduleMap = {}
class BaseCache {
  static getImageBySrc(src) {
    return imageMap[src]

  }
  static async pushImage(src) {
    if (!imageMap[src]) {
      let base64 = await ImageUtil.toBase64(src)
      imageMap[src] = base64
    }
  }
  static pushModule(id, baseInfo) {
    moduleMap[id] = baseInfo
  }
  static getModule(id) {
    return moduleMap[id]
  }
  static getFontByFamily(family) {
    return fontMap[family]

  }
  static pushFont(family, url) {
    var TIMEOUT = 30000
    if (!fontMap[family]) {
      var request = new XMLHttpRequest()
      request.onreadystatechange = done
      request.ontimeout = timeout
      request.responseType = 'blob'
      request.timeout = TIMEOUT
      request.open('GET', url, true)
      request.send()
      function done() {
        if (request.readyState !== 4) return
        if (request.status !== 200) {
          return
        }
        /**
         * 读取文件信息
         */
        var encoder = new FileReader() as any
        encoder.onloadend = function () {
          var content = encoder.result.split(/,/)[1]
          fontMap[family] = content
        }
        encoder.readAsDataURL(request.response)
      }
      function timeout() {
        return
      }
    }
  }
}

export default BaseCache