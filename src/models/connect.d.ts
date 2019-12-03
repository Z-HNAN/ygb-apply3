import { AnyAction } from 'redux';

import { IUsersModelState } from './users'
import { IPostModelState } from './post'
import { IPostInfoModelState } from './postInfo'

export { IUsersModelState, IPostModelState, IPostInfoModelState }

export interface IConnectState {
  users: IUsersModelState
  post: IPostModelState
  postInfo: IPostInfoModelState
}

// export interface Route  {
//   routes?: Route[];
// }

// export interface IConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
//   dispatch?<K = any>(action: AnyAction): K;
// }
