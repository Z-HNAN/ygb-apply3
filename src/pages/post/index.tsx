import React from 'react'
import { connect } from 'dva';

import { IConnectState } from '@/models/connect.d'
import { Dispatch, AnyAction } from 'redux';
import { INormalPost } from '@/models/post'

import Component from './post'

interface IProps {
  dispatch: Dispatch<AnyAction>
  children?: any
  normalPosts: INormalPost[]
}

interface IState {}

const mapStateToProps = (state: IConnectState) => {
  const { normalPosts } = state.post
  return {
    normalPosts,
  }
}

class Post extends React.PureComponent<IProps, IState> {
  componentDidMount() {
    const { dispatch } = this.props
    /**
     * 拉取普通岗位信息
     */
    dispatch({ type: 'post/fetchNormalPost' })
  }

  render() {
    return (<Component {...this.props} />)
  }
}


export default connect(mapStateToProps)(Post)
