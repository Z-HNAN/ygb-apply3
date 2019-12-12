/**
 * 岗位大厅
 */

import React from 'react'
import { connect } from 'dva'
import { IConnectState } from '@/models/connect.d'
import { Dispatch, AnyAction } from 'redux'
import { StickyContainer, Sticky } from 'react-sticky'
import {
  Button,
  Tabs,
} from 'antd-mobile'

import AparmentComponent from './components/Apartment'
import NormalComponent from './components/Normal'

import styles from './index.less'

interface IProps {
  dispatch: Dispatch
  apartmentId: string

}

const tabs = [
  { title: '普通岗位', key: 'normal' },
  { title: '公寓中心', key: 'apartment' },
]

const mapStateToProps = (state: IConnectState) => {
  const apartmentId = state.postInfo.apartmentId
  return {
    apartmentId
  }
}

const Post: React.FC<IProps> = props => {
  const {
    dispatch,
    apartmentId,
  } = props

  /**
   * 切换路由初始化页面数据
   */
  const handleChangeTab = (tab: any) => {
    const key = tab.key as string
    if (key === 'normal') {
      dispatch({ type: 'post/initNormalPost', payload: {} })
    } else if (key === 'apartment') {
      dispatch({ type: 'post/initApartmentPost', payload: { apartmentId } })
    }
  }

  function renderTabBar(props: any) {
    return (
      <Sticky>
        {({ style }) => <div style={{...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
      </Sticky>
    )
  }

  return (
    <div>
      <StickyContainer>
        <Tabs
          tabs={tabs}
          renderTabBar={renderTabBar}
          onChange={handleChangeTab}
        >
          <div className={styles.tabsContainer} key='normal'>
            <NormalComponent />
          </div>
          <div className={styles.tabsContainer} key='apartment'>
            <AparmentComponent />
          </div>
        </Tabs>
      </StickyContainer>
    </div>
  )
}

export default connect(mapStateToProps)(React.memo(Post))
