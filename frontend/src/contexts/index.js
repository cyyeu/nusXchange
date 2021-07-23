import React from 'react'
import { SnackbarContextProvider, useSnackbarContext } from './SnackbarContext'
import { UserContextProvider, useUserContext } from './UserContext'
const index = ({ children }) => {
  return (
    <>
      <UserContextProvider>
        <SnackbarContextProvider>{children}</SnackbarContextProvider>
      </UserContextProvider>
    </>
  )
}

export default index
export {useUserContext, useSnackbarContext}