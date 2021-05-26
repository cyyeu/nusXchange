import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, Listing, Profile, Search, Settings, Summarizer } from './views'
import { NavBar } from './components'

const Landing = () => {
  return (
    <Router>
      <NavBar />
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
        {/* 404 */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Router>
  )
}

export default Landing
