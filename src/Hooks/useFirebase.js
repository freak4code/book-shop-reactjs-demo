import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { useState, useEffect } from "react";
import initializeFirebaseAuthentication from "../Pages/Authentication/Firebase/firebase.init";

//  initialize firebase
initializeFirebaseAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // update display name when sign up using email and password
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const auth = getAuth();

  const signUpUsingEmailAndPassword = (name, email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUsingEmailAndPassword = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signInUsingGoogle = () => {
    setIsLoading(true);
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [auth, displayName, user.email]);

  // observe user state change
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setError(null);
      if (user) {
        console.log("onAuthStateChanged -> ", user.displayName);
        setUser(user);
        saveUser(user.email, user.displayName, 'PUT');
        if (user.displayName != null) {
          setDisplayName(user.displayName);
        }
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, [auth, displayName]);

  const logOut = () => {
    setError(null);
    setIsLoading(true);
    signOut(auth)
      .then(() => {})
      .finally(() => setIsLoading(false));
  };

  // update display name when sign up using email and password
  const updateDisplayUserName = (name) => {
    console.log("updateDisplayUserName -> ", name);
    setDisplayName(name);
    updateProfile(auth.currentUser, { displayName: name })
      .then((result) => {
        console.log(result.user.displayName);
        setUser(result.user);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {});
  };

  const saveUser = (email, displayName, method) => {
    const user = { email, displayName };
    fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  return {
    user,
    setUser,
    saveUser,
    admin,
    updateDisplayUserName,
    displayName,
    error,
    setError,
    isLoading,
    setIsLoading,
    signUpUsingEmailAndPassword,
    signInUsingEmailAndPassword,
    signInUsingGoogle,
    logOut,
  };
};

export default useFirebase;
