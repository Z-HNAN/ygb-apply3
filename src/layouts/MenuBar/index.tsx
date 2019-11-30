/*
 * @Author: Jan-superman 
 * @Date: 2018-10-09 15:37:17 
 * @Last Modified by: superman
 * @Last Modified time: 2018-12-24 23:26:50
 */

import React, { PureComponent } from 'react';
import { TabBar } from 'antd-mobile';
import Router from 'umi/router';
import Icon from '@/components/Icon'


import styles from './index.less'

export interface ITabBar {
  title: string
  icon: string
  selectedIcon: string
  link: string
}

const tabBarData: ITabBar[] = [
  {
    title: '岗位',
    icon: 'container',
    selectedIcon: 'container',
    link: '/post',
  },
  {
    title: '计划',
    icon: 'calendar',
    selectedIcon: 'calendar',
    link: '/schedule',
  },
  {
    title: '我的',
    icon: 'user',
    selectedIcon: 'user',
    link: '/me',
  },
]

interface IProps {
  pathname: string
  [porpName: string]: any
}

// {children.props.location.pathname === link && children}

const MenuBar: React.FC<IProps> = props => {
  const { pathname = '/post', children } = props
  return (
    <TabBar>
      {tabBarData.map(({ title, icon, selectedIcon, link }) => (
        <TabBar.Item
          key={link}
          title={title}
          icon={<Icon className={styles.tabBarIcon} type={icon} />}
          selectedIcon={<Icon className={styles.tabBarIcon} type={selectedIcon} />}
          selected={pathname === link}
          onPress={() => Router.push(`${link}`)}
        >
          {/* 匹配到的children路由进行渲染 */}
          {children}
        </TabBar.Item>
      ))}
    </TabBar>
  )
}

export default MenuBar;
