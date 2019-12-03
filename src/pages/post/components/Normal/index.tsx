import React from 'react'
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
    // console.log(id)
  }

  React.useEffect(() => {
    // 挂载组建后,拉取所有normal
    dispatch({ type: 'post/fetchNormalPost' })
  }, [])

  const postCardsDOM = normalPosts.map(normalPost => (
    <>
      <WhiteSpace />
      <PostCard {...normalPost} onClick={() => { handleClickPost(normalPost.id)}} />
    </>
  ))

  return (
    <div style={{width: '100vw'}}>
      {postCardsDOM}
    </div>
  )
}


export default connect(mapStateToProps)(Normal)
