import React from 'react'

import styles from './Progress.less'

/**
 * 进度条组件，展示一个小长方形框，自己填充
 */

export interface IProps {
  className?: string
  now: number
  total: number
}

export const Progress: React.FC<IPrps> = props => {
  const { className, now, total } = props

  // 计算百分比，自动覆盖长度
  const percent = Math.floor((now / total ) * 100)

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.progress} style={{width: `${percent}%`}}/>
      <div className={styles.content}>{now} / {total} 人</div>
    </div>
  )
}
