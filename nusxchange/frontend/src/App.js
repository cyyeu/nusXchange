import React from 'react'
import ReactDOM from 'react-dom'

import Landing from './Landing'
import { ThemeProvider } from '@material-ui/core/styles'
import { Theme } from './Theme'

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={Theme}>
        <Landing />
      </ThemeProvider>
    </React.StrictMode>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

export default App
