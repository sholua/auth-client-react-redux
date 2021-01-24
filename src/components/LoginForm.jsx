import React from "react";
import Joi from "joi";
import { connect } from "react-redux";
import Form from "./common/Form";
import { login } from "../store/auth";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  joiKeys = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await this.props.login(data.username, data.password);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors, ...ex.response.data };
        this.setState({ errors });
      }
    }
  };

  render() {
    if (this.props.currentUser) return <Redirect to="/users" />;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps, { login })(LoginForm);
