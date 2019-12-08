import { createSelector } from 'reselect'
import { groupBy, toPairs } from 'lodash'
import moment from 'moment'
import { getWeekday } from '@/utils/momentExtends'

import { IConnectState } from '@/models/connect.d'
import {
  NormalWorkType,
  ApartmentWorkType,
  INormalPost,
  ApartmentPostType,
} from '@/models/post'

export interface IPostWork {
  YYYYMMDD: string
  title: string
  month: string
  workType: 'normal' | 'apartment'
  works: NormalWorkType[] | ApartmentWorkType[]
}

export interface IPostInfo {
  title: string
  department: string
  tags: string[]
  content: string
  postWorks: IPostWork[]
}

const NULL_POSTINFO = {
  title: '',
  department: '',
  tags: [],
  content: '',
  postWorks: [],
}

/**
 * 当前是否有选中的岗位
 */
const hasPostId = createSelector(
  [
    (state: IConnectState) => state.postInfo.currentPostId
  ],
  (currentPostId) => {
    return currentPostId !== null
  }
)

/**
 * 普通岗位的工作详情
 */
const normalWorkInfoSelector = createSelector(
  [
    hasPostId,
    (state: IConnectState) => state.postInfo.postType,
    (state: IConnectState) => state.postInfo.currentPostId,
    (state: IConnectState) => state.post.normalPosts,
  ],
  (hasPostId, postType, postId, normalPosts) => {
    if (hasPostId === false || postType !== 'normal' ) { return NULL_POSTINFO }

    /* 获取到指定岗位 */
    const normalPost = normalPosts.find(({ id }) => id === postId) as INormalPost

    /**
     * 获取该岗位的工作
     * 1.找到同一天的工作，进行分组
     * 以startTime为分组依据
     * 2.按照开始时间升序排序
     */
    const hasDayWorks = normalPost.works.map(work => ({
      ...work,
      startDay: Number(moment(work.startTime).format('YYYYMMDD'))
    }))

    const postWorks = toPairs(groupBy(hasDayWorks, 'startDay')).map(([YYYYMMDD, works]) => ({
      YYYYMMDD,
      title: `${YYYYMMDD.slice(6, 8)}号（${getWeekday(moment(YYYYMMDD, 'YYYYMMDD'))}）`,
      month: `${YYYYMMDD.slice(4, 6)}月`,
      workType: 'normal',
      works: works.sort((prev, next) => prev.startTime - next.startTime)
    } as IPostWork))

    return {
      title: normalPost.title,
      department: normalPost.department,
      tags: normalPost.tags,
      content: normalPost.content,
      postWorks,
    } as IPostInfo
  }
)

/**
 * 公寓中心的工作详情
 */
const apartmentWorkInfoSelector = createSelector(
  [
    hasPostId,
    (state: IConnectState) => state.postInfo.postType,
    (state: IConnectState) => state.postInfo.apartmentId as string,
    (state: IConnectState) => state.postInfo.currentPostId,
    (state: IConnectState) => state.post.apartmentPosts,
  ],
  (hasPostId, postType, apartmentId, postId, apartmentPosts) => {
    if (hasPostId === false || apartmentId === null || postType !== 'apartment') { return NULL_POSTINFO }

    /* 获取指定的公寓中心岗位 */
    const apartmentPost = apartmentPosts[apartmentId].find(({ id }) => id === postId) as ApartmentPostType

    /* 公寓中心只有一项 */
    const postWorks: IPostWork[] = [{
      YYYYMMDD: apartmentPost.date,
      title: apartmentPost.date,
      month: '本学期',
      workType: 'apartment',
      works: apartmentPost.works
    }]

    return {
      title: apartmentPost.title,
      department: apartmentPost.apartment,
      tags: apartmentPost.tags,
      content: apartmentPost.content,
      postWorks,
    } as IPostInfo
  }
)

/**
 * 过滤出需要展示的岗位详情数据
 */
export const postInfoSelector = createSelector(
  [
    (state: IConnectState) => state.postInfo.postType,
    normalWorkInfoSelector,
    apartmentWorkInfoSelector,
  ],
  (postType, normalWorkInfo, apartmentWorkInfo) => {
    /**
     * 根据postType的类型获取岗位详情
     */
    if (postType === 'normal') {
      return normalWorkInfo
    } else if (postType === 'apartment') {
      return apartmentWorkInfo
    }

    return NULL_POSTINFO
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
