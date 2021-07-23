import React, { createContext, useReducer, useEffect, useContext } from 'react'

const init = {
  success: {
    open: false,
    msg: '',
  },
  error: {
    open: false,
    msg: '',
  },
}

const reducer = (state = init, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        ...state,
        success: {
          open: true,
          msg: action.payload.msg,
        },
      }
    case 'ERROR':
      return {
        ...state,
        error: {
          open: true,
          msg: action.payload.msg,
        },
      }
    default:
      return state
  }
}

const SnackbarContext = createContext()
const useSnackbarContext = () => useContext(SnackbarContext)
const SnackbarContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, init)
  return (
    <SnackbarContext.Provider value={{ state, dispatch }}>
      {children}
    </SnackbarContext.Provider>
  )
}

export { useSnackbarContext, SnackbarContextProvider }
