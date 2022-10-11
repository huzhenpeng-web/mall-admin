import service from '@/utils/request'

/**
 * 获取商品分类列表
 * @returns
 */
export function categoryList () {
  return service.get('/category/list')
}
