import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../store/auth";
import { AppForm, AppFormField, SubmitButton } from "./forms";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("First name"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required()
    .label("Password"),
});

let formActions;

export default function RegisterForm() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const loading = useSelector((state) => state.auth.loading);
  const errors = useSelector((state) => state.auth.errors);

  useEffect(() => {
    if (formActions) {
      formActions.setSubmitting(loading);

      if (errors) {
        formActions.setErrors(errors);
      }
    }
  }, [loading, errors]);

  const handleSubmit = (values, actions) => {
    formActions = actions;

    dispatch(register(values));
  };

  if (currentUser) return <Redirect to="/home" />;

  return (
    <div>
      <h1>Register</h1>
      <AppForm
        initialValues={{ firstName: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="firstName"
          type="text"
          label="First name"
          placeholder="Enter your first name"
        />

        <AppFormField
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
        />

        <AppFormField
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
        />

        <SubmitButton title="Submit" />
      </AppForm>
    </div>
  );
}
