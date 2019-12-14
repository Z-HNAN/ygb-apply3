import React from 'react'

import {
  List,
  InputItem,
  WhiteSpace,
  Button,
  Switch,
  Modal,
} from 'antd-mobile'

import Icon from '@/components/Icon'

import { connect } from 'dva'
import { Dispatch, AnyAction } from 'redux'
import { IConnectState } from '@/models/connect.d'
import { StudentType } from '@/models/global'

import styles from './index.less'

export interface OwnProps {
  student: StudentType
  workId: string | null
}

const handleOpenRememberPhoneTips = () => {
  Modal.alert('Tips', '为保护您的隐私，手机号仅存储在您的手机上。')
}
/* 检测手机号格式 */
const detectPhone = (phone: string) => {
  return /^[1]([3-9])[0-9]{9}$/.test(phone)
}
/* 恢复手机号333 4444 4444 的格式 */
const addFormatPhone = (phone: string) => {
  return `${phone.slice(0, 3)} ${phone.slice(3, 7)} ${phone.slice(7, 11)}`
}
/* 清除手机号格式333 4444 4444 的格式 */
const clearFormatPhone = (phone: string) => {
  return phone.replace(/\s/g, '')
}


const mapStateToProps = (state: IConnectState) => {
  return {
    student: state.global.student,
    workId: state.postInfo.selectWorkId,
  }
}

const Apply: React.FC<OwnProps> = props => {
  const { student, workId } = props

  /**
   * 手机号相关
   */
  const [phone, setPhone] = React.useState(student.studentPhone)
  const [phoneHasError, setPhoneHasError] = React.useState(detectPhone(phone) === false)
  const handleChangePhone = (phone: string) => {
    if (/^[1]([3-9])[0-9]{9}$/.test(phone.replace(/\s/g, '')) === false) {
      setPhoneHasError(true)
    } else {
      setPhoneHasError(false)
    }
    setPhone(phone)
  }
  const [rememberPhone, setRememberPhone] = React.useState(Boolean(student.studentPhone))

  /**
   * 处理报名
   */
  const handleApply = () => {
    // 选择工作异常
    if (workId === null || workId.trim() === '') {
      Modal.alert('Tips', '数据异常，请回到岗位大厅重新选择。')
      return
    }
    // 手机号码异常
    if (phoneHasError === true) {
      Modal.alert('Tips', '手机号格式不对，请检查您输入的手机号。')
      return
    }

    // 报名
    
  }

  return (
    <div className={styles.root}>
      <div className={styles.title}><span>确认报名</span></div>
      <div className={styles.form}>
        <List>
          <InputItem value={student.studentName} disabled >姓名</InputItem>
          <InputItem value={student.studentId} disabled >学号</InputItem>
          <InputItem value={student.studentCollege} disabled >学院</InputItem>
          {/* 表单中的手机号均是有格式的 333 4444 4444 */}
          <InputItem
            value={addFormatPhone(phone)}
            type="phone"
            onChange={(phone) => { handleChangePhone(clearFormatPhone(phone)) }}
            error={phoneHasError}
          >
            手机号码
          </InputItem>
          <List.Item
            extra={<Switch checked={rememberPhone} color='#01a5ed' onChange={() => { setRememberPhone(!rememberPhone) }} />}
          >
            <div className={styles.rememberPhone}>
              {/* 记住手机号<Icon type='question' className={styles.rememberPhoneIcon} onClick={handleOpenRememberPhoneTips} /> */}
              记住手机号
            </div>
          </List.Item>
        </List>
      </div>
      <WhiteSpace />
      <div className={styles.tips}>
        注意：一旦报名成功后，不可随意取消，如遇到特殊情况，请联系义工部同学进行后台取消。
      </div>
      <WhiteSpace />
      <Button
        className={styles.button}
        type='primary'
        onClick={handleApply}
      >
         确认报名
      </Button>
    </div>
    
  )
}

export default connect(mapStateToProps)(Apply)
