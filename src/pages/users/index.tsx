import React from 'react'
import { connect } from 'dva'
import { IUser } from '@/models/users'
import { IConnectState } from '@/models/connect.d'

import NameCard from '@/components/Card'

interface IProps {
  list: IUser[]
}

const Users: React.FC<IProps> = props => {
  const { list } = props
  return (
    <div>
      <h1>user list</h1>
      {
        list.map((user) => (
          <NameCard key={user.name} {...user}/>
        )
      )}
    </div>
  )
}

const mapStateToProps = (state: IConnectState) => {
  const { list } = state.users
  return {
    list,
  }
}

export default connect(mapStateToProps)(Users)
