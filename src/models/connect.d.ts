import { AnyAction } from 'redux';

import { IUsersModelState } from './users'
import { IPostModelState } from './post'

export { IUsersModelState, IPostModelState }

export interface IConnectState {
  users: IUsersModelState
  post: IPostModelState
}

// export interface Route  {
//   routes?: Route[];
// }

// export interface IConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
//   dispatch?<K = any>(action: AnyAction): K;
// }
