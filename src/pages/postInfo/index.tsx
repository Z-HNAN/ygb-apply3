import React from 'react'
import { connect } from 'dva';

import { IConnectState } from '@/models/connect.d'
import { Dispatch, AnyAction } from 'redux';

import { IPostInfo, postInfoSelector } from './selector'
import Component from './postInfo'

export interface IProps {
  postInfo: IPostInfo
  children?: any
}

export interface IState {}

const mapStateToProps = (state: IConnectState) => {
  return {
    postInfo: postInfoSelector(state)
  }
}

class PostInfo extends React.PureComponent<IProps, IState> {

  render() {
    return (<Component {...this.props} />)
  }
}

export default connect(mapStateToProps)(PostInfo)
