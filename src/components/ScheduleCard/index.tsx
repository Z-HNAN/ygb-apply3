import React from 'react'
import { Card } from 'antd-mobile'

export interface OwnProps {
  time: string
  title: string
  department: string
}

const ScheduleCard: React.FC<OwnProps> = props => {
  const { time, title, department } = props

  return (
    <Card full>
      <Card.Header title={time} />
      <Card.Body>
        <div>{title}</div>
      </Card.Body>
      <Card.Footer extra={department} />
    </Card>
  )
}

export default ScheduleCard
