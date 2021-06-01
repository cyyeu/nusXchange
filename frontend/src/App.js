import React from 'react'
import ReactDOM from 'react-dom'

import Landing from './Landing'
import { ThemeProvider } from '@material-ui/core/styles'
import { Theme } from './Theme'
import { UserContextProvider } from './contexts/UserContext'
const App = () => {
  return (
    <React.StrictMode>
      <UserContextProvider>
        <ThemeProvider theme={Theme}>
          <Landing />
        </ThemeProvider>
      </UserContextProvider>
    </React.StrictMode>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

export default App
