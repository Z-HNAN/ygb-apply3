import React from 'react'
import { connect } from 'dva'

import { Dispatch, AnyAction } from 'redux'

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
      <div className={styles.map}>
        <Map selectedId={depId} onClick={handleClick}/>
      </div>
    </div>
  )
}


export default Department
