/**
 * 我的
 */
import React from 'react'
import { connect } from 'dva';
import router from 'umi/router'
import { IConnectState } from '@/models/connect.d'
import { Dispatch, AnyAction } from 'redux';

export interface OwnProps {
  dispatch: Dispatch<AnyAction>
}

const mapStateToProps = (state: IConnectState) => {
  return {

  }
}

const Me: React.FC<OwnProps> = props => {
  const {} = props

  return (
    <div>我的</div>
  )
}

export default connect(mapStateToProps)(Me)
