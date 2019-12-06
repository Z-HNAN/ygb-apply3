/**
 * 所有教学楼的模拟地图分布
 */
import React from 'react'
import { Button, WhiteSpace } from 'antd-mobile'
import AptBtn from '../ApartmentButton'
import styles from './index.less'

export interface ApartmentName {
  id: string
  name: string
  gender: 'male' | 'female'
}

export const apartmentNames: { [apartmentNameId: string]: ApartmentName } = {
  '18': { id: '18', name: '18#', gender: 'male' },
  '16': { id: '16', name: '16#', gender: 'male' },
  '15': { id: '15', name: '15#', gender: 'male' },
  '14': { id: '14', name: '14#', gender: 'male' },
  '13': { id: '13', name: '13#', gender: 'male' },
  '32': { id: '32', name: '32#', gender: 'female' },
  '21': { id: '21', name: '21#', gender: 'male' },
  '22': { id: '22', name: '22#', gender: 'male' },
  '12': { id: '12', name: '12#', gender: 'male' },
  '11': { id: '11', name: '11#', gender: 'male' },
  '10': { id: '10', name: '10#', gender: 'male' },
  '31': { id: '31', name: '31#', gender: 'female' },
  '30': { id: '30', name: '30#', gender: 'female' },
  '8': { id: '8', name: '8#', gender: 'male' },
  '6': { id: '6', name: '6#', gender: 'male' },
  '5': { id: '5', name: '5#', gender: 'male' },
  '29': { id: '29', name: '29#', gender: 'female' },
  '28': { id: '28', name: '28#', gender: 'male' },
  '4': { id: '4', name: '4#', gender: 'male' },
  '3': { id: '3', name: '3#', gender: 'male' },
  '2': { id: '2', name: '2#', gender: 'male' },
  '27': { id: '27', name: '27#', gender: 'male' },
}

export interface OwnProps {
  selectedId?: string
  onClick?: (id: string) => void
}

const Map: React.FC<OwnProps> = props => {

 const {
   selectedId,
   onClick,
 } = props

 const handleClick = (id: string) => {
   onClick && onClick(id)
 }
 
 return (
  <div className={styles.root}>
    <div className={styles.line18to32}>
      <AptBtn value={apartmentNames['18']} onClick={handleClick.bind(null, '18')} checked={selectedId === '18'} />
      <AptBtn value={apartmentNames['16']} onClick={handleClick.bind(null, '16')} checked={selectedId === '16'} />
      <AptBtn value={apartmentNames['15']} onClick={handleClick.bind(null, '15')} checked={selectedId === '15'} />
      <AptBtn value={apartmentNames['14']} onClick={handleClick.bind(null, '14')} checked={selectedId === '14'} />
      <AptBtn value={apartmentNames['13']} onClick={handleClick.bind(null, '13')} checked={selectedId === '13'} />
      <AptBtn value={apartmentNames['32']} onClick={handleClick.bind(null, '32')} checked={selectedId === '32'} />
    </div>
    <div className={styles.line21to30}>
      <div className={styles.doubleApartment}>
        <AptBtn value={apartmentNames['21']} onClick={handleClick.bind(null, '21')} checked={selectedId === '21'} />
        <AptBtn value={apartmentNames['22']} onClick={handleClick.bind(null, '22')} checked={selectedId === '22'} />
      </div>
      <AptBtn double value={apartmentNames['12']} onClick={handleClick.bind(null, '12')} checked={selectedId === '12'} />
      <AptBtn double value={apartmentNames['11']} onClick={handleClick.bind(null, '11')} checked={selectedId === '11'} />
      <AptBtn double value={apartmentNames['10']} onClick={handleClick.bind(null, '10')} checked={selectedId === '10'} />
      <AptBtn double />
      <div className={styles.doubleApartment}>
        <AptBtn value={apartmentNames['31']} onClick={handleClick.bind(null, '31')} checked={selectedId === '31'} />
        <AptBtn value={apartmentNames['30']} onClick={handleClick.bind(null, '30')} checked={selectedId === '30'} />
      </div>
    </div>
    <div className={styles.line8to28}>
      <AptBtn double />
      <AptBtn double value={apartmentNames['8']} onClick={handleClick.bind(null, '8')} checked={selectedId === '8'} />
      <AptBtn double value={apartmentNames['6']} onClick={handleClick.bind(null, '6')} checked={selectedId === '6'} />
      <AptBtn double value={apartmentNames['5']} onClick={handleClick.bind(null, '5')} checked={selectedId === '5'} />
      <AptBtn double />
      <div className={styles.doubleApartment}>
        <AptBtn value={apartmentNames['29']} onClick={handleClick.bind(null, '29')} checked={selectedId === '29'} />
        <AptBtn value={apartmentNames['28']} onClick={handleClick.bind(null, '28')} checked={selectedId === '28'} />
      </div>
    </div>
    <div className={styles.line4to27}>
      <AptBtn  />
      <AptBtn value={apartmentNames['4']} onClick={handleClick.bind(null, '4')} checked={selectedId === '4'} />
      <AptBtn value={apartmentNames['3']} onClick={handleClick.bind(null, '3')} checked={selectedId === '3'} />
      <AptBtn value={apartmentNames['2']} onClick={handleClick.bind(null, '2')} checked={selectedId === '2'} />
      <AptBtn />
      <AptBtn value={apartmentNames['27']} onClick={handleClick.bind(null, '27')} checked={selectedId === '27'} />
    </div>
  </div>
 )
}

export default Map
