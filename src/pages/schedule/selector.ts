import { createSelector } from 'reselect'
import { groupBy, toPairs } from 'lodash'
import moment from 'moment'
import { getWeekday } from '@/utils/momentExtends'

import { IConnectState } from '@/models/connect.d'

/**
 * 包含必要鉴别信息用于分页使用
 */
export interface ScheduleCardOriginType extends ScheduleCardType{
  /**
   * department目前均放置与进行中的岗位
   */
  postType: 'normal' | 'apartment'
  /**
   * normal中使用该字段，用作排序使用
   */
  startTime?: number
}

export interface ScheduleCardType {
  id: string
  /* 显示时间 */
  time: string
  /* 招工标题 */
  title: string
  /* 招工部门 */
  department: string
}

/**
 * 安排计划卡片所需数据
 */
const scheduleSelector = createSelector(
  [
    (state: IConnectState) => state.schedule.applyList
  ],
  (applyList) => {
    return applyList.map((apply): ScheduleCardOriginType => {
      const { id, postType, startTime } = apply

      let time = ''
      let title = apply.title
      let department = ''

      if (postType === 'normal') {
        /**
         * normal类型
         * 11月28日（周一） 9:00 - 12:00
         * startTime, endTime, department
         */
        const { startTime, endTime, department: applyDepartment } = apply
        time = `${moment(startTime).format('MM月DD日')}（${getWeekday(moment(startTime))}） ${moment(startTime).format('HH:MM')} - ${moment(endTime).format('HH:MM')}`
        department = applyDepartment as string
      } else if (postType === 'apartment') {
        /**
         * apartment类型
         * 描述时间段
         * descriptionTime, apartment
         */
        const { descriptionTime, apartment } = apply
        time = descriptionTime as string
        department = apartment as string
      }

      return {
        id,
        title,
        time,
        department,
        postType,
        startTime,
      }
    })
  }
)

/**
 * 全部计划安排
 */
export const allScheduleSelector = createSelector(
  [
    scheduleSelector,
  ],
  (schedules): ScheduleCardType[] => {
    return schedules.map(({ id, time, title, department }) => ({
      id,
      time,
      title,
      department,
    }))
  }
)

/**
 * 已报名计划安排（未开始，startOfToday < 工作时间）
 * normal中小于今天的日期
 */
export const waitingScheduleSelector = createSelector(
  [
    scheduleSelector,
  ],
  (schedules): ScheduleCardType[] => {
    /* 获取当天的00:00:00 */
    const startTimestamp = Number(moment().startOf('d').format('x'))
    /* 过滤normal计划 */
    const normalSchedules = schedules
      .filter(({ postType }) => postType === 'normal')
      .filter(({ startTime }) => startTimestamp < (startTime as number))
    return normalSchedules.map(({ id, time, title, department }) => ({
      id,
      time,
      title,
      department,
    }))
  }
)

/**
 * 进行中的安排(日相等)
 * normal中 startOf < time < endOf
 * apartment中 所有
 */
export const workingScheduleSelector = createSelector(
  [
    scheduleSelector,
  ],
  (schedules): ScheduleCardType[] => {
    /* 获取当天的00:00:00 */
    const startTimestamp = Number(moment().startOf('d').format('x'))
    /* 获取当天的23:59:59 */
    const endTimestamp = Number(moment().endOf('d').format('x'))
    
    /* 过滤normal计划 */
    const normalSchedules = schedules
      .filter(({ postType }) => postType === 'normal')
      .filter(({ startTime }) => startTimestamp < (startTime as number) && (startTime as number) < endTimestamp)
    /* 过滤apartment计划 */
    const apartmentSchedule = schedules
      .filter(({ postType }) => postType === 'apartment')
    
    /* 返回数据 */
    return [...normalSchedules, ...apartmentSchedule].map(({ id, time, title, department }) => ({
      id,
      time,
      title,
      department,
    }))
  }
)


/**
 * 已结束计划安排（已结束，工作时间 < endOfToday ）
 * normal中小于今天的日期
 */
export const finishScheduleSelector = createSelector(
  [
    scheduleSelector,
  ],
  (schedules): ScheduleCardType[] => {
    /* 获取当天的23:59:59 */
    const endTimestamp = Number(moment().endOf('d').format('x'))
    /* 过滤normal计划 */
    const normalSchedules = schedules
      .filter(({ postType }) => postType === 'normal')
      .filter(({ startTime }) => (startTime as number) < endTimestamp)

    return normalSchedules.map(({ id, time, title, department }) => ({
      id,
      time,
      title,
      department,
    }))
  }
)
