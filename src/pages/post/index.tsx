/**
 * 岗位大厅
 */

import React from 'react'
import { Button } from 'antd-mobile'
import { connect } from 'dva';

import { Dispatch, AnyAction } from 'redux';


interface IProps {
  dispatch: Dispatch<AnyAction>
  count: number
}

const Post: React.FC<IProps> = props => {
  const { dispatch, count } = props

  function addHandler() {
    dispatch({ type: 'post/add' })
  }

  function addAsyncHandler() {
    dispatch({
      type: 'post/addAsync',
      payload: { delay: 3000 },
    })
  }

  return (
    <div>
      <h1>count: {count}</h1>
      <Button type='primary' onClick={addHandler}>add</Button>
      <Button type='primary' onClick={addAsyncHandler}>add-async</Button>
    </div>
  )
}

const mapStateToProps = state => {
  const {count} = state.post

  return {
    count
  }
}

export default connect(mapStateToProps)(Post)
