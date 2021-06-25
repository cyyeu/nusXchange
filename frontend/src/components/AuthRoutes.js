import React, { useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useUserContext } from '../contexts/UserContext'

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const { state } = useUserContext()
  const [auth, setAuth] = useState(state.isAuthenticated)
  useEffect(() => {
    setAuth(state.isAuthenticated)
  }, [state])
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth === null) return '...loading'
        return auth ? <Component {...props} /> : <Redirect to='/login' />
      }}
    />
  )
}

const UnauthenticatedRoute = ({ component: Component, ...rest }) => {
  const { state } = useUserContext()
  const [auth, setAuth] = useState(state.isAuthenticated)
  useEffect(() => {
    setAuth(state.isAuthenticated)
  }, [state])
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth === null) return '...loading'
        return !auth ? <Component {...props} /> : <Redirect to='/' />
      }}
    />
  )
}

export { AuthenticatedRoute, UnauthenticatedRoute }
