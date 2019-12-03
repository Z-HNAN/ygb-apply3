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

import styles from './index.less'

export interface OwnProps {

}

const mapStateToProps = (state: IConnectState) => {

}

const Apply: React.FC<OwnProps> = props => {

  const handleOpenRememberPhoneTips = () => {
    Modal.alert('Tips', '为保护您的隐私，手机号仅存储在您的手机上。')
  }

  /**
   * 手机号相关
   */
  const [phone, setPhone] = React.useState()
  const [phoneHasError, setPhoneHasError] = React.useState(true)
  const handleChangePhone = (phone: string) => {
    /* 检验手机号是否正确,注意表单中的数值是有空格的xxx xxxx xxxx */
    if (/^[1]([3-9])[0-9]{9}$/.test(phone.replace(/\s/g, '')) === false) {
      setPhoneHasError(true)
    } else {
      setPhoneHasError(false)
    }
    setPhone(phone)
  }
  return (
    <div className={styles.root}>
      <div className={styles.title}><span>确认报名</span></div>
      <div className={styles.form}>
        <List>
          <InputItem value="studentName" disabled >姓名</InputItem>
          <InputItem value="studentId" disabled >学号</InputItem>
          <InputItem value="studentCollege" disabled >学院</InputItem>
          <InputItem
            value={phone}
            type="phone"
            onChange={handleChangePhone}
            error={phoneHasError}
          >
            手机号码
          </InputItem>
          <List.Item
            extra={<Switch checked={false} onChange={() => {}} />}
          >
            <div className={styles.rememberPhone}>
              记住手机号<Icon type='question' className={styles.rememberPhoneIcon} onClick={handleOpenRememberPhoneTips} />
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
      >
         确认报名
      </Button>
    </div>
    
  )
}

export default connect(mapStateToProps)(Apply)
