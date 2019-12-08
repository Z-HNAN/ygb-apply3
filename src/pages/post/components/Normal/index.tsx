import React from 'react'
import router from 'umi/router'
import { connect } from 'dva';

import { IConnectState } from '@/models/connect.d'
import { Dispatch, AnyAction } from 'redux'

import { INormalPost } from '@/models/post'

import {
  WhiteSpace,
} from 'antd-mobile'

import PostCard from '@/components/PostCard'

export interface IProps {
  dispatch: Dispatch<AnyAction>
  normalPosts: INormalPost[]
}

const mapStateToProps = (state: IConnectState) => {
 const { normalPosts } = state.post
  return {
    normalPosts,
  }
}

const Normal: React.FC<IProps> = props => {
  const { 
    dispatch,
    normalPosts,
  } = props

  const handleClickPost = (id: string) => {
    // 替换岗位详情Id, 拉取工作信息，跳转页面
    dispatch({ type: 'postInfo/changePostInfo', payload: { postInfoId: id, postType: 'normal' }})
    router.push('/postInfo')
  }

  React.useEffect(() => {
    // 挂载组建后,拉取所有normal
    dispatch({ type: 'post/initNormalPost' })
  }, [])

  const postCardsDOM = normalPosts.map(normalPost => (
    <React.Fragment key={normalPost.id}>
      <WhiteSpace />
      <PostCard {...normalPost} onClick={() => { handleClickPost(normalPost.id)}} />
    </React.Fragment>
  ))

  return (
    <div style={{width: '100vw'}}>
      {postCardsDOM}
    </div>
  )
}


export default connect(mapStateToProps)(Normal)
