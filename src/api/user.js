import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/admin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/auth/user',
    method: 'get',
    headers: { 'AUTHORIZATION': token },
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
