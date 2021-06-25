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
import {
  AuthenticatedRoute,
  UnauthenticatedRoute,
} from './components/AuthRoutes'

const Landing = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/search/:search' component={Search} />
        <Route path='/listing/:id' component={Listing} />
        <Route path='/profile/:id' component={Profile} />
        <AuthenticatedRoute path='/settings' component={Settings} />
        <Route path='/summarizer' component={Summarizer} />
        <AuthenticatedRoute path='/create' component={CreateListing} />
        <UnauthenticatedRoute path='/signup' component={Signup} />
        <UnauthenticatedRoute path='/login' component={Login} />
        <AuthenticatedRoute path='/createreview' component={Temp} />
        {/* 404 */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Router>
  )
}

export default Landing
