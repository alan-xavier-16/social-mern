import React from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Route exact path="/" component={Landing} />

      <section className="container">
        <Alert />

        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </section>
    </div>
  );
};

export default App;
