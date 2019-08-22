import { Message } from 'element-ui'

export function printMD(url, data) {
  // MaskUtil.mask()
  var oReq = new XMLHttpRequest()
  oReq.open('POST', url, true)
  oReq.onload = function(oEvent) {
    // Uploaded.
  }
  var blob = new Blob(['[' + JSON.stringify(data) + ']'], { type: 'text/plain' })
  oReq.send(blob)
  oReq.onreadystatechange = function() {
    if (oReq.readyState === 4 && (oReq.status === 200 || oReq.status === 304)) { // 304未修改
      if (JSON.parse(oReq.response).result.indexOf('系统异常') !== -1) {
        Message({
          message: '电子运单参数输入有误，请联系管理员',
          type: 'error',
          duration: 5 * 1000
        })
        // $.messager.alert('提示', , 'info')
        console.log(oReq.response)
      } else {
        Message({
          message: JSON.parse(oReq.response).result,
          type: 'success',
          duration: 5 * 1000
        })
        // $.messager.alert('提示', , 'info')
      }
      // 加载loading...完成
      // setTimeout(function() {
      //   MaskUtil.unmask()
      // }, 500)
      return
    } else if (oReq.readyState === 4 && oReq.status === 0) {
      Message({
        message: '打印失败，打印服务未启动',
        type: 'error',
        duration: 5 * 1000
      })
      // $.messager.alert('提示', '打印失败，打印服务未启动', 'info')
      // setTimeout(function() {
      //   MaskUtil.unmask()
      // }, 500)
    } else if (oReq.readyState === 4 && oReq.status === 500) {
      // $.messager.alert('提示', '电子运单参数输入有误，请联系管理员', 'info')
      Message({
        message: '电子运单参数输入有误，请联系管理员',
        type: 'error',
        duration: 5 * 1000
      })
      console.log(oReq.response)
      // setTimeout(function() {
      //   MaskUtil.unmask()
      // }, 500)
    }
  }
}
export function jsonProperty(object) {
  for (var i in object) {
    var value = object[i]
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          object[i] = null
          continue
        }
      }
      jsonProperty(value)
    } else {
      if (value === '') {
        object[i] = null
      }
    }
  }
}
