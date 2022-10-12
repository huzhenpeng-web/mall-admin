import service from '@/utils/request'
import { deleteImgServer } from '@/utils/index'

/**
 * 删除单张图片
 * @param {图片路径} url
 * @returns
 */
export function delImg (url) {
  service.defaults.baseURL = deleteImgServer
  return service.get('', {
    params: {
      file: url
    }
  })
}
