/**
 * 在pullToRefresh中，会出现刷新时距离，底部被覆盖的问题。
 * 这里模拟加入子元素高度，撑开一部分高度。在下拉刷新时，这一部分会被隐藏(对用户来说不可见)
 * 60px高度，与全局的pullToRefresh高度一致
 */
import React from 'react'

export interface OwnProps {
  height?: number
}

export default ({ height = 60 }: OwnProps) => <div style={{ height }} />
