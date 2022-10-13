// 会员管理API
import service from '@/utils/request'

/**
 * 获取所有会员
 * @param {页码} pageNum
 * @param {一页显示多少数量} pageSize
 * @returns
 */
export function guestList (pageNum, pageSize) {
  return service.get('/user/list', {
    params: {
      pageNumber: pageNum,
      pageSize: pageSize
    }
  })
}

/**
 * 解禁用户
 * @param {id数组} ids
 * @returns
 */
export function openGuest (ids) {
  return service.put('/user/open/ids', ids)
}

/**
 * 禁止用户
 * @param {id数组} ids
 * @returns
 */
export function disableGuest (ids) {
  return service.put('/user/close/ids', ids)
}
