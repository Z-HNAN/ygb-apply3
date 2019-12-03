import { createSelector } from 'reselect'
import { groupBy, toPairs } from 'lodash'
import moment from 'moment'
import { getWeekday } from '@/utils/momentExtends'

import { IConnectState } from '@/models/connect.d'
import { INormalWork } from '@/models/postInfo'

export interface IPostWork {
  YYYYMMDD: string
  title: string
  month: string
  works: INormalWork[]
}

export interface IPostInfo {
  title: string
  department: string
  tags: string[]
  content: string
  postWorks: IPostWork[]
}

export const postInfoSelector = createSelector(
  [
    (state: IConnectState) => state.post.normalPosts,
    (state: IConnectState) => state.postInfo.currentPostId,
    (state: IConnectState) => state.postInfo.works,
  ],
  (normalPosts, postInfoId, works) => {
    const post = normalPosts.find(({ id }) => id === postInfoId)

    if (typeof post === 'undefined') {
      const postInfo: IPostInfo = {
        title: '',
        department: '',
        tags: [],
        content: '',
        postWorks: [],
      }

      return postInfo
    }

    /**
     * 1.找到同一天的工作，进行分组
     * 以startTime为分组依据
     * 2.按照开始时间升序排序
     */
    const hasDayWorks = works.map(work => {
      const startDay = Number(moment(work.startTime).format('YYYYMMDD'))
      return {
        ...work,
        startDay,
      }
    })
    const worksByDays = toPairs(groupBy(hasDayWorks, 'startDay'))
    const postWorks = worksByDays.map(([YYYYMMDD, works]) => {
      const postWork: IPostWork = {
        YYYYMMDD,
        title: `${YYYYMMDD.slice(6, 8)}号（${getWeekday(moment(YYYYMMDD, 'YYYYMMDD'))}）`,
        month:`${YYYYMMDD.slice(4, 6)}月`,
        works: works.sort((prev, next) => prev.startTime - next.startTime),
      }

      return postWork
    })


    const postInfo: IPostInfo = {
      title: post.title,
      department: post.department,
      content: post.content,
      tags: post.tags,
      postWorks,
    }
    return postInfo
  }
)

/**
 * 当前是否可以报名，判断是否选中了selectWorkId
 */
export const applyAbleSelector = createSelector(
  [
    (state: IConnectState) => state.postInfo.selectWorkId
  ],
  (selectWorkId) => {
    return selectWorkId !== null
  }
)

/**
 * 判断当前组件内是否有数据，是否可以用作展示，
 * 判断currentPostId是否为null
 */
export const displayAbleSelector = createSelector(
  [
    (state: IConnectState) => state.postInfo.currentPostId
  ],
  (currentPostId) => {
    return currentPostId !== null
  }
)
