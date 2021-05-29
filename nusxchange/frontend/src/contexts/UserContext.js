import React, { createContext, useReducer } from 'react'

const initUserData = {
  token: '',
  isAuthenticated: false,
  rememberMe: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      if (action.payload.token && action.payload.rememberMe) {
        localStorage.clear()
        localStorage.setItem('token', JSON.stringify(action.payload.token))
      }
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
      }
    case 'LOGOUT':
      localStorage.clear()
      return {
        ...initUserData,
      }
    default:
      return state
  }
}

const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initUserData)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
