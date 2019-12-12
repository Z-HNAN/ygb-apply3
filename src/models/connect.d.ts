import { AnyAction } from 'redux';

import { IPostModelState } from './post'
import { IPostInfoModelState } from './postInfo'
import { ScheduleModelState } from './schedule'

export {
  IPostModelState,
  IPostInfoModelState,
  ScheduleModelState,
}

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    post?: boolean;
    postInfo?: boolean;
    schedule?: boolean;
  };
}

export interface IConnectState {
  loading: Loading
  post: IPostModelState
  postInfo: IPostInfoModelState
  schedule: ScheduleModelState
}

// export interface Route  {
//   routes?: Route[];
// }

// export interface IConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
//   dispatch?<K = any>(action: AnyAction): K;
// }
