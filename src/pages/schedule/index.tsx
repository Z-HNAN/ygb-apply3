/**
 * 计划
 */

import React from 'react'
import { Tabs, WhiteSpace, PullToRefresh } from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky'
import { connect } from 'dva';
import router from 'umi/router'
import { IConnectState } from '@/models/connect.d'
import { Dispatch, AnyAction } from 'redux';

import RefreshSafeFooter from '@/components/RefreshSafeFooter'
import ScheduleCard from '@/components/ScheduleCard'
import {
  ScheduleCardType,
  allScheduleSelector,
  waitingScheduleSelector,
  workingScheduleSelector,
  finishScheduleSelector,
} from './selector'

import styles from './index.less'

export interface OwnProps {
  dispatch: Dispatch
  loading: boolean
  allSchedule: ScheduleCardType[]
  waitingSchedule: ScheduleCardType[]
  workingSchedule: ScheduleCardType[]
  finishSchedule: ScheduleCardType[]
}

const mapStateToProps = (state: IConnectState) => {
  return {
    loading: state.loading.models.schedule,
    allSchedule: allScheduleSelector(state),
    waitingSchedule: waitingScheduleSelector(state),
    workingSchedule: workingScheduleSelector(state),
    finishSchedule: finishScheduleSelector(state),
  }
}

function renderTabBar(props: any) {
  return (
  <Sticky>
    {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
  </Sticky>)
}

const tabs = [
  { title: '全部', key: 'all' },
  { title: '已报名', key: 'waiting' },
  { title: '进行中', key: 'working' },
  { title: '已结束', key: 'finish' },
]

const Schedule: React.FC<OwnProps> = props => {
  const {
    dispatch,
    loading,
    allSchedule,
    waitingSchedule,
    workingSchedule,
    finishSchedule,
  } = props

  /**
   * 拉动刷新数据
   */
  const handleRefresh = () => {
    dispatch({ type: 'schedule/fetchApplyList' , payload: {} })
  }

  /**
   * 查看岗位详情
   */
  const handleScheduleInfo = (id: string) => {
    dispatch({ type: 'schedule/changeScheduleId', payload: { scheduleId: id } })
    router.push('/scheduleInfo')
  }

  /**
   * 渲染计划安排，如果长度为0，展示没有更多记录
   */
  const renderSchedules = (schedules: ScheduleCardType[]) => {
    let contentDOM = null

    if (schedules.length === 0) {
      contentDOM = (<div className={styles.empty}>没有更多记录了...</div>)
    } else {
      contentDOM = schedules.map((scheduleCard) => (
        <React.Fragment key={scheduleCard.id}>
          <WhiteSpace />
          <ScheduleCard {...scheduleCard} onClick={handleScheduleInfo.bind(null, scheduleCard.id)}/>
        </React.Fragment>
      ))
    }

    return (
      <PullToRefresh
        className={styles.refresh}
        damping={60}
        direction='down'
        refreshing={loading}
        onRefresh={handleRefresh}
      >
        {contentDOM}
        <RefreshSafeFooter />
      </PullToRefresh>
    )
  }

  return (
    <StickyContainer>
      <Tabs
        tabs={tabs}
        renderTabBar={renderTabBar}
      >
        <div key='all' children={renderSchedules(allSchedule)} />
        <div key='waiting' children={renderSchedules(waitingSchedule)} />
        <div key='working' children={renderSchedules(workingSchedule)} />
        <div key='finish' children={renderSchedules(finishSchedule)} />
      </Tabs>
    </StickyContainer>
  )
}

export default connect(mapStateToProps)(Schedule)
