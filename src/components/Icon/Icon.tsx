import React from 'react'

/**
 * 自定义Icon
 */
export type IconType = string

export interface IconProps {
  type: IconType
  className?: string
  size?: 'xxs' | 'sm' | 'md' | 'lg'
}

export const Icon: React.FC<IconProps> = props => {
  const { type, className = '', size = 'md' } = props

  // other 如果需要透传

  return (
    <svg className={`am-icon am-icon-${size} am-icon-${type} ${className}`}>
      <use xlinkHref={`#icon-${type}`} />
    </svg>
  )
}

