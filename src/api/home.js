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

/**
 * 获取首页配置的轮播图数据
 * @param {页码} pageNumber
 * @param {一页显示多少条} pageSize
 * @returns
 */
export function swiperList (pageNumber, pageSize) {
  return service.get('/carousel/select', {
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize
    }
  })
}

/**
 * 新增轮播图
 * @param {carouselUrl 轮播图地址 redirectUrl 跳转地址 carouseRank 排序值} data
 * @returns
 */
export function insertSwiper (data) {
  return service.post('/carousel/insert', data)
}

/**
 * 查询单个轮播图的数据
 * @param {carouselId} id
 * @returns
 */
export function selectOneSwiper (id) {
  return service.get('/carousel/one?carouselId=' + id)
}

/**
 * 批量删除轮播图
 * @param {carouselId数组} ids
 * @returns
 */
export function deleteSwipers (ids) {
  return service.delete('/carousel/delete', { data: ids })
}

/**
 * 更新轮播图数据
 * @param {carouselId,carouselUrl,redirectUrl,carouselRank} data
 * @returns
 */
export function updateSwiper (data) {
  return service.put('/carousel/update', data)
}
