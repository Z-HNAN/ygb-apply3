import React from 'react'
import router from 'umi/router'
import { connect } from 'dva';

import { IConnectState } from '@/models/connect.d'
import { Dispatch, AnyAction } from 'redux'

import { INormalPost } from '@/models/post'

import {
  WhiteSpace,
  Progress,
  PullToRefresh,
  ListView,
} from 'antd-mobile'

import PostCard from '@/components/PostCard'

import styles from './index.less'

export interface IProps {
  dispatch: Dispatch<AnyAction>
  normalPosts: INormalPost[]
  loading: boolean
}

const mapStateToProps = (state: IConnectState) => {
  return {
    normalPosts: state.post.normalPosts,
    loading: state.loading.models.post,
  }
}

const Normal: React.FC<IProps> = props => {
  const { 
    dispatch,
    normalPosts,
    loading,
  } = props
  const [appending, setAppending] = React.useState(false)

  const [dataSource, setDataSource] = React.useState(new ListView.DataSource({
    getRowData: (dataBlob: any, sectionID: any, rowID: any) => dataBlob[sectionID][rowID],
    rowHasChanged: (row1: any, row2: any) => row1 !== row2,
  }))

  React.useEffect(() => {
    // 设置dataSource
    setDataSource(dataSource.cloneWithRows(normalPosts))

    // 标志append结束
    setAppending(false)
  }, [normalPosts])


  
  const handleClickPost = (id: string) => {
    // 替换岗位详情Id, 拉取工作信息，跳转页面
    dispatch({ type: 'postInfo/changePostInfo', payload: { postInfoId: id, postType: 'normal' }})
    router.push('/postInfo')
  }

  React.useEffect(() => {
    // 挂载组建后,拉取所有normal
    dispatch({ type: 'post/initNormalPost' })
  }, [])

  const postCardsDOM = normalPosts.map(normalPost => (
    <React.Fragment key={normalPost.id}>
      <WhiteSpace />
      {/* <Progress percent={normalPost.nowCount / normalPost.totalCount * 100} position='normal' /> */}
      <PostCard {...normalPost} onClick={() => { handleClickPost(normalPost.id)}} />
    </React.Fragment>
  ))

  /**
   * 滑动到了顶部，准备触发刷新操作
   */
  const handleRefresh = () => {
    dispatch({ type: 'post/fetchNormalPost', payload: { append: false } })
  }

  /**
   * 滑动到了底部，准备触发append操作
   */
  const handleAppend = () => {
    setAppending(true)
    dispatch({ type: 'post/fetchNormalPost', payload: { append: true} })
  }

  const rowRender = (normalPost: INormalPost) => {
    return <div children={normalPost.id} style={{border: '1px solid red', height: '100px', width: '100vw'}} />
  }

  return (
    <div className={styles.root}>

        <ListView
          className={styles.append}
          dataSource={dataSource}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {appending ? '加载中...' : '加载更多'}
          </div>)}
          renderRow={rowRender}
          onEndReached={handleAppend}
          pullToRefresh={
            /* tslint-disable-next-line */
            <PullToRefresh
              className={styles.refresh}
              damping={60}
              direction='down'
              refreshing={loading}
              onRefresh={handleRefresh}
            />
          }
          onEndReachedThreshold={10}
        />
    </div>
  )
}


export default connect(mapStateToProps)(Normal)
