/**
 * 我的
 */
import React from 'react'
import { connect } from 'dva';
import router from 'umi/router'
import { IConnectState } from '@/models/connect.d'
import { Dispatch, AnyAction } from 'redux';
import { StudentType } from '@/models/global'

import {
  WhiteSpace,
  List,
} from 'antd-mobile'
const Item = List.Item

import styles from './index.less'

export interface OwnProps {
  dispatch: Dispatch<AnyAction>
  student: StudentType
}

const mapStateToProps = (state: IConnectState) => {
  return {
    student: state.global.student
  }
}

const Me: React.FC<OwnProps> = props => {
  const { student } = props

  return (
    <div className={styles.root}>
      <div className={styles.photo}>
        <div className={styles.photoBackground} />
        <div className={styles.photoImage} />
      </div>
      <div className={styles.info}>
        <div className={styles.studentName}>{student.studentName}</div>
        <div className={styles.studentID}>学号：{student.studentPhone}</div>
        <div className={styles.studentCollege}>学院：{student.studentCollege}</div>
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
