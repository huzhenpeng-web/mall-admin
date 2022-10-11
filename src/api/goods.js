import service from '@/utils/request'

/**
 * 商品分类列表
 * @param {页码} pageNumber
 * @param {每页条数} pageSize
 * @param {分类级别} categoryLevel
 * @param {上级分类的id} parentId
 * @returns
 */
export function Category (pageNumber, pageSize, categoryLevel, parentId) {
  return service.get('/manage-api/v1/categories', {
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      categoryLevel: categoryLevel,
      parentId: parentId
    }
  })
}

/**
 * 商品列表
 * @param {有多少页} pageNumber
 * @param {每页条数} pageSize
 * @param {商品名称} goodsName
 * @param {商品状态} goodsSellStatus
 * @returns
 */
export function goodsList (pageNumber, pageSize, goodsName, goodsSellStatus) {
  return service.get('/goods/list', {
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      goodsName: goodsName,
      goodsSellStatus: goodsSellStatus
    }
  })
}

/**
 * 添加商品
 * @param {商品对象} good
 * @returns
 */
export function addGood (good) {
  return service.post('/goods/insert', good)
}

/**
 * 修改商品
 * @param {修改后的商品对象} good
 * @returns
 */
export function updateGood (good) {
  return service.post('/goods/update', good)
}

/**
 * 根据商品id查询商品详情
 * @param {商品id} id
 * @returns
 */
export function findGoodsById (id) {
  return service.get(`/goods/detail/${id}`)
}

/**
 * id数组批量删除商品
 * @param {商品id数组} ids
 * @returns
 */
export function deleteGoodsList (ids) {
  return service.put('/goods/list/delete', ids)
}

/**
 * 获取单条分类信息
 * @param {分类id} id
 * @returns
 */
export function getSingleCategory (id) {
  return service.get(`/manage-api/v1/categories/${id}`)
}
