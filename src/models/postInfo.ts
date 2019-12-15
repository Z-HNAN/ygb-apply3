import { Reducer } from 'redux'
import { Subscription, Effect } from 'dva'
import { IConnectState } from '@/models/connect.d'
import router from 'umi/router'
import * as postInfoServices from '@/services/postInfo'
import { Toast } from 'antd-mobile'

export interface ApplyFeedbackType {
	show: boolean
	type: 'success' | 'error'
	msg: string
}

export interface IPostInfoModelState {
	// 当前的postId
	currentPostId: string | null
	// 当前的apartmentId，仅针对于apartment中，该楼楼号
	apartmentId: string
	// 当前选中的工作时间段
	selectWorkId: string | null
	// 当前的工作类型
	postType: '' | 'apartment' | 'normal'
	// 报名反馈
	applyFeedback: ApplyFeedbackType
}

export interface IPostInfoModelType {
	namespace: 'postInfo'
	state: IPostInfoModelState
	effects: {
		/* 初始化页面数据 */
		init: Effect
		/* 进行报名 */
		apply: Effect
	}
	reducers: {
		/* 改变选中的楼宇id */
		changeApartmentId: Reducer<any>
		/* 改变postInfo id, postType */
		changePostInfo: Reducer<any>
		/* 清除所有信息,(反馈信息不予以删除) */
		clear: Reducer<any>
		/* 清除反馈信息 */
		clearFeedback: Reducer<any>
		/* 改变选中的workId */
		selectWork: Reducer<any>
		/* 改变报名反馈 */
		changeApplyFeedback: Reducer<any>
	},
	subscriptions: {
		init: Subscription
	}
}

const INIT_STATE: IPostInfoModelState = {
	currentPostId: null,
	selectWorkId: null,
	apartmentId: '18',
	postType: '',
	applyFeedback: {
		show: false,
		type: 'success',
		msg: ''
	}
}

const PostInfoModel: IPostInfoModelType = {
	namespace: 'postInfo',
	state: INIT_STATE,
	effects: {
		*init(_, { put, select }) {
			/* 1.判断当前是否选中了currentPostId */
			const currentPostId = yield select(
				(state: IConnectState) => state.postInfo.currentPostId
			)
			/* 跳转回岗位列表，并关闭Toast */
			if (currentPostId === null) {
				router.push('/post')
				return
			}

			/* 2.拉取岗位works  */
			const postType = yield select(
				(state: IConnectState) => state.postInfo.postType
			)
			if (postType === 'normal') {
				yield put({ type: 'post/initNormalWork', payload: { currentPostId } })
			} else if (postType === 'apartment') {
				/* 公寓中心为一次性拉取 */
			}
		},
		*apply({ payload }, { put, call, select }) {
			const { workId, phone, reremberPhone } = payload
			const [lastPhone, verifyRequest] = yield select(
				(state: IConnectState) => ([
					state.global.student.studentPhone,
					state.global.verifyRequest,
				])
			)
			
			// 报名
			const applyResponse = yield call(postInfoServices.apply, { workId, phone, verifyRequest });
			// 报名成功关闭Toast
			Toast.hide()
			// 跳转去操作结果
			router.push('/applyFeedback')

			// 报名失败，直接结束
			if (applyResponse.success === false) {
				yield put({
					type: 'changeApplyFeedback',
					payload: { show: true, type: 'error', msg: applyResponse.errorMsg }
				})
				return
			}

			// 报名成功，进行提示
			if (applyResponse.success === true) {
				yield put({
					type: 'changeApplyFeedback',
					payload: { show: true, type: 'success', msg: '报名成功，请留意时间安排。' }
				})
			}

			/**
			 * 如果remember未false，需要删除此次的报名信息
			 * 如果remember为true, 需要对比是否和已经存在的号码一致
			 */
			if (reremberPhone === false && lastPhone !== '') {
				// 之前存储过手机号信息，直接进行删除
				const phoneResponse = yield call(postInfoServices.changePhone, { phone: '', verifyRequest });
			}
			if (reremberPhone === true && phone !== lastPhone) {
				// 存在手机号，但是不一致
				const phoneResponse = yield call(postInfoServices.changePhone, { phone, verifyRequest });
			}
		}
	},
	reducers: {
		changeApartmentId(state: IPostInfoModelState, action) {
			const { apartmentId } = action.payload
			return {
				...state,
				apartmentId,
			}
		},
		changePostInfo(state: IPostInfoModelState, action) {
			const { postInfoId, postType } = action.payload
			return {
				...state,
				currentPostId: postInfoId,
				postType,
			}
		},
		clear(state) {
			return {
				...INIT_STATE,
				applyFeedback: state.applyFeedback,
			}
		},
		clearFeedback(state) {
			return {
				...state,
				applyFeedback: {
					show: false,
					type: 'success',
					msg: ''
				},
			}
		},
		selectWork(state: IPostInfoModelState, action) {
			const { workId } = action.payload
			return {
				...state,
				selectWorkId: workId,
			}
		},
		changeApplyFeedback(state: IPostInfoModelState, action) {
			const { show, type, msg } = action.payload
			return {
				...state,
				applyFeedback: {
					...state.applyFeedback,
					show,
					type,
					msg,
				},
			}
		},
	},
	subscriptions: {
		/**
			* 初始化postInfo的数据
			* 包括数据的拉取，和检查数据是否正常等
			*/
		init({ dispatch, history }) {
			return history.listen(({ pathname }) => {
				if (pathname === '/postInfo') {
					dispatch({ type: 'init', payload: {} })
				}
			})
		}
	}
}

export default PostInfoModel
