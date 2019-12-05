import React from 'react'

import { Button } from 'antd-mobile'
import { DepartmentName } from '../Map'

import styles from './index.less'

export interface OwnProps {
  /* 是否是2倍高度，大按钮，代表南北楼合并 */
  double?: boolean
  /* 显示的楼宇内容，为空则表示空白占位楼宇 */
  value?: DepartmentName
  /* 是否选中了该按钮 */
  checked?: boolean
  /* 按钮回调 */
  onClick?: () => void
}

const DepartmentButton: React.FC<OwnProps> = props => {
  const {
    double = false,
    value = {},
    checked = false,
    onClick,
  } = props

  /**
   * 按钮的样式
   */
  const {
    id = '',
    name = '',
    gender = 'other',
  } = value as DepartmentName

  const handleClick = () => {
    onClick && onClick()
  }

  return (
    <div
      className={`${styles.root} ${double === true && styles.double}`}
    >
      <Button
        onClick={handleClick}
        activeClassName={styles[`${gender}Active`]}
        className={`${styles.button} ${styles[gender]} ${checked === true && styles.active}`}
        size='small'
        children={name}
      />
    </div>
  )
}

export default DepartmentButton
