/*
 * @Author: Jan-superman 
 * @Date: 2018-10-09 15:37:17 
 * @Last Modified by: superman
 * @Last Modified time: 2018-12-24 23:26:50
 */

import React, { PureComponent } from 'react';
import { TabBar } from 'antd-mobile';
import Router from 'umi/router';
import PropTypes from 'prop-types';
import Icon from '@/components/Icon'
import theme from '@/theme';

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
    icon: 'add',
    selectedIcon: 'add',
    link: '/post',
  },
  {
    title: '计划',
    icon: 'add',
    selectedIcon: 'add',
    link: '/schedule',
  },
  {
    title: '我的',
    icon: 'add',
    selectedIcon: 'add',
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
