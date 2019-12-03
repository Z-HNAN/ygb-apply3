import React from 'react'
import { StickyContainer, Sticky } from 'react-sticky'

import {
  Button,
  Tabs,
  Toast,
  Modal,
} from 'antd-mobile'

import { IPostInfo } from './selector'

import InfoHead from './components/InfoHead'
import InfoWork from './components/InfoWork'
import Apply from './components/Apply'

import styles from './postInfo.less'

export interface IProps {
  loading: boolean
  applyAble: boolean
  postInfo: IPostInfo
}

const tabs = [{title: '岗位详情', sub: 'info'},{title: '时间安排', sub: 'time'}]

const PostInfo: React.FC<IProps> = (props) => {

  const { loading, applyAble, postInfo } = props

  const [applyVisible, setApplyVisible] = React.useState(false)

  if (loading === true) {
    Toast.loading('加载中...', 0)
  } else {
    Toast.hide()
  }

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
        department={postInfo.department}
        title={postInfo.title}
        tags={postInfo.tags}
      />
      <div className={styles.body}>
        <StickyContainer>
          <Tabs tabs={tabs} renderTabBar={renderTabBar}>
            <div className={styles.tabContainerInfo} key='info'>
              <h2 className={styles.tabContainerTitle}>岗位详情</h2>
              <p className={styles.tabContainerParagraph}>
                {postInfo.content}
              </p>
            </div>
            <div className={styles.tabContainerTime} key='time'>
              <InfoWork postWorks={postInfo.postWorks} />
            </div>
          </Tabs>
        </StickyContainer>
      </div>
      <div className={styles.foot}>
        <Button
          className={styles.button}
          type='primary'
          disabled={applyAble === false}
          onClick={setApplyVisible.bind(null, true)}
        >
           立即报名
        </Button>
      </div>
      <Modal
        popup
        visible={applyVisible}
        animationType='slide-up'
        onClose={setApplyVisible.bind(null, false)}
        afterClose={setApplyVisible.bind(null, false)}
      >
        <Apply />
      </Modal>
    </div>
  )
}

export default PostInfo
