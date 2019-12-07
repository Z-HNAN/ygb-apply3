import React from 'react'
import { connect } from 'dva'
import { IConnectState } from '@/models/connect.d'
import { Dispatch, AnyAction } from 'redux'

import {
  WhiteSpace,
} from 'antd-mobile'
import Map from './components/Map'

import styles from './index.less'

interface OwnProps {
  dispatch: Dispatch
}

const mapStateToProps = (state: IConnectState) => {
  return {

  }
}

const Apartment: React.FC<OwnProps> = props => {
  const {
    dispatch,
  } = props

  const [aptId, setAptId] = React.useState('18')

  const handleClick = (id: string) => {
    setAptId(id)
    dispatch({ type: 'post/initApartmentPost' , payload: { apartmentId: id }})
  }

  /* 挂载组建后，拉取所有的公寓中心岗位 */
  React.useEffect(() => {
    dispatch({ type: 'post/initApartmentPost' , payload: { apartmentId: aptId }})
  }, [])

  return (
    <div className={styles.root}>
      <WhiteSpace />
      <div className={styles.map}>
        <Map selectedId={aptId} onClick={handleClick}/>
      </div>
      <WhiteSpace />
      <div className={styles.info}>
        info
      </div>
    </div>
  )
}


export default connect(mapStateToProps)(Apartment)
