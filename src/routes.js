import React from 'react';
import {IndexRedirect, IndexRoute, Redirect, Route} from 'react-router';
import App from './components/App';
import WelcomePage from './components/base/WelcomePage';
import DashboardPage from './components/base/DashboardPage';
import LoginPage from './components/base/LoginPage';
import EmployeeTablePage from './components/employee/EmployeeTablePage';
import IntakePage from './components/intake/IntakePage';
import AuthService from './utils/AuthService';
import {employeePath, intakePath, homePath, dashPath} from './utils/pathsHelper';

const auth = new AuthService(`${process.env.REACT_APP_AUTH0CLIENTID}`, `${process.env.REACT_APP_AUTH0DOMAIN}`, 'login');
const signupAuth = new AuthService(`${process.env.REACT_APP_AUTH0CLIENTID}`, `${process.env.REACT_APP_AUTH0DOMAIN}`, 'signUp');
const passwordAuth = new AuthService(`${process.env.REACT_APP_AUTH0CLIENTID}`, `${process.env.REACT_APP_AUTH0DOMAIN}`, 'forgotPassword');

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login'
      // state: { nextPathname: nextState.location.pathname }
    });
  }
};

export const makeMainRoutes = () => {
  return (
    <Route>
      <Route path="/login" component={LoginPage} auth={auth}/>
      <Route path="/signup" component={LoginPage} auth={signupAuth}/>
      <Route path="/password" component={LoginPage} auth={passwordAuth}/>
      <Route path="/" component={App} auth={auth} onEnter={requireAuth}>
        <IndexRedirect to={homePath}/>
        <Route path={homePath} component={WelcomePage}/>
        <Route path={dashPath} component={DashboardPage}/>
        <Route path={employeePath}>
          <IndexRoute component={EmployeeTablePage}/>
          <Redirect from="*" to={employeePath}/>
        </Route>
        <Route path={intakePath}>
          <IndexRoute component={IntakePage}/>
          <Redirect from="*" to={intakePath}/>
        </Route>
        <Redirect from="*" to={homePath}/>
      </Route>
    </Route>
  );
};

export default makeMainRoutes;