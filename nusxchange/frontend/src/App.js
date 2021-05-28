import React, { createContext } from 'react'
import ReactDOM from 'react-dom'

import Landing from './Landing'
import { ThemeProvider } from '@material-ui/core/styles'
import { Theme } from './Theme'

export const Context = createContext()
const App = () => {
  return (
    <React.StrictMode>
      <Context.Provider>
        <ThemeProvider theme={Theme}>
          <Landing />
        </ThemeProvider>
      </Context.Provider>
    </React.StrictMode>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

export default App
