import React from 'react'
import {
  Tabs,
  WhiteSpace
} from 'antd-mobile'
import moment from 'moment'

import { getWeekday } from '@/utils/momentExtends'
import { IPostWork } from '../../selector'

import WorkContent from './WorkContent'

import styles from './infoWork.less'

export interface IProps {
  postWorks: IPostWork[]
}

interface ITbas {
  YYYYMMDD: string
  title: string
  month: string
}

const InfoWork: React.FC<IProps> = props => {
  const { postWorks } = props

  const today = `${moment().format('MM月DD日（')}` + `${getWeekday(moment())}）`

  const tabs: ITbas[] = postWorks.map(({ YYYYMMDD, title, month }) => ({
    YYYYMMDD,
    title,
    month
  }))

  /**
   * 设置显示的月份
   */
  const [month, setMonth] = React.useState('')

  const renderTabContent = (tab: ITbas) => {
    /**
     * 寻找合适的岗位信息，并加以渲染
     * 1.修改月份显示 2.渲染日期下的岗位信息
     */
    const postWork = postWorks.find((postWork) => postWork.YYYYMMDD === tab.YYYYMMDD) as IPostWork
    setMonth(postWork.month)
    return (
      <WorkContent type={postWork.workType} works={postWork.works} />
    )
  }

  return (
    <div>
      <div className={styles.todayTips}>
        <span className={styles.selectMonth}>{month}</span>
        <span className={styles.today}>今日： {today}</span>
      </div>
      <Tabs tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}>
        {renderTabContent}
      </Tabs>
    </div>
  )
}

export default InfoWork
