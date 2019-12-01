import { Reducer } from 'redux'
import { Subscription, Effect } from 'dva'

import * as postService from '@/services/post'

/**
 * 基本岗位结构
 */
export interface INormalPost {
  id: string
  /* 招工标题 */
  title: string
  department: string
  departmentId: string
  /* 总报名人数 */
  totalCount: number
  /* 现在报名人数 */
  nowCount: number
  /* 日期均为timestamp */
  startDate: number
  endDate: number
  /* 岗位拓展码，转换为二进制之后在进行相应的增减即可 */
  // isNew: boolean
  /* 所展示的标签 */
  tags: string[]
  /* 岗位详情 */
  content: string
}

export interface IPostModelState {
  normalPosts: INormalPost[]
}

export interface IPostModelType {
  namespace: 'post'
  state: IPostModelState
  effects: {
    /* 拉取普通岗位 */
    fetchNormalPost: Effect
  }
  reducers: {
    /* 保存普通岗位 */
    saveNormalPost: Reducer<IPostModelState>
  }
}

const PostModel: IPostModelType = {
  namespace: 'post',
  state: {
    normalPosts: [],
  },
  effects: {
    *fetchNormalPost(_, { call, put }) {
      const normalPosts = yield call(postService.fetchNormalPost)
      yield put({ type: 'saveNormalPost', payload: { normalPosts } })
    },
  },
  reducers: {
    saveNormalPost(state, action) {
      const { normalPosts } = action.payload
      return {
        ...state,
        normalPosts,
      }
    }
  },
}

export default PostModel
