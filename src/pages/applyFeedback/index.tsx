import React from 'react'
import router from 'umi/router'
import { connect } from 'dva'
import { Dispatch, AnyAction } from 'redux';
import { IConnectState } from '@/models/connect.d'
import { ApplyFeedbackType } from '@/models/postInfo'
import { Result, Icon, Button } from 'antd-mobile'

import styles from './index.less'

export interface OwnProps {
  dispatch: Dispatch<AnyAction>
  applyFeedback: ApplyFeedbackType
}


const mapStateToProps = (state: IConnectState) => {
  return {
    applyFeedback: state.postInfo.applyFeedback
  }
}

const ApplyFeedback: React.FC<OwnProps> = props => {
  const { dispatch, applyFeedback } = props
  const { show, msg, type} = applyFeedback

  /**
   * 报名成功
   */
  const handleApplySuccessAction = () => {
    // 返回计划安排
    router.push('/schedule')
  }

  /**
   * 报名失败
   */
  const handleApplyErrorAction = () => {
    // 返回岗位大厅
    router.push('/post')
  }

  /**
   * 初始化，检测是否可见,由于刷新造成的
   */
  React.useEffect(() => {
    if (show === false) {
      router.push('/post')
    }

    // 页面退出，删除页面数据
    return () => {
      dispatch({ type: 'postInfo/clearFeedback' })
    }
  }, [])

  let resultDOM = null
  // 报名成功
  if (type === 'success') {
    resultDOM = (
      <React.Fragment>
        <Result
          img={<Icon type="check-circle" className={styles.icon} style={{ fill: '#01a5ed' }} />}
          title="报名成功"
          message={msg}
        />
        <Button className={styles.button} type="primary" onClick={handleApplySuccessAction}>返回计划安排</Button>
      </React.Fragment>
    )
  }

  // 报名失败
  if (type === 'error') {
    resultDOM = (
      <React.Fragment>
        <Result
          img={< Icon type="cross-circle-o" className={styles.icon} style={{ fill: '#F13642' }} />}
          title="报名失败"
          message={msg}
        />
        <Button className={styles.button} type="primary" onClick={handleApplyErrorAction}>返回岗位大厅</Button>
      </React.Fragment>
    )
  }

  return (
    <div className={styles.root}>
      {resultDOM}
    </div>
  )
}

export default connect(mapStateToProps)(ApplyFeedback)

