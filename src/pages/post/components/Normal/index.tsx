import React from 'react'

import { INormalPost } from '@/models/post'

import {
  WhiteSpace,
} from 'antd-mobile'

import PostCard from '@/components/PostCard'

interface IProps {
  normalPosts: INormalPost[]
}

const Normal: React.FC<IProps> = props => {
  const { normalPosts } = props

  const handleClickPost = (id: string) => {
    // console.log(id)
  }

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


export default Normal
