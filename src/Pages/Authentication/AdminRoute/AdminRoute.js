import React from "react";
import { Spinner } from "react-bootstrap";
import { Redirect, Route } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import "./AdminRoute.css";

const AdminRoute = ({ children, ...rest }) => {
  // using auth context
  const { user, admin, isLoading } = useAuth();

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
        user.email && admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: location },
            }}
          ></Redirect>
        )
      }
    ></Route>
  );
};

export default AdminRoute;
