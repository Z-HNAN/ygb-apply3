import React from 'react'
import { StickyContainer, Sticky } from 'react-sticky'

import {
  Button,
  Tabs,
} from 'antd-mobile'

import InfoHead from './components/InfoHead'
import InfoWork from './components/InfoWork'

import styles from './postInfo.less'

export interface IProps {

}

const tabs = [{title: '岗位详情', sub: 'info'},{title: '时间安排', sub: 'time'}]

const PostInfo: React.FC<IProps> = (props) => {

  /* 渲染岗位详情的吊顶 */
  const renderTabBar = (props: any) => (
    <Sticky>
      {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>
  )

  return (
    <div className={styles.root}>
      <InfoHead
        className={styles.head}
        content='tags'
        department='义务工作发展部'
        title='保卫处招募交通志愿者'
        tags={['助工', '时间灵活']}
      />
      <div className={styles.body}>
        <StickyContainer>
          <Tabs tabs={tabs} renderTabBar={renderTabBar}>
          {/*

            <div className={styles.tabContainerInfo} key='info'>
              <h2 className={styles.tabContainerTitle}>岗位详情</h2>
              <p className={styles.tabContainerParagraph}>
                postConent
              </p>
            </div>
          */}
            
            <div className={styles.tabContainerTime}  key='time'>
              <InfoWork />
            </div>
          </Tabs>
        </StickyContainer>
      </div>
      <div className={styles.foot}>
        <Button className={styles.button} type='primary'>立即报名</Button>
      </div>
    </div>
  )
}

export default PostInfo
