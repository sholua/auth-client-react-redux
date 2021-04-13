import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NavBar from "./app/NavBar";
import UsersList from "./features/users/UsersList";
import NotFound from "./app/NotFound";
import LoginForm from "./features/auth/LoginForm";
import Logout from "./features/auth/Logout";
import RegisterForm from "./features/auth/RegisterForm";
import { getAccessToken } from "./services/authService";
import { getCurrentUser, selectCurrentUser } from "./features/auth/authSlice";
import Home from "./features/home/Home";
import ProtectedRoute from "./app/ProtectedRoute";
import ForgotPassword from "./features/auth/ForgotPassword";
import ResetPassword from "./features/auth/ResetPassword";
import { User } from "./features/users/usersSlice";
import About from "./features/about/About";
import Profile from "./features/profile/Profile";

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
          <ProtectedRoute path="/users" component={UsersList} />
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
