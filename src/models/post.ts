import { Reducer } from 'redux'
import { Subscription, Effect } from 'dva'

import { delay as delayService } from '@/services/post'

export interface IPostModelState {
  count: number
}

export interface IPostModelType {
  namespace: 'post'
  state: IPostModelState
  effects: {
    addAsync: Effect
  }
  reducers: {
    add: Reducer<IPostModelState>
  }
}

const PostModel: IPostModelType = {
  namespace: 'post',
  state: {
    count: 0,
  },
  reducers: {
    add(state, action) {
      return {
        ...state,
        count: state.count + 1,
      }
    }
  },
  effects: {
    *addAsync({ payload }, { call, put }) {
      const { delay } = payload
      const respose = yield call(delayService, delay)
      yield put({ type: 'add' })
    },
  },
}

export default PostModel
