// 管理员接口
import service from '@/utils/request.js'
import qs from 'qs'

/**
 * 管理员登录
 * @param {账号和密码} user
 * @returns
 */
export function login (user) {
  return service.post('/admin/login', user)
}

/**
 * 修改昵称
 * @param {要修改的昵称} nickName
 * @returns
 */
export function updateNickName (nickName) {
  service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  return service.post('/admin/nickName', qs.stringify({
    nickName: nickName
  }))
}

/**
 * 修改密码
 * @param {旧密码和新密码} pwd
 * @returns
 */
export function updatePwd (pwd) {
  return service.post('/admin/password', pwd)
}
