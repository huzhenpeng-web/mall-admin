import service from '@/utils/request'
import { deleteImgServer } from '@/utils/index'

export function delImg (url) {
  service.defaults.baseURL = deleteImgServer
  return service.get('', {
    params: {
      file: url
    }
  })
}
