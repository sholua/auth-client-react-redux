import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import NavBar from "./components/common/NavBar";
import Users from "./components/Users";
import NotFound from "./components/NotFound";
// import LoginForm from "./components/LoginForm";
// import Logout from "./components/Logout";
// import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar user={{ name: "Shol" }} />
      <main className="container">
        <Switch>
          {/* <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} /> */}
          <Route path="/users" component={Users} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/home" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
