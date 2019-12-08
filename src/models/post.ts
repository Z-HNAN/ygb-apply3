import { Reducer } from 'redux'
import { Subscription, Effect } from 'dva'

import { IConnectState } from './connect.d'
import { unionBy } from 'lodash'
import * as postService from '@/services/post'
import { identifier } from '@babel/types'

/**
 * 基本岗位的工作类型
 */
export interface NormalWorkType {
  id: string
  startTime: number
  endTime: number
  nowCount: number
  totalCount: number
  remark: string
}

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
  /* 对应的工作 */
  works: NormalWorkType[]
}

/**
 * 公寓中心工作结构
 */
export interface ApartmentWorkType {
  id: string
  /* 描述时间 */
  descriptionTime: string
  nowCount: number
  totalCount: number
  remark: string
}

/**
 * 公寓中心岗位结构
 */
export interface ApartmentPostType {
  id: string
  title: string
  /* 楼宇信息 */
  apartment: string
  apartmentId: string
  /* 总报名人数 */
  totalCount: number
  /* 现在报名人数 */
  nowCount: number
  /* 做工大致日期 */
  date: string
  /* 岗位拓展码，转换为二进制之后在进行相应的增减即可 */
  // isNew: boolean
  /* 所展示的标签 */
  tags: string[]
  /* 岗位详情 */
  content: string
  /* 工作内容 */
  works: ApartmentWorkType[]
}

export interface IPostModelState {
  normalPosts: INormalPost[]
  apartmentPosts: { [apartmentId: string]: ApartmentPostType[]}
}

export interface IPostModelType {
  namespace: 'post'
  state: IPostModelState
  effects: {
    /* 拉取公寓岗位 */
    fetchApartmentPost: Effect
    /* 拉取普通工作 */
    fetchNormalPost: Effect
    fetchNormalWork: Effect
    /* 初始化岗位 */
    initApartmentPost: Effect
    initNormalPost: Effect
    initNormalWork: Effect
  }
  reducers: {
    /* 追加岗位 */
    appendNormalPost: Reducer<any>
    /* 保存岗位 */
    saveApartmentPost: Reducer<any>
    saveNormalPost: Reducer<any>
    saveNormalWorks: Reducer<any>
  }
}

const PostModel: IPostModelType = {
  namespace: 'post',
  state: {
    normalPosts: [],
    apartmentPosts: {},
  },
  effects: {
    *fetchApartmentPost({ payload }, { call, put }) {
      const { apartmentId } = payload
      const apartmentPosts = yield call(postService.fetchApartmentPost, { apartmentId })
      yield put ({ type: 'saveApartmentPost', payload: { apartmentId, apartmentPosts } })
    },
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
    *fetchNormalWork({ payload }, { call, put }) {
      const { currentPostId } = payload
      const normalWorks = yield call(postService.fetchNormalWork, { id: currentPostId })
      yield put({ type: 'saveNormalWorks', payload: { currentPostId, works: normalWorks } })
    },
    *initApartmentPost({ payload }, { put, select }) {
      const { apartmentId } = payload
      /**
       * 查看当前是否已经存在了apartmentPost,没有则拉取
       */
      const apartmentPosts: ApartmentPostType[] = yield select(
        (state: IConnectState) => state.post.apartmentPosts[apartmentId] || []
      )
      if (apartmentPosts.length <= 0) {
        yield put({ type: 'fetchApartmentPost', payload: { apartmentId }})
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
    *initNormalWork({ payload }, { put, select }) {
      const { currentPostId } = payload

      const currentNormalPost: INormalPost = yield select(
        (state: IConnectState) => state.post.normalPosts.find(({ id }) => id === currentPostId)
      )
      if (currentNormalPost === undefined) return

      if (currentNormalPost.works.length <= 0) {
        yield put({ type: 'fetchNormalWork', payload: { currentPostId } })
      }
    },
  },
  reducers: {
    appendNormalPost(state: IPostModelState, action) {
      /**
       * 过滤一下id去重，很有可能服务端顺序不一致，造成重复拉取
       */
      const { normalPosts: newNormalPost } = action.payload
      const { normalPosts: oldNormalPost } = state
      const normalPosts = unionBy(newNormalPost, oldNormalPost, 'id')
      return {
        ...state,
        normalPosts,
      }
    },
    saveApartmentPost(state: IPostModelState, action) {
      const { apartmentId, apartmentPosts } = action.payload
      return {
        ...state,
        apartmentPosts: {
          ...state.apartmentPosts,
          [apartmentId]: apartmentPosts,
        }
      }
    },
    saveNormalPost(state: IPostModelState, action) {
      const { normalPosts } = action.payload
      return {
        ...state,
        normalPosts,
      }
    },
    saveNormalWorks(state: IPostModelState, action) {
      /**
       * 寻找出岗位的id,并且替换填充该岗位的works
       */
      const { currentPostId, works } = action.payload
      const normalPostIndex = state.normalPosts.findIndex(({ id }) => id === currentPostId)
      return {
        ...state,
        normalPosts: [
          ...state.normalPosts.slice(0, normalPostIndex),
          {
            ...state.normalPosts[normalPostIndex],
            works,
          },
          ...state.normalPosts.slice(normalPostIndex + 1),
        ],
      }
    },
  },
}

export default PostModel
