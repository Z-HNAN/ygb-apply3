import React from 'react'
import router from 'umi/router'
import { connect } from 'dva'
import { IConnectState } from '@/models/connect.d'
import { Dispatch, AnyAction } from 'redux'

import {
  WhiteSpace,
  List,
  PullToRefresh,
} from 'antd-mobile'
import Indicator from '@/components/Indicator'
import Map from './components/Map'
import { ApartmentPostListType ,apartmentPostListSelector } from './selector'

import styles from './index.less'

const Item = List.Item
const Brief = Item.Brief

interface OwnProps {
  apartmentPostList: ApartmentPostListType[],
  apartmentId: string
  loading: boolean
  dispatch: Dispatch
}

const mapStateToProps = (state: IConnectState) => {
  return {
    apartmentPostList: apartmentPostListSelector(state),
    apartmentId: state.postInfo.apartmentId as string,
    loading: state.loading.models.post
  }
}

const Apartment: React.FC<OwnProps> = props => {
  const {
    dispatch,
    apartmentPostList,
    apartmentId,
    loading,
  } = props

  const handleClickApartment = (id: string) => {
    dispatch({ type: 'post/initApartmentPost' , payload: { apartmentId: id }})
    dispatch({ type: 'postInfo/changeApartmentId', payload: { apartmentId: id }})
  }

  /**
   * 处理点击岗位，并跳转去岗位详情`
   */
  const handleClickPost = (id: string) => {
    dispatch({ type: 'postInfo/changePostInfo', payload: { postInfoId: id, postType: 'apartment' }})
    router.push('/postInfo')
  }

  /* 挂载组建后，拉取所有的公寓中心岗位 */
  React.useEffect(() => {
    dispatch({ type: 'post/initApartmentPost', payload: { apartmentId: apartmentId }})
  }, [])

  /* 重新获取该岗位 */
  const handleRefresh = () => {
    dispatch({ type: 'post/fetchApartmentPost', payload: { apartmentId } })
  }

  return (
    <div className={styles.root}>
      <WhiteSpace />
      <div className={styles.map}>
        <Map selectedId={apartmentId} onClick={handleClickApartment}/>
      </div>
      <WhiteSpace />
        <PullToRefresh
          className={styles.refresh}
          damping={60}
          direction='down'
          refreshing={loading}
          onRefresh={handleRefresh}
        >
          <div className={styles.info}>
          <List>
            {
              apartmentPostList.map(({ id, title, nowCount, totalCount }) => (
                <Item
                  key={id}
                  arrow="horizontal"
                  multipleLine
                  onClick={handleClickPost.bind(null, id)}
                >
                  {title}
                  <Brief>{`当前报名 ${nowCount}/${totalCount} 人`}</Brief>
                </Item>
              ))}
          </List>
        </div>
        </PullToRefresh>
    </div>
  )
}


export default connect(mapStateToProps)(Apartment)
