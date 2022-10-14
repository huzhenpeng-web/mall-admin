// 订单API接口
import service from '@/utils/request'

/**
 * 订单分页查询
 * @param {当前页} pageNum
 * @param {当前页包含多少条} pageSize
 * @param {订单号} orderNo
 */
export function orderList (pageNum, pageSize, orderNo, orderStatus) {
  return service.get('/order/admin/list', {
    params: {
      pageNumber: pageNum,
      pageSize: pageSize,
      orderNo: orderNo,
      orderStatus: orderStatus
    }
  })
}

/**
 * 查询单个订单id详情
 * @param {订单id} orderId
 * @returns
 */
export function orderOne (orderId) {
  return service.get('/order/one', {
    params: {
      orderId: orderId
    }
  })
}

/**
 * 根据订单id查询商品详情
 * @param {订单id} orderId
 */
export function orderGoods (orderId) {
  return service.get('/order/one/goods', {
    params: {
      orderId: orderId
    }
  })
}

/**
 * 更新订单状态
 * @param {} order
 */
export function updateOrderStatus (order) {
  return service.put('/order/orderStatus', order)
}
