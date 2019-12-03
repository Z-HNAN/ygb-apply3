import { Reducer } from 'redux'
import { Subscription, Effect } from 'dva'

import * as postInfoServices from '@/services/postInfo'

export interface INormalWork {
  id: string
  startTime: number
  endTime: number
  nowCount: number
  totalCount: number
  remark: string
}

export interface IPostInfoModelState {
	// 当前的postId
	currentPostId: string | null
	// 当前选中的工作时间段
	selectWorkId: string | null
	// 当前的工作
	works: INormalWork[]

}

export interface IPostInfoModelType {
	namespace: 'postInfo'
	state: IPostInfoModelState
	effects: {
		/* 拉取岗位信息 */
		fetchWork: Effect
	}
	reducers: {
		/* 改变postInfo id */
		changePostInfoId: Reducer<IPostInfoModelState>
		/* 保存works */
		saveWorks: Reducer<IPostInfoModelState>
		/* 改变选中的workId */
		selectWork: Reducer<IPostInfoModelState>
	}
}

const PostInfoModel: IPostInfoModelType = {
	namespace: 'postInfo',
	state: {
		currentPostId: null,
		selectWorkId: null,
		works: [],
	},
	effects: {
		*fetchWork({ payload }, { call, put}) {
			const { postInfoId } = payload
			const normalWorks = yield call(postInfoServices.fetchNormalWork, { id: postInfoId })
			yield put({ type: 'saveWorks', payload: { works: normalWorks } })
		}
	},
	reducers: {
		changePostInfoId(state, action) {
			const { postInfoId } = action.payload
			return {
				...(state as IPostInfoModelState),
				currentPostId: postInfoId,
			}
		},
		saveWorks(state, action) {
			const { works } = action.payload
			return {
				...(state as IPostInfoModelState),
				works,
			}
		},
		selectWork(state, action) {
			const { workId } = action.payload
			return {
				...(state as IPostInfoModelState),
				selectWorkId: workId,
			}
		},
	},
}

export default PostInfoModel
