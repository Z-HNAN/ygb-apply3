import React from 'react'
import moment, { Moment } from 'moment'

import {
  Card,
  Tag,
} from 'antd-mobile'

import Icon from '../Icon'

import { getWeekday } from '@/utils/momentExtends'

import styles from './PostCard.less'

export interface IProps {
  /* 招工标题 */
  title: string
  /* 开始结束日期 timestamp */
  startDate: number
  endDate: number
  /* 报名人数/总人数 */
  nowCount: number
  totalCount: number
  /* 所属标签 */
  tags: string[]

  /* 回调函数 */
  onClick?: () => void
}

const processWeekDate = (startDate: number, endDate: number): string => {
  const start = moment(startDate)
  const end = moment(endDate)

  const getDate = (moment: Moment): string => moment.format('MM.DD')
  return `工作日期 ${getDate(start)}（${getWeekday(start)}）— ${getDate(end)}（${getWeekday(end)}）`
}

export const PostCard: React.FC<IProps> = props => {
  const {
    title,
    startDate,
    endDate,
    nowCount,
    totalCount,
    tags,
    onClick,
  } = props

  const titleDOM = (
    <div className={styles.cardTitle}>
      {title}
    </div>
  )

  const content = processWeekDate(startDate, endDate)

  const handleClick = () => {
    onClick && onClick()
  }

  const footDOM = (
    <div className={styles.cardFoot}>
      <div>
        报名人数 {`${nowCount} / ${totalCount}`}
      </div>
      <div>
      {
        tags.map(text => (<Tag key={text} className={styles.cardFootTag} small>{text}</Tag>))}
      </div>
    </div>
  )

  return (
    <Card full onClick={handleClick}>
      <Card.Header title={titleDOM} />
      <Card.Body>{content}</Card.Body>
      <Card.Footer content={footDOM}/>
    </Card>
  )
}

