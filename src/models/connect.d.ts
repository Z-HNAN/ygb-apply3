import { AnyAction } from 'redux';

import { IUsersModelState } from './users'
import { IPostModelState } from './post'
import { IPostInfoModelState } from './postInfo'

export { IUsersModelState, IPostModelState, IPostInfoModelState }

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    users?: boolean;
    post?: boolean;
    postInfo?: boolean;
  };
}

export interface IConnectState {
  loading: Loading
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
