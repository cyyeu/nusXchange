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
  Chat,
  NotFound,
} from './views'
import { NavBar } from './components'

const App = () => {
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
        <Route path='/listing'>
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
        <Route path='/chat'>
          <Chat />
        </Route>
        {/* 404 */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App
