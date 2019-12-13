/**
 * 我的
 */
import React from 'react'
import { connect } from 'dva';
import router from 'umi/router'
import { IConnectState } from '@/models/connect.d'
import { Dispatch, AnyAction } from 'redux';

import {
  WhiteSpace,
  List,
} from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief

import styles from './index.less'

export interface OwnProps {
  dispatch: Dispatch<AnyAction>
}

const mapStateToProps = (state: IConnectState) => {
  return {

  }
}

const Me: React.FC<OwnProps> = props => {
  const {} = props

  return (
    <div className={styles.root}>
      <div className={styles.photo}>
        <div className={styles.photoBackground} />
        <div className={styles.photoImage} />
      </div>
      <div className={styles.info}>
        <div className={styles.studentName}>白勇</div>
        <div className={styles.studentID}>学号：17051636</div>
        <div className={styles.studentCollege}>学院：巴巴爸爸吧撒的撒多大杀四方</div>
      </div>
      <WhiteSpace />
      <List>
        <Item arrow="horizontal" onClick={() => { }}>反馈</Item>
        <Item arrow="horizontal" onClick={() => { }}>退出登录</Item>
      </List>
    </div>
  )
}

export default connect(mapStateToProps)(React.memo(Me))
