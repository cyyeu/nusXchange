import React from 'react'
import NotVerified from './NotVerified'
import Verified from './Verified'

const Verify = ({ user }) => {
  return <>{user.verified ? <Verified /> : <NotVerified user={user} />}</>
}

export default Verify
