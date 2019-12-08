/**
 * 自动带上下10px的加载状态条
 */

import React from 'react'
import { ActivityIndicator } from 'antd-mobile'

export interface OwnProps {
  show: boolean
  text: string
}

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '10px',
}

const Indicator: React.FC<OwnProps> = props => {
  const { show, text } = props

  if (show === false) {
    return null
  }

  return (
    <div style={styles}>
      <ActivityIndicator text={text} />
    </div>
  )
}

export default Indicator
