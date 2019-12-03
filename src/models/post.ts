import { Reducer } from 'redux'
import { Subscription, Effect } from 'dva'

import { IConnectState } from './connect.d'
import { unionBy } from 'lodash'
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
    /* 初始化岗位 */
    initNormalPost: Effect
  }
  reducers: {
    /* 追加普通岗位 */
    appendNormalPost: Reducer<IPostModelState>
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
    *fetchNormalPost({ payload }, { call, put, select }) {
      /**
       * append=true 追加操作
       * append=false 刷新操作
       */
      const { append } = payload
      if (append === true) {
        const lastNormalPosts = yield select((state: IConnectState) => state.post.normalPosts)
        const normalPosts = yield call(postService.fetchNormalPost, { start: lastNormalPosts.length })
        yield put({ type: 'appendNormalPost', payload: { normalPosts } })
      } else {
        const normalPosts = yield call(postService.fetchNormalPost, { start: 1 })
        yield put({ type: 'saveNormalPost', payload: { normalPosts } })
      }
    },
    *initNormalPost(_,  { put, select }) {
      /**
       * 查看是否已经存在了normalPost, 没有则拉取，有就不拉取
       */
      const posts: INormalPost[] = yield select(
        (state: IConnectState) => state.post.normalPosts
      )
      if (posts.length <= 0) {
        yield put({ type:'fetchNormalPost', payload: { append: false } })
      }
    },

  },
  reducers: {
    appendNormalPost(state, action) {
      /**
       * 过滤一下id去重，很有可能服务端顺序不一致，造成重复拉取
       */
      const { normalPosts: newNormalPost } = action.payload
      const { normalPosts: oldNormalPost } = (state as IPostModelState)
      const normalPosts = unionBy(newNormalPost, oldNormalPost, 'id')
      return {
        ...state,
        normalPosts,
      }
    },
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
