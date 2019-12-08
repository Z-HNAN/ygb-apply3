import React from 'react'
import { connect } from 'dva'
import { Dispatch, AnyAction } from 'redux'
import { IConnectState } from '@/models/connect.d'
import moment, { Moment } from 'moment'
import {
  Icon,
  Radio,
} from 'antd-mobile'
import Progress from '@/components/Progress'
import CircleRadio from '@/components/CircleRadio'

import { ApartmentWorkType, NormalWorkType } from '@/models/post'

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
  disabled: boolean
  remark: string
  onClick: () => void
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
    disabled,
    remark,
    onClick,
  } = props

  return (
    <div className={styles.work} onClick={onClick}>
      <div className={styles.main}>
        <div className={styles.workTime}>{displayTime}</div>
        <div className={styles.workOption}>
          <Progress className={styles.workProgress} now={nowCount} total={totalCount} />
          <CircleRadio checked={checked} disabled={disabled} className={styles.workRadio}/>
        </div>
      </div>
      <div className={styles.remark}>{remark}</div>
    </div>
  )
}

export interface IProps {
  dispatch: Dispatch<AnyAction>
  selectWorkId: string | null
  type: 'normal' | 'apartment'
  works: ApartmentWorkType[] | NormalWorkType[]
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
  const {
    dispatch,
    type,
    works,
    selectWorkId,
  } = props

  function handleClick(workId: string, disabled: boolean) {
    if (disabled === true) { return }
    dispatch({ type: 'postInfo/selectWork', payload: { workId }})
  }

  /**
   * 根据不同类型的type渲染不同的工作信息
   * apartment->公寓中心岗位
   * normal->普通岗位
   */

  // 此时是apartment类型的work
  if (type === 'apartment') {
    return (
      <div className={styles.root}>
        {
          (works as ApartmentWorkType[]).map(work => (
            <Work
              key={work.id}
              displayTime={work.descriptionTime}
              nowCount={work.nowCount}
              totalCount={work.totalCount}
              checked={selectWorkId === work.id}
              disabled={work.nowCount >= work.totalCount}
              remark={work.remark}
              onClick={handleClick.bind(null, work.id, work.nowCount >= work.totalCount)}
            />
          ))
        }
      </div>
    )
  }

  // 此时是normal类型的work
  return (
    <div className={styles.root}>
      {
        (works as NormalWorkType[]).map(work => (
          <Work
            key={work.id}
            displayTime={displayAccurateTime(work.startTime, work.endTime)}
            nowCount={work.nowCount}
            totalCount={work.totalCount}
            checked={selectWorkId === work.id}
            disabled={work.nowCount >= work.totalCount}
            remark={work.remark}
            onClick={handleClick.bind(null, work.id, work.nowCount >= work.totalCount)}
          />
        ))
      }
    </div>
  )
}

const mapStateToProps = (state: IConnectState) => {
  const { selectWorkId } = state.postInfo
  return {
    selectWorkId,
  }
}

export default connect(mapStateToProps)(WorkContent)
