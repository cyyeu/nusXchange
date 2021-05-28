import React from 'react'
import ReactDOM from 'react-dom'

import Landing from './Landing'
import { ThemeProvider } from '@material-ui/core/styles'
import { Theme } from './Theme'
import Context from './contexts/Context'
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
