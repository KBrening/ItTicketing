import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import loadable from '@loadable/component';
import 'normalize.css';
import './App.css';

const Navbar = loadable(() => import('components/Navbar'));
const Home = loadable(() => import('views/Home'));
const Login = loadable(() => import('views/Login'));
const Registration = loadable(() => import('views/Registration'));
const AccountRetrival = loadable(() => import('views/AccountRetrival'));
const NotFound = loadable(() => import('views/NotFound'));
const CustomerDashboard = loadable(() => import('views/CustomerDashboard'));
const EmployeeDashboard = loadable(() => import('views/EmployeeDashboard'));

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/customer/dashboard" component={CustomerDashboard} />
          <Route path="/employee/dashboard" component={EmployeeDashboard} />
          <Route path="/accountRetrival" component={AccountRetrival} />
          <Route path="/registration" component={Registration} />
          <Route path="/login" component={Login} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </BrowserRouter>
  );
}

export default App;