import React from "react";
import { Router, Redirect } from "@reach/router";
import Wrapper from "../components/shared/Wrapper";
import Dashboard from "./app/dashboard";
import PrivateRoute from "../components/router/PrivateRoute";
import NotFound from "./404";

const App = () => (
  <Wrapper>
    <Router>
      <Redirect noThrow from="/app" to="/app/dashboard" exact />
      <PrivateRoute path="/app/dashboard" component={Dashboard} />
      <NotFound default />
    </Router>
  </Wrapper>
);
export default App;
