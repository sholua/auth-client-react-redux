import React from "react";
import Joi from "joi";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Form from "./common/Form";
import { register } from "../store/auth";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
    },
    errors: {},
  };

  joiKeys = {
    name: Joi.string().required().label("Name"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().min(8).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const response = await this.props.register(this.state.data);
      auth.loginWithJwt(
        response.headers["x-access-token"],
        response.headers["x-refresh-token"]
      );
      window.location = "/";
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
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps, { register })(RegisterForm);
