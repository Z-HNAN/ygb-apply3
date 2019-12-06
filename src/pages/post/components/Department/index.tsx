import React from 'react'
import { connect } from 'dva'

import { Dispatch, AnyAction } from 'redux'
import {
  WhiteSpace,
} from 'antd-mobile'
import Map from './components/Map'

import styles from './index.less'

interface IProps {

}

const Department: React.FC<IProps> = props => {
  const { } = props

  const [depId, setDepId] = React.useState('')

  const handleClick = (id: string) => {
    setDepId(id)
  }

  return (
    <div className={styles.root}>
      <WhiteSpace />
      <div className={styles.map}>
        <Map selectedId={depId} onClick={handleClick}/>
      </div>
      <WhiteSpace />
      <div className={styles.info}>
        info
      </div>
    </div>
  )
}


export default Department
