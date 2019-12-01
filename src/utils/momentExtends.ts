import { Moment } from 'moment'

/**
 * 获取星期的方法
 * moment中周天0 - 周六6
 */
export function getWeekday (moment: Moment):string {
  switch (moment.weekday()) {
    case 0:
      return '周日'
    case 1:
      return '周一'
    case 2:
      return '周二'
    case 3:
      return '周三'
    case 4:
      return '周四'
    case 5:
      return '周五'
    case 6:
      return '周六'
    default:
      return ''
  }
}
