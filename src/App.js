import "./App.css";
import LoginPage from "./Pages/Authentication/LoginPage/LoginPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterPage from "./Pages/Authentication/RegisterPage/RegisterPage";
import AuthProvider from "./Contexts/AuthProvider";
import Header from "./Pages/Shared/Header/Header";
import HomePage from "./Pages/Home/HomePage/HomePage";
import Books from "./Pages/Books/Books";
import Footer from "./Pages/Footer/Footer";
import PrivateRoute from "./Pages/Authentication/PrivateRoute/PrivateRoute";
import PlaceOrderPage from "./Pages/PlaceOrder/PlaceOrderPage";
import NotFound from "./Pages/NotFound/NotFound";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
function App() {
  return (
    // Providing auth context
    <AuthProvider>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <HomePage></HomePage>
          </Route>
          <Route exact path="/home">
            <HomePage></HomePage>
          </Route>
          <Route exact path="/books">
            <Books></Books>
          </Route>

          <PrivateRoute path="/dashboard">
            <Dashboard></Dashboard>
          </PrivateRoute>

          <PrivateRoute exact path="/place-order/:id">
            <PlaceOrderPage></PlaceOrderPage>
          </PrivateRoute>

          <Route exact path="/login">
            <LoginPage></LoginPage>
          </Route>
          <Route exact path="/register">
            <RegisterPage></RegisterPage>
          </Route>
          <Route exact path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
        <footer>
          <Footer></Footer>
        </footer>
      </Router>
    </AuthProvider>
  );
}

export default App;
