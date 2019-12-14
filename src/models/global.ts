import { Reducer } from 'redux'
import { Subscription, Effect } from 'dva'
import { IConnectState } from '@/models/connect.d'
import router from 'umi/router'
import { act } from 'react-test-renderer'

/**
 * 登录的学生
 */
export interface StudentType {
	studentName: string
	studentId: string
	studentCollege: string
	studentPhone: string
}

export interface GlobalModelStateType {
	student: StudentType
	verifyRequest: string
}

export interface GlobalModelType {
	namespace: 'global'
	state: GlobalModelStateType
	effects: {
		/* 初始化学生个人信息 */
		initStudent: Effect
		/* 获取学生个人信息 */
		fetchStudent: Effect
	}
	reducers: {
		/* 改变学生个人信息 */
		changeStudent: Reducer<any>
		/* 改变verifyRequest */
		changeVerifyRequest: Reducer<any>
	},
	subscriptions: {
	}
}

const INIT_STATE: GlobalModelStateType = {
	student: {
		studentName: '白勇',
		studentId: '18000000',
		studentCollege: '外国语学院',
		studentPhone: '13777777777',
	},
	verifyRequest: 'verifyRequest',
}

const PostInfoModel: GlobalModelType = {
	namespace: 'global',
	state: INIT_STATE,
	effects: {
		*initStudent(_, { put, select }) {
			/* 1.判断当前是否存在用户信息，判断姓名不为空即可 */
			const studentName = yield select(
				(state: IConnectState) => state.global.student.studentName
			)

			/* 2.拉取岗位students 不需要重复拉取 */
			if (studentName === '') {
				yield put({ type: 'fetchStudent' })
			}
		},
		*fetchStudent(_, { put }) {
			// 获取学生个人信息
		}
	},
	reducers: {
		changeStudent(state: GlobalModelStateType, action) {
			const {
				studentName,
				studentId,
				studentCollege,
				studentPhone,
			} = action.payload

			return {
				...state,
				student: {
					...state.student,
					studentName,
					studentId,
					studentCollege,
					studentPhone,
				}
			}
		},
		changeVerifyRequest(state: GlobalModelStateType, action) {
			const { verifyRequest } = action.payload
			return {
				...state,
				verifyRequest,
			}
		},
	},
	subscriptions: {
	}
}

export default PostInfoModel
