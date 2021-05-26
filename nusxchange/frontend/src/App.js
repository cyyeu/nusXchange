import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, Listing, Profile, Search, Settings, Summarizer } from './views'
import {Login, Signup, Logout} from './views/auth/';
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
