import React from 'react'
import ReactDOM from 'react-dom'

import Landing from './Landing'
import { ThemeProvider } from '@material-ui/core/styles'
import { Theme } from './Theme'
import Provider from './contexts'
const App = () => {
  return (
    <React.StrictMode>
      <Provider>
        <ThemeProvider theme={Theme}>
          <Landing />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

export default App
