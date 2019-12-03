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
  displayAbleSelector,
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
    loading: (state.loading.models.postInfo) as boolean,
    postInfo: postInfoSelector(state),
    /* 是否可报名 */
    applyAble: applyAbleSelector(state),
    /* 是否可以展示（是否有数据，重复刷新可能会造成此问题）*/
    displayAble: displayAbleSelector(state),
  }
}

class PostInfo extends React.PureComponent<IProps, IState> {
  componentDidMount () {
    /* 判断是否有数据，否则进行跳转 */
    if (this.props.displayAble === false) {
      router.push('/post')
    }
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
