import { Reducer } from 'redux'
import { Subscription, Effect } from 'dva'
import { IConnectState } from './connect.d'
import router from 'umi/router'

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
  scheduleId: string | null
}

export interface ScheduleModelType {
  namespace: 'schedule',
  state: ScheduleModelState,
  reducers: {
    /* 保存岗位安排表信息 */
    saveApplyList: Reducer<any>
    /* 改变当前查看的计划Id */
    changeScheduleId: Reducer<any>
  }
  effects: {
    /* 初始化所有用户 */
    initApplyList: Effect,
    /* 检查计划详情数据是否正确 */
    initScheduleInfo: Effect,
    /* 拉取岗位安排计划 */
    fetchApplyList: Effect,
  }
  subscriptions: {
    /* 页面初始化，加载数据 */
    init: Subscription,
    /* 检查计划详情页是否正常 */
    initScheduleInfo: Subscription,
  }
}

const ScheduleModel: ScheduleModelType = {
  namespace: 'schedule',
  state: {
    applyList: [],
    scheduleId: null,
  },
  reducers: {
    saveApplyList(state: IConnectState, action) {
      const { applyList } = action.payload
      return {
        ...state,
        applyList,
      } 
    },
    changeScheduleId(state: IConnectState, action) {
      const { scheduleId } = action.payload
      return {
        ...state,
        scheduleId,
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
    *initScheduleInfo(_, { put, select }) {
      /**
       * 检查是否存在scheduleId，否则跳回schedule
       */
      const scheduleId = yield select(
        (state: IConnectState) => state.schedule.scheduleId
      )
      if (scheduleId === null) {
        router.replace('/schedule')
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
    },
    /* 检查计划详情页是否正常 */
    initScheduleInfo({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/scheduleInfo') {
          dispatch({ type: 'initScheduleInfo', payload: {} })
        }
      }) 
    },
  }
}

export default ScheduleModel
