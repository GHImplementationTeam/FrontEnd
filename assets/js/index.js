﻿import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {browserHistory, Router, Route, IndexRoute, IndexRedirect} from 'react-router'

/* SHARED SERVICES --- */
require('services/$.serializeObject.js') // USED FOR FORMS

/* CONTAINERS --- */
import Template from 'containers/Template'
import AdminLTE from 'containers/AdminLTE'
import Settings from 'containers/Settings'
import Login from 'containers/Login'
import CreateUser from 'containers/CreateUser/components/Create'
import LoginLogin from 'containers/Login/Login.jsx'
import Home from 'containers/Home'
import CoordinatedEntryGroups from 'containers/Coordinatedentrygroups'
import CoordinatedEntryGroupsView from 'containers/Coordinatedentrygroups/View'
import Customers from 'containers/Customers'
import CustomersView from 'containers/Customers/View'
import Users from 'containers/Users'
import UsersAdd from 'containers/Users/Add'
import UsersView from 'containers/Users/View'
import Intakes from 'containers/Intakes'
import IntakeAdd from 'containers/Intakes/Add'
import IntakeEdit from 'containers/Intakes/Edit'
import IntakesView from 'containers/Intakes/View'
import IntakesComplete from 'containers/Intakes/Complete'
import IntakesIncomplete from 'containers/Intakes/Incomplete'
import Organizations from 'containers/Organizations'
import OrganizationsAdd from 'containers/Organizations/Add'
import OrganizationsView from 'containers/Organizations/View'

/* UTILITIES --- */
import AuthService from 'utils/AuthService'
const auth = new AuthService('lY6PHPcT6qeOgVMTuQA57EMxdLDhxtb2', 'benvenker.auth0.com');

/* COMPONENTS --- */
import Icons from 'components/Icons'
import FourOhFour from 'components/FourOhFour'

/* COMBINE REDUCERS --- */
import * as reducers from './reducers'
export const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

/* Validating authentication for private routes  */
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({pathname: '/login'})
  }
}

/* ADD BASE/GLOBAL STYLES --- */
require('./../styles/base.scss')

/* RENDER WITH REDUX / REACT ROUTER --- */
render((
  <Provider store={ store }>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={ browserHistory }>
      <Route path="/login" component={ Login } auth={ auth }/>
      <Route path="/" component={ AdminLTE } auth={ auth }>
        <IndexRedirect to="/home"/>
        <Route path="/home" component={ Home } onEnter={requireAuth}/>
        <Route path="/icons" component={ Icons } onEnter={requireAuth}/>
        {/*<Route path="/login" component={ LoginLogin } />*/}
        <Route path="/settings" onEnter={requireAuth}>
          <IndexRoute component={ Settings }/>
        </Route>
        <Route path="/users" component={ Users } onEnter={requireAuth}>
          <IndexRoute component={UsersView}/>
          <Route path="view" component={ UsersView }/>
        </Route>
        <Route path="/coordinatedentrygroups" component={ CoordinatedEntryGroups } onEnter={requireAuth}>
          <IndexRoute component={CoordinatedEntryGroupsView}/>
          <Route path="view" component={ CoordinatedEntryGroupsView }/>
        </Route>
        <Route path="/customers" component={ Customers } onEnter={requireAuth}>
          <IndexRoute component={CustomersView}/>
          <Route path="view" component={ CustomersView }/>
        </Route>
        <Route path="/users" component={ Users } onEnter={requireAuth}>
          <IndexRoute component={UsersView}/>
          <Route path="add" component={ UsersAdd }/>
          <Route path="view" component={ UsersView }/>
        </Route>
        <Route path="/intakes" component={ Intakes } onEnter={requireAuth}>
          <IndexRoute component={IntakesView}/>
          <Route path="add" component={ IntakeAdd }/>
          <Route path=":id/edit" component={ IntakeEdit }/>
          <Route path="view" component={ IntakesView }/>
          <Route path="complete" component={ IntakesComplete }/>
          <Route path="incomplete" component={ IntakesIncomplete }/>
        </Route>
        <Route path="/organizations" component={ Organizations } onEnter={requireAuth}>
          <IndexRoute component={OrganizationsView}/>
          <Route path="add" component={ OrganizationsAdd }/>
          <Route path="view" component={ OrganizationsView }/>
        </Route>
        <Route path="*" component={ FourOhFour }/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('ui-container'))
