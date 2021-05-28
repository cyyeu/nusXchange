import React, { createContext } from 'react'

const initUserData = {
  user: {
    first_name: '',
    last_name: '',
    email: '',
    isAuthenticated: false,
  },
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', JSON.stringify(action.payload.token))
      return {
        ...state,
        // wip
      }
    case 'LOGOUT':
      localStorage.clear()
      return {
        ...initUserData,
      }
    default:
      return state
    // wip
  }
}

export default createContext(initUserData)
