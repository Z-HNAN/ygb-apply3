import { Reducer } from 'redux'
import { Subscription, Effect } from 'dva'
import { IConnectState } from '@/models/connect.d'
import router from 'umi/router'


export interface IPostInfoModelState {
	// 当前的postId
	currentPostId: string | null
	// 当前的apartmentId，仅针对于apartment中，该楼楼号
	apartmentId: string | null
	// 当前选中的工作时间段
	selectWorkId: string | null
	// 当前的工作类型
	postType: '' | 'apartment' | 'normal'

}

export interface IPostInfoModelType {
	namespace: 'postInfo'
	state: IPostInfoModelState
	effects: {
		/* 初始化页面数据 */
		init: Effect
	}
	reducers: {
		/* 改变postInfo id, postType */
		changePostInfo: Reducer<any>
		/* 清除所有信息 */
		clear: Reducer<any>
		/* 改变选中的workId */
		selectWork: Reducer<any>
	}
}

const INIT_STATE: IPostInfoModelState = {
	currentPostId: null,
	selectWorkId: null,
	apartmentId: null,
	postType: '',
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
		}
	},
	reducers: {
		changePostInfo(state: IPostInfoModelState, action) {
			const { postInfoId, postType } = action.payload
			return {
				...state,
				currentPostId: postInfoId,
				postType,
			}
		},
		clear() {
			return INIT_STATE
		},
		selectWork(state: IPostInfoModelState, action) {
			const { workId } = action.payload
			return {
				...state,
				selectWorkId: workId,
			}
		},
	},
}

export default PostInfoModel
