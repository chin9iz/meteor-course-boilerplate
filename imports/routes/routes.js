
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from 'history';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import {Tracker} from 'meteor/tracker';

import Login from './../ui/Login';
import Signup from './../ui/Signup';
import Dashboard from './../ui/Dashboard';
import NotFound from './../ui/NotFound';

export const history = createBrowserHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];
const PublicRoute = ({component: Component, ...rest}) => {
  return (
      <Route {...rest} render={props => (
          Meteor.userId()?
              <Redirect to="/dashboard" />
          : <Component {...props} />
      )} />
  );
};
const PrivateRoute = ({component: Component, ...rest}) => {
  return (
      <Route {...rest} render={props => (
          !Meteor.userId()?
              <Redirect to="/" />
          : <Component {...props} />
      )} />
  );
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  
  if (isUnauthenticatedPage && isAuthenticated) {
    history.push('/dashboard')
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.push('/')
  }
};

export const routes = (
  <Router history={history}>
    <Switch>
      <PublicRoute exact path='/' component={Login}/>
      <PublicRoute path='/signup' component={Signup}/>
      <PrivateRoute path='/dashboard' component={Dashboard}/>
      <PrivateRoute path='*' component={NotFound}/>
    </Switch>
  </Router>
);

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  
  if (isUnauthenticatedPage && isAuthenticated) {
    history.push('/dashboard')
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.push('/')
  }
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});