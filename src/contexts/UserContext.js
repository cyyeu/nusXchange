import React, { createContext, useReducer,  useContext } from 'react'

const initUserData = {
  token: localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : '',
  user_id: localStorage.getItem('user_id')
    ? JSON.parse(localStorage.getItem('user_id'))
    : '',
  isAuthenticated: localStorage.getItem('token') ? true : false,
}

const reducer = (state = initUserData, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.clear()
      localStorage.setItem('token', JSON.stringify(action.payload.token))
      localStorage.setItem('user_id', JSON.stringify(action.payload.user_id))
      return {
        ...state,
        user_id: action.payload.user_id,
        token: action.payload.token,
        isAuthenticated: true,
      }
    case 'LOGOUT':
      localStorage.clear()
      fetch('/api/auth/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${state.token}`,
        },
      })
        .then((res) => res.json())
        .then((status) => console.log(status))
        .catch((e) => console.log(e))
      return {
        token: '',
        user_id: '',
        isAuthenticated: false,
      }
    default:
      return state
  }
}

const UserContext = createContext()
const useUserContext = () => useContext(UserContext)
const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initUserData)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export { useUserContext, UserContextProvider }
