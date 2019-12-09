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
  finished: boolean
  loading: boolean
}

const mapStateToProps = (state: IConnectState) => {
  return {
    normalPosts: state.post.normalPosts,
    finished: state.post.normalPostsFinished,
    loading: state.loading.models.post,
  }
}

const Normal: React.FC<IProps> = props => {
  const { 
    dispatch,
    finished,
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
    if (finished === true) { return }
    setAppending(true)
    dispatch({ type: 'post/fetchNormalPost', payload: { append: true} })
  }

  const rowRender = (normalPost: INormalPost) => (
    <React.Fragment key={normalPost.id}>
      <WhiteSpace />
      {/* <Progress percent={normalPost.nowCount / normalPost.totalCount * 100} position='normal' /> */}
      <PostCard {...normalPost} onClick={() => { handleClickPost(normalPost.id) }} />
    </React.Fragment>
  )

  /**
   * 加载更多的文字提示
   * - finished = true -> '没有更多的岗位了d(´ω｀*)', 取消事件
   * 
   * - finished = false ->
   *   - appending = true '加载中...'
   *   - appending = false '加载更多'
   */
  let appendingText = ''
  appendingText = appending === true ? '奋力加载中...' : '加载更多'
  appendingText = finished === true ? '没有更多的岗位了d(´ω｀*)' : appendingText

  return (
    <div className={styles.root}>
        <ListView
          className={styles.append}
          dataSource={dataSource}
          renderBodyComponent={() => (<div className={styles.refreshBody} />)}
          renderFooter={() => (<div className={styles.listViewFooter} children={appendingText} />)}
          pageSize={5}
          renderRow={rowRender}
          onEndReached={handleAppend}
          pullToRefresh={
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
