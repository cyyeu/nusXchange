import React, { createContext, useReducer } from 'react'

const initUserData = {
  token: '',
  user_id: '',
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
        user_id: action.payload.user_id,
        token: action.payload.token,
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
