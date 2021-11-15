import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import "./LoginPage.css";

const LoginPage = () => {
  // using auth context
  const {
    user,
    setUser,
    saveUser,
    error,
    setError,
    signInUsingEmailAndPassword,
    signInUsingGoogle,
    setIsLoading,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const history = useHistory();
  const redirectUri = location.state?.from || "/home";

  const handleEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleEmailAndPasswordLogin = (e) => {
    e.preventDefault();
    signInUsingEmailAndPassword(email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        console.log(user);
        setError(null);
        // redirect to after login
        history.push(redirectUri);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const handleGoogleSign = (e) => {
    signInUsingGoogle()
      .then((result) => {
        setUser(result.user);
        saveUser(user.email, user.displayName, 'PUT');
        console.log(user);
        setError(null);
        // redirect to after login
        history.push(redirectUri);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // render html
  return (
    <div className="form">
      <div className="header">
        <h4 className="text-primary text-center">
          <i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i>
        </h4>
      </div>
      <div>
        <form onSubmit={handleEmailAndPasswordLogin}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span style={{ fontSize: "28px", color: "Dodgerblue" }}>
                  <i className="fa fa-at"></i>
                </span>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              onChange={handleEmail}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span style={{ fontSize: "28px", color: "Dodgerblue" }}>
                  <i className="fa fa-lock"></i>
                </span>
              </span>
            </div>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={handlePassword}
            />
          </div>

          <button type="submit" className="btn btn-secondary btn-block">
            Login
          </button>
          {error && (
            <h3 className="text-center font-black service-title text-center text-danger mt-3">
              {error}
            </h3>
          )}

          <div>
            <Link to="/register">
              <p>Don't have an account? Register Now !</p>
            </Link>
          </div>
        </form>
        <div className="social">
          <i className="fab fa-google" onClick={handleGoogleSign}></i>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
