import { AnyAction } from 'redux';

import { IUsersModelState } from './users'

export { IUsersModelState }

export interface IConnectState {
  users: IUsersModelState
}

// export interface Route  {
//   routes?: Route[];
// }

// export interface IConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
//   dispatch?<K = any>(action: AnyAction): K;
// }
