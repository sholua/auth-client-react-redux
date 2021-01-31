import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NavBar from "./components/common/NavBar";
import Users from "./components/Users";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import RegisterForm from "./components/RegisterForm";
import { getAccessToken } from "./services/authService";
import { getCurrentUser } from "./store/auth";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";

interface User {
  name: String;
}

interface RootState {
  entities: [];
  auth: any;
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (getAccessToken()) dispatch(getCurrentUser());
  }, [dispatch]);

  const user = useSelector(
    (state: RootState) => state.auth.currentUser
  ) as User;

  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar user={user} />
      <main className="container">
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <ProtectedRoute path="/users" component={Users} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/home" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
