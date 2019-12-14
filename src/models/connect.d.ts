import { AnyAction } from 'redux';

import { GlobalModelStateType } from './global'
import { IPostModelState } from './post'
import { IPostInfoModelState } from './postInfo'
import { ScheduleModelState } from './schedule'

export {
  IPostModelState,
  IPostInfoModelState,
  ScheduleModelState,
  GlobalModelStateType,
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
  global: GlobalModelStateType
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
