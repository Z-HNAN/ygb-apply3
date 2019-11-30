import React from 'react'

import { INormalPost } from '@/models/post'

import {
  Card,
  WhiteSpace,
} from 'antd-mobile'

interface IProps {
  normalPosts: INormalPost[]
}

const Normal: React.FC<IProps> = props => {
  const { normalPosts } = props

  return (
    <div>
    {
      normalPosts.map(normalPost => (
        <>
          <WhiteSpace />
          <Card>{normalPost.department}</Card>
        </>
      ))
    }
    </div>
  )
}


export default Normal
