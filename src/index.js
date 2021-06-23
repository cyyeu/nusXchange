import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ThemeProvider } from '@material-ui/core/styles'
import { Theme } from './theme'
import { UserContextProvider } from './contexts/UserContext'

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
