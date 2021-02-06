import React from "react";
import { Route, Redirect } from "react-router-dom";
import { checkAuth } from "../services/authService";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = checkAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
