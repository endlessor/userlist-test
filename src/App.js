import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
import Users from './components/users'

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route
        path='/'
        component={Users}
      />
    </Switch>
  </Router>
)

export default Routes
