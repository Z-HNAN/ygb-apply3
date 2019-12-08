import React from 'react'
import { connect } from 'dva';
import router from 'umi/router'
import { IConnectState } from '@/models/connect.d'
import { Dispatch, AnyAction } from 'redux';
import { Toast } from 'antd-mobile'

import {
  IPostInfo,
  postInfoSelector,
  applyAbleSelector,
} from './selector'

import Component from './postInfo'

export interface IProps {
  dispatch: Dispatch<AnyAction>
  loading: boolean
  postInfo: IPostInfo
  applyAble: boolean
  displayAble: boolean
  children?: any
}

export interface IState {}

const mapStateToProps = (state: IConnectState) => {
  return {
    loading: (state.loading.models.post) as boolean,
    /* 岗位详情 */
    postInfo: postInfoSelector(state),
    /* 是否可报名 */
    applyAble: applyAbleSelector(state),
  }
}

class PostInfo extends React.PureComponent<IProps, IState> {
  componentDidMount () {
    /**
     * 初始化postInfo的数据
     * 包括数据的拉取，和检查数据是否正常等
     */
    this.props.dispatch({ type: 'postInfo/init' })
  }
  componentWillUnmount () {
    /* 销毁组件，清理数据 */
    this.props.dispatch({ type: 'postInfo/clear'})
  }

  render() {
    return (<Component {...this.props} />)
  }
}

export default connect(mapStateToProps)(PostInfo)
