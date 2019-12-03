import React from 'react'
import { connect } from 'dva';

import { IConnectState } from '@/models/connect.d'
import { Dispatch, AnyAction } from 'redux';
import { Toast } from 'antd-mobile'

import { IPostInfo, postInfoSelector } from './selector'
import Component from './postInfo'

export interface IProps {
  dispatch: Dispatch<AnyAction>
  loading: boolean
  postInfo: IPostInfo
  children?: any
}

export interface IState {}

const mapStateToProps = (state: IConnectState) => {
  return {
    loading: (state.loading.models.postInfo) as boolean,
    postInfo: postInfoSelector(state)
  }
}

class PostInfo extends React.PureComponent<IProps, IState> {
  componentWillUnmount () {
    /* 销毁组件，清理数据 */
    this.props.dispatch({ type: 'postInfo/clear'})
  }


  render() {
    return (<Component {...this.props} />)
  }
}

export default connect(mapStateToProps)(PostInfo)
