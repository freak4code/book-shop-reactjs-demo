import React, { useState } from "react";
import "./RegisterPage.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const RegisterPage = () => {
  // using auth context
  const {
    user,
    setUser,
    saveUser,
    updateDisplayUserName,
    error,
    setError,
    signUpUsingEmailAndPassword,
    signInUsingGoogle,
    setIsLoading,
  } = useAuth();

  const location = useLocation();
  const history = useHistory();
  const redirectUri = location.state?.form || "/home";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDisplayName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("handleRegister");
    signUpUsingEmailAndPassword(name, email, password)
      .then((userCredential) => {
        setError(null);
        setUser(userCredential.user);
        saveUser(user.email, user.displayName, "POST");
        console.log(user);
        updateDisplayUserName(name);
        // redirect after sign up
        history.push(redirectUri);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const handleGoogleSign = (e) => {
    signInUsingGoogle()
      .then((result) => {
        setUser(result.user);
        console.log(user);
        saveUser(user.email, user.displayName, "PUT");
        setError(null);
        // redirect after sign up
        history.push(redirectUri);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="form">
      <div className="header">
        <h4 className="text-primary text-center">
          <i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i>
        </h4>
      </div>
      <div>
        <form onSubmit={handleRegister}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span style={{ fontSize: "28px", color: "Dodgerblue" }}>
                  <i className="fa fa-user"></i>
                </span>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={handleDisplayName}
            />
          </div>

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
          {error && (
            <h3 className="text-center font-black service-title text-center text-danger mt-3">
              {error}
            </h3>
          )}

          <button type="submit" className="btn btn-secondary btn-block">
            Register
          </button>

          <div>
            <Link to="/login">
              <p>Alrwady registered ? Login</p>
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

export default RegisterPage;
