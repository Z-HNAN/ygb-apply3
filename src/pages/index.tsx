import React from 'react';
import CustomIcon from '@/components/Icon'
import { Button, Icon, Grid } from 'antd-mobile';
import styles from './index.less'


export default function() {
  return (
    <div>
      <div className={styles.box}>
        <h1>123456</h1>
        <CustomIcon type='add' size='lg' className={styles['am-icon-add']}/>  
      </div>
    </div>
  )
}
