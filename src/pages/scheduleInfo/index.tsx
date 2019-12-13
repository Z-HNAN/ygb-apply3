import React from 'react'
import { connect } from 'dva';
import router from 'umi/router'
import { IConnectState } from '@/models/connect.d'
import {
  Button,
  Tabs,
  Toast,
  Modal,
} from 'antd-mobile'

import { ScheduleInfoType, scheduleInfoSelector } from './selector'

import InfoHead from '@/pages/postInfo/components/InfoHead'

import styles from './index.less'

export interface OwnProps {
  scheduleInfo: ScheduleInfoType
}

const tabs = [{ title: '岗位详情', sub: 'info' }, { title: '工作备注', sub: 'remark' }]

const mapStateToProps = (state: IConnectState) => {
  return {
    scheduleInfo: scheduleInfoSelector(state)
  }
}

const PostInfo: React.FC<OwnProps> = (props) => {

  const { scheduleInfo } = props
  const {
    title,
    avator,
    contactName,
    contactPhone,
  } = scheduleInfo

  return (
    <div className={styles.root}>
      <InfoHead
        className={styles.head}
        content='contact'
        title={title}
        avator={avator}
        contactName={contactName}
        contactPhone={contactPhone}
      />
      <div className={styles.body}>
        <Tabs tabs={tabs}>
          <div className={styles.tabContainerInfo} key='info'>
            <h2 className={styles.tabContainerTitle}>岗位详情</h2>
            <p
              className={styles.tabContainerParagraph}
              dangerouslySetInnerHTML={{ __html: scheduleInfo.content }}
            />
          </div>
          <div className={styles.tabContainerInfo} key='time'>
            <h2 className={styles.tabContainerTitle}>工作备注</h2>
            <p
              className={styles.tabContainerParagraph}
              dangerouslySetInnerHTML={{ __html: scheduleInfo.remark }}
            />
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(React.memo(PostInfo))
