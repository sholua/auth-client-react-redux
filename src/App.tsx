import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NavBar from "./app/NavBar";
import Users from "./components/Users";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import RegisterForm from "./components/RegisterForm";
import { getAccessToken } from "./services/authService";
import { getCurrentUser, selectCurrentUser } from "./features/auth/authSlice";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { User } from "./features/users/usersSlice";
import About from "./components/About";
import Profile from "./components/Profile";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (getAccessToken()) dispatch(getCurrentUser());
  }, [dispatch]);

  const user = useSelector(selectCurrentUser) as User;

  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar user={user} />
      <main className="container">
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/forgot_password" component={ForgotPassword} />
          <Route
            path="/reset_password/:userId/:token"
            component={ResetPassword}
          />
          <ProtectedRoute path="/users" component={Users} />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/home" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
