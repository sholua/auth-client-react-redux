import React, { useEffect } from "react";
import * as Yup from "yup";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../store/auth";
import { AppForm, AppFormField, SubmitButton } from "./forms";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Username"),
  password: Yup.string().required().label("Password"),
});

let formActions;

export default function LoginForm() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const loading = useSelector((state) => state.auth.loading);
  const errors = useSelector((state) => state.auth.errors);

  useEffect(() => {
    if (formActions) {
      formActions.setSubmitting(loading);

      if (errors) {
        formActions.setErrors({
          email: "Check your email",
          password: "Check your password",
        });
      }
    }
  }, [loading, errors]);

  const handleSubmit = (values, actions) => {
    const { email, password } = values;
    formActions = actions;

    dispatch(login(email, password));
  };

  if (currentUser) return <Redirect to="/home" />;

  return (
    <div>
      <h1>Login</h1>
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="email"
          type="email"
          label="Username"
          placeholder="Enter your email"
        />

        <AppFormField
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
        />

        <SubmitButton title="Submit" />
        <div>
          <Link to="/forgot_password">Forgot password?</Link>
        </div>
      </AppForm>
    </div>
  );
}
