import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/fbdeal/list',
    method: 'post',
    data
  })
}
