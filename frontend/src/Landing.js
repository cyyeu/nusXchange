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
        <Route path='/search/:search'>
          <Search />
        </Route>
        <Route path='/listing/:id'>
          <Listing />
        </Route>
        <Route path='/profile/:id'>
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
        <Route path='/createreview'>
          <Temp />
        </Route>
        {/* 404 */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Router>
  )
}

export default Landing
