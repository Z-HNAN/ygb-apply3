import React from 'react'
import moment, { Moment } from 'moment'
import {
  Icon,
  Radio,
} from 'antd-mobile'
import Progress from '@/components/Progress'
import CircleRadio from '@/components/CircleRadio'

import styles from './WorkContent.less'

/**
 * 单个工作项组件
 * 内部使用
 */
interface IWorkItem {
  displayTime: string
  nowCount: number
  totalCount: number
  checked: boolean
  reamark: string
}

/**
 * 工作项组件
 */
const Work: React.FC<IWorkItem> = props => {
  const {
    displayTime,
    nowCount,
    totalCount,
    checked,
    reamark,
  } = props

  return (
    <div className={styles.work}>
      <div className={styles.main}>
        <div className={styles.workTime}>{displayTime}</div>
        <div className={styles.workOption}>
          <Progress className={styles.workProgress} now={nowCount} total={totalCount} />
          <CircleRadio checked={checked} className={styles.workRadio}/>
        </div>
      </div>
      <div className={styles.remark}>{reamark}</div>
    </div>
  )
}

export interface IWork {
  /* 开始结束时间均为时间戳 */
  workId: string
  startTime: number
  endTime: number
  nowCount: number
  totalCount: number
  reamark: string
} 

export interface IProps {
  works: IWork[]
}

/**
 * 显示为最终展示的时间
 * 9:00 — 13:00
 */
function displayAccurateTime(startTime: number, endTime: number): string {
  const formatTime = (time: Moment): string => {
    return time.format('HH:mm')
  }

  return `${formatTime(moment(startTime))} — ${formatTime(moment(endTime))}`
}

const WorkContent: React.FC<IProps> = props => {
  const { works } = props

  return (
    <div className={styles.root}>
    {
      works.map(work => (
      <Work
        displayTime={displayAccurateTime(work.startTime, work.endTime)}
        nowCount={work.nowCount}
        totalCount={work.totalCount}
        checked={false}
        reamark={work.reamark}
      />
      ))
    }
    </div>
  )
}

export default WorkContent
