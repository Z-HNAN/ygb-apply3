import { Reducer } from 'redux'
import { Subscription, Effect } from 'dva'
import { IConnectState } from './connect.d'

import * as scheduleService from '@/services/schedule'

export interface ApplyType {
  /**
   * 所有岗位共有字段
   */
  id: string
  postId: string
  remark: string
  contactName: string
  contactPhone: string
  title: string
  content: string
  postType: 'normal' | 'apartment'

  /* normal */
  department?: string
  startTime?: number
  endTime?: number

  /* apartment */
  apartment?: string
  descriptionTime?: string
}

export interface ScheduleModelState {
  applyList: ApplyType[] 
}

export interface ScheduleModelType {
  namespace: 'schedule',
  state: ScheduleModelState,
  reducers: {
    /* 保存岗位安排表信息 */
    saveApplyList: Reducer<any>
  }
  effects: {
    /* 初始化所有用户 */
    initApplyList: Effect,
    /* 拉取岗位安排计划 */
    fetchApplyList: Effect,
  }
  subscriptions: {
    /* 页面初始化，加载数据 */
    init: Subscription,
  }
}

const ScheduleModel: ScheduleModelType = {
  namespace: 'schedule',
  state: {
    applyList: [],
  },
  reducers: {
    saveApplyList(state: IConnectState, action) {
      const { applyList } = action.payload
      
      return {
        ...state,
        applyList,
      } 
    }
  },
  effects: {
    *initApplyList(_, { put, select }) {
      /**
       * 查看是否已经存在了applyList, 没有则拉取，有就不拉取
       */
      const applyList: ApplyType[] = yield select(
        (state: IConnectState) => state.schedule.applyList
      )
      if (applyList.length <= 0) {
        yield put({ type: 'fetchApplyList', payload: {} })
      }
    },
    *fetchApplyList(_, { call, put, select }) {
      const verifyRequest = 'verifyRequest'
      const applyList = yield call(scheduleService.fetchApplyList, { verifyRequest })
      yield put({ type: 'saveApplyList', payload: { applyList } })
    }
  },
  subscriptions: {
    /* 页面初始化，加载数据 */
    init({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/schedule') {
          dispatch({ type: 'initApplyList', payload: {} })
        }
      })
    }
  }
}

export default ScheduleModel
