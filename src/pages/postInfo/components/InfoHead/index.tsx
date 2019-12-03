import React from 'react'

import {
  Tag,
} from 'antd-mobile'

import styles from './index.less'

export interface IProps {
  className?: string
  /**
   * 标题内容
   * tags 显示岗位的标签
   * contact 显示岗位负责人 
   */
  content: 'tags' | 'contact'
  department: string
  title: string
  tags?: string[]
  contactName?: string
  contactPhone?: number
}

const InfoHead: React.FC<IProps> = props => {
  const {
    className,
    content,
    tags = [],
    department,
    title,
    contactName,
    contactPhone,
  } = props

  const contentTags = (
    <div>
    {
      tags.map(text => (<Tag key={text} className={styles.tag} small>{text}</Tag>))}
    </div>
  )

  const contentContact = (
    <div>
      <span className={styles.contactName}>{contactName}</span>
      <span>{contactPhone}</span>
    </div>
  )

  const contentMaps = {
    'tags': contentTags,
    'contact': contentContact,
  }
  const avator = department.slice(0, 1)

  return (
    <div className={`${styles.root} ${className}`}>
      <div className={styles.avator}>
        {avator}
      </div>
      <div className={styles.description}>
        <div className={styles.title}>
          {title}
        </div>
        {contentMaps[content]}
      </div>
    </div>
  )
}

export default InfoHead
