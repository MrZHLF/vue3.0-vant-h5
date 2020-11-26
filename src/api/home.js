import request from './../util/request.js'

export function getUser() {
  return request({
    url: '/users',
    method: 'get'
  })
}