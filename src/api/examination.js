import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/exam/applyInfoList',
    method: 'post',
    data
  })
}

export function fileinfo(data) {
  return request({
    url: '/exam/applyProcess',
    method: 'post',
    data
  })
}
// 初审
export function firstexam(data) {
  return request({
    url: '/exam/transfer',
    method: 'post',
    data
  })
}
// 终审
export function endexam(data) {
  return request({
    url: '/exam/passApplyExam',
    method: 'post',
    data
  })
}
// 打印物流单号接口
export function printexpress(data) {
  return request({
    url: '/exam/print',
    method: 'post',
    data
  })
}

// 真实打印接口
export function printmessage(data) {
  return request({
    url: '/exam/print',
    method: 'post',
    data
  })
}
// 更新领取状态
export function updateApplyInfo(data) {
  return request({
    url: '/exam/updateapplyinfo',
    method: 'post',
    data
  })
}
// 逻辑删除
export function deleteApplyInfo(data) {
  return request({
    url: '/exam/deleteapplyinfo',
    method: 'post',
    data
  })
}
// 更新支付状态
export function changepaystatus(data) {
  return request({
    url: '/exam/changepaystatus',
    method: 'post',
    data
  })
}
// 导出数据
export function downloadzehngshu(data) {
  return request({
    url: '/exam/downloadzehngshu',
    method: 'post',
    data
  })
}

// 查询发票信息
export function getInvoices(data) {
  return request({
    url: '/exam/getInvoices',
    method: 'post',
    data
  })
}

// 查询单个申请信息
export function getOneApplyInfo(data) {
  return request({
    url: '/exam/getOneApplyInfo',
    method: 'post',
    data
  })
}

