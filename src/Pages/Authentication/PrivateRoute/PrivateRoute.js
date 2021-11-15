import React from "react";
import { Spinner } from "react-bootstrap";
import { Redirect, Route } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import "./PrivateRoute.css";

const PrivateRoute = ({ children, ...rest }) => {
  // using auth context
  const { user, isLoading } = useAuth();

  // showing spinner when checking user login status
  if (isLoading) {
    return (
      <div className="spinner-arena">
        <div className="spinnner-position">
          <Spinner animation="grow" variant="danger" />
        </div>
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          ></Redirect>
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
