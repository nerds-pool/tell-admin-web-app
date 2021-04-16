import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children, auth = false, ...rest }) => (
  <Route
    {...rest}
    render={() => (auth === true ? children : <Redirect to="/login" />)}
  ></Route>
);

export default PrivateRoute;
