import { createSelector } from 'reselect'
import { groupBy, toPairs } from 'lodash'
import moment from 'moment'
import { getWeekday } from '@/utils/momentExtends'

import { ApplyType } from '@/models/schedule'
import { IConnectState } from '@/models/connect.d'

export interface ScheduleInfoType {
  /* 头像，部门截取首字母，公寓楼截取楼号 */
  avator: string
  title: string
  contactName: string
  contactPhone: string
  content: string
  remark: string
}

/**
 * 隐藏组件，即没有正确的scheduleId
 */
export const hiddenSelector = createSelector(
  [
    (state: IConnectState) => state.schedule.scheduleId,
  ],
  (scheduleId): boolean => {
    return scheduleId === null
  }
)

/**
 * 获取计划详情所需要的数据
 */
export const scheduleInfoSelector = createSelector(
  [
    hiddenSelector,
    (state: IConnectState) => (state.schedule.scheduleId) as string,
    (state: IConnectState) => state.schedule.applyList,
  ],
  (hidden, scheduleId, applyList): ScheduleInfoType => {
    if (hidden === true) return {
      title: '',
      contactName: '',
      contactPhone: '',
      content: '',
      remark: '',
      avator: '',
    }

    const apply = applyList.find(({ id }) => id === scheduleId) as ApplyType

    /**
     * 公共部分
     */
    const {
      title,
      contactName,
      contactPhone,
      content,
      remark,
      postType,
      apartment,
      department,
    } = apply

    
    /**
     * 分别提取的部分
     */
    let avator = ''
    if (postType === 'normal') {
      // 保卫处 -> 保
      avator = (department as string).slice(0, 1)
    } else if (postType === 'apartment') {
      // 22#楼 -> 22
      [avator] = (apartment as string).match(/\d+/) || ['']
    }

    return {
      title,
      contactName,
      contactPhone,
      content,
      remark,
      avator,
    }
  }
)
