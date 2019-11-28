import { Reducer } from 'redux'
import { Subscription, Effect } from 'dva'
import { IConnectState } from './connect.d'

import * as userService from '@/services/users'

export interface IUser {
  name: string
  email: string
  website: string
}

export interface IUsersModelState {
  list: IUser[]
  total: number
  page: number
}

export interface IUsersModelType {
  namespace: 'users'
  state: IUsersModelState
  reducers: {
    /* 存入state中 */
    save: Reducer<IUsersModelState>,
  }
  effects: {
    /* 拉取所有用户 */
    fetch: Effect,
    /* 重新拉取用户 */
    reload: Effect,
    /* 删除用户 */
    remove: Effect,
    /* 更新用户 */
    update: Effect,
    /* 创建用户 */
    create: Effect,
  }
  subscriptions: {
    /* 页面初始化 加载数据 */
    init: Subscription,
  }
}

const UsersModel: IUsersModelType = {
  namespace: 'users',
  state: {
    list: [],
    total: 0,
    page: 0,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page }
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const data = yield call(userService.fetch, payload)
      yield put({ type: 'save', payload: { data }})
    },

    *reload(_, { put, select }){
      const page = yield select(
        (state: IConnectState) => state.users.page
      )
      yield put({ type: 'fetch', payload: { page }})
    },

    *remove({ payload: { id }}, { call }) {
      yield call(userService.remove, { id })
      yield call(this.reload)
    },

    *update({ payload: { id, values }}, { call }){
      yield call(userService.update, { id, values })
      yield call(this.reload)
    },

    *create({ payload: { values }}, { call }){
      yield call(userService.create, { values })
      yield call(this.reload)
    },
  },

  subscriptions: {
    init({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: {} })
        }
      })
    }
  },
}

export default UsersModel
