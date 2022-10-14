// 图表API
import service from '@/utils/request'

/**
 * 获取大盘数据
 */
export function getEcharts () {
  return service.get('/index/echarts')
}
