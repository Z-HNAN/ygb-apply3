import React from 'react'
import {
  Tabs,
  WhiteSpace
} from 'antd-mobile'
import moment from 'moment'

import { getWeekday } from '@/utils/momentExtends'

import WorkContent from './WorkContent'

import styles from './infoWork.less'

export interface IProps {

}

interface ITbas {
  title: string
  workId: string
}

const InfoWork: React.FC<IProps> = props => {
  const {} = props

  const today = `${moment().format('MM月DD日（')}` + `${getWeekday(moment())}）`

  const tabs: ITbas[] = [
    { title: '17号（周二）', workId: '1' },
    { title: '18号（周三）', workId: '2'  },
    { title: '19号（周四）', workId: '3'  }
  ]

  const renderTabContent = (tab: ITbas) => (
    <div>
      <WorkContent />
    </div>
  )

  return (
    <div>
      <div className={styles.todayTips}>
        <span className={styles.selectMonth}>6月</span>
        <span className={styles.today}>今日： {today}</span>
      </div>
      <Tabs tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}>
        {renderTabContent}
      </Tabs>
    </div>
  )
}

export default InfoWork
