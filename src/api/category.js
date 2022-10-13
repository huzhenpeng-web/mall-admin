import service from '@/utils/request'

/**
 * 获取商品分类列表
 * @returns
 */
export function categoryList () {
  return service.get('/category/list')
}

/**
 * 商品分类列表分页查询
 * @param {1-一级 2-二级 3-三级} categoryLevel
 * @param {0-一级分类 二级分类或三级分类的父id} parentId
 * @param {页码} pageNumber
 * @param {一页多少条数据} pageSize
 * @returns
 */
export function categoryLevel (categoryLevel, parentId, pageNumber, pageSize) {
  return service.get('/category/level', {
    params: {
      categoryLevel: categoryLevel,
      parentId: parentId,
      pageNumber: pageNumber,
      pageSize: pageSize
    }
  })
}

/**
 * 批量删除分类
 * @param {categoryId} ids
 */
export function delCategory (ids) {
  return service.delete('/category/level/del', { data: ids })
}

/**
 * 新增分类
 * @param {categoryLevel,parentId,categoryName,categoryRank} data
 * @returns
 */
export function addCategory (data) {
  return service.post('/category/level/add', data)
}

/**
 * 更新分类
 * @param {categoryLevel,parentId,categoryName,categoryRank} data
 * @returns
 */
export function updateCategory (data) {
  return service.put('/category/level/update', data)
}
