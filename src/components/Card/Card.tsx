import React from 'react'

import { Card, WhiteSpace } from 'antd-mobile'


export interface IProps {
  name: string,
  email: string,
  website: string,
}

export const NameCard: React.FC<IProps> = props => {
  const { name, email, website } = props

  return (
    <div>
      <WhiteSpace size="lg" />
      <Card full={true}>
        <Card.Header
          title={name}
          thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
          extra={<span>{email}</span>}
        />
        <Card.Body>
          <div>{website}</div>
        </Card.Body>
      </Card>
    </div>
  )
}

