import React, { useEffect } from "react";
import * as Yup from "yup";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../store/auth";
import { AppForm, AppFormField, SubmitButton } from "./forms";
import { AppState } from "../store/reducer";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Username"),
  password: Yup.string().required().label("Password"),
});

type FormActions = { [key: string]: (arg: boolean | {}) => void };
let formActions: FormActions;

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const initialValues: LoginFormValues = { email: "", password: "" };
  const dispatch = useDispatch();
  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const loading = useSelector((state: AppState) => state.auth.loading);
  const errors = useSelector((state: AppState) => state.auth.errors);

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

  const handleSubmit = (values: LoginFormValues, actions: FormActions) => {
    const { email, password } = values;
    formActions = actions;

    dispatch(login(email, password));
  };

  if (currentUser) return <Redirect to="/home" />;

  return (
    <div>
      <h1>Login</h1>
      <AppForm
        initialValues={initialValues}
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
