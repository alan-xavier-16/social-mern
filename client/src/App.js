import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

import { loadUser } from "./redux/auth/auth.actions";
import setAuthToken from "./utils/auth.utils";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Route exact path="/" component={Landing} />

      <section className="container">
        <Alert />

        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </section>
    </div>
  );
};

const mapDispatchToProps = {
  loadUser: () => loadUser()
};

export default connect(null, mapDispatchToProps)(App);
