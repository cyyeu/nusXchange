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
  CreateReview,
  Tutors,
  EditListing,
  PasswordReset,
  ForgotPassword,
	Verified
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
        <Route path='/listing/:id' exact component={Listing} />
        <AuthenticatedRoute
          path='/listing/:id/review'
          component={CreateReview}
        />
        <AuthenticatedRoute path='/listing/:id/edit' component={EditListing} />
        <Route path='/profile/:id' component={Profile} />
        <AuthenticatedRoute path='/settings' component={Settings} />
        <Route path='/summarizer' component={Summarizer} />
        <AuthenticatedRoute path='/create' component={CreateListing} />
        <UnauthenticatedRoute path='/signup' component={Signup} />
        <UnauthenticatedRoute path='/login' component={Login} />
        <Route path='/verified' component={Verified} />
        <UnauthenticatedRoute
          path='/password-reset/:uid/:token'
          component={PasswordReset}
        />
        <UnauthenticatedRoute
          path='/forgot-password'
          component={ForgotPassword}
        />
        <AuthenticatedRoute path='/tutors' component={Tutors} />
        {/* 404 */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Router>
  )
}

export default Landing
