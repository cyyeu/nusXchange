import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, Listing, Profile, Search, Settings, Summarizer } from './views'
import {Login, Signup, Logout} from './views/auth/';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/search'>
          <Search />
        </Route>
        <Route path='/listing'>
          <Listing />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/settings'>
          <Settings />
        </Route>
        <Route path='/summarizer'>
          <Summarizer />
        </Route>
        <Route path = '/login' component = {Login} exact />
        <Route path = '/signup' component = {Signup} exact />
        <Route path = '/logout' component = {Logout} exact />
        {/* 404 */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

export default App
