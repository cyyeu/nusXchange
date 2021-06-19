import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import {
  Home,
  Listing,
  Profile,
  Search,
  Settings,
  Summarizer,
  CreateListing,
  Signup,
  Login,
} from './views'
import Temp from './views/Temp'
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
          <Temp />
        </Route>
        <Route path='/listing'>
          <Temp />
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
        <Route path='/create'>
          <CreateListing />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        {/* 404 */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Router>
  )
}

export default Landing
