import React from 'react'
import { Card } from 'antd-mobile'

export interface OwnProps {
  time: string
  title: string
  department: string
  onClick?: () => void
}

const ScheduleCard: React.FC<OwnProps> = props => {
  const { time, title, department, onClick } = props

  const handleClick = () => {
    onClick && onClick()
  }

  return (
    <Card full onClick={handleClick}>
      <Card.Header title={time} />
      <Card.Body>
        <div>{title}</div>
      </Card.Body>
      <Card.Footer extra={department} />
    </Card>
  )
}

export default ScheduleCard
