import React from 'react'

import { Icon } from 'antd-mobile'

import styles from './CircleRadio.less'

/**
 * radio组件，原型有较好的提示性
 */

export interface IProps {
  className?: string
  checked?: boolean
}

const CircleRadio: React.FC<IProps> = props => {
  const {
    className: classNameProp,
    checked = false
  } = props

  const className = `${classNameProp} ${styles.root} ${checked === true && styles.checked}`

  return (
    <div className={className}>
    {
      checked === true &&(<Icon type='check' color='#fff' />)
    }
    </div>
  )
}

export default CircleRadio
