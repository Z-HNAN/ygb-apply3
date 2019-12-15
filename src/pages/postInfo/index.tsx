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
    /* 正在拉取岗位详情 */
    loading: (state.loading.models.post) as boolean,
    /* 岗位详情 */
    postInfo: postInfoSelector(state),
    /* 是否可报名 */
    applyAble: applyAbleSelector(state),
  }
}

class PostInfo extends React.PureComponent<IProps, IState> {
  componentWillUnmount () {
    /* 销毁组件，清理数据 */
    this.props.dispatch({ type: 'postInfo/clear'})
  }


  // 处理报名
  handleApply = ({ workId, phone, rememberPhone }: { workId: string, phone: string, rememberPhone: boolean }) => {
    Toast.loading('报名中...', 0)
    this.props.dispatch({
      type: 'postInfo/apply',
      payload: { workId, phone, rememberPhone },
    })
  }

  render() {
    return (<Component onApply={this.handleApply} {...this.props} />)
  }
}

export default connect(mapStateToProps)(PostInfo)
