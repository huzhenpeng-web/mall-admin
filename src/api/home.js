// 首页配置的API接口
import service from '@/utils/request'

/**
 * 获取商品
 * @param {当前页} pageNum
 * @param {当前页的数量} pageSize
 * @param {1-搜索框热搜 2-搜索下拉框热搜 3-(首页)热销商品 4-(首页)新品上线 5-(首页)为你推荐} status
 * @returns
 */
export function goods (pageNum, pageSize, status) {
  return service.get('/category/goods', {
    params: {
      pageNumber: pageNum,
      pageSize: pageSize,
      status: status
    }
  })
}

/**
 * 添加商品
 * @param {configId,goodsName,goodsId,redirectUrl,configRank,configType} goods
 * @returns
 */
export function addGoods (goods) {
  return service.post('/category/goods/insert', goods)
}

/**
 * 更新商品
 * @param {configId,goodsName,goodsId,redirectUrl,configRank,configType} goods
 * @returns
 */
export function updateGoods (goods) {
  return service.post('/category/goods/update', goods)
}

/**
 * 查询单个商品数据
 * @param {主键} configId
 * @returns
 */
export function findOneGoods (configId) {
  return service.get('/category/goods/one', {
    params: {
      configId: configId
    }
  })
}

/**
 * 批量删除商品
 * @param {config} ids
 * @returns
 */
export function deleteGoods (ids) {
  return service.put('/category/goods/delete', ids)
}
