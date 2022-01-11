import React from "react";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { FormikHelpers } from "formik";

import { login } from "./authSlice";
import { AppForm, AppFormField, SubmitButton } from "../common";
import { useAppDispatch } from "../../app/store";
import { SocialLogin } from "./SocialLogin";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Username"),
  password: Yup.string().required().label("Password"),
});

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const initialValues: LoginFormValues = { email: "", password: "" };

  const handleSubmit = async (
    values: LoginFormValues,
    formikHelpers: FormikHelpers<LoginFormValues>
  ) => {
    formikHelpers.setSubmitting(true);

    const resultAction = await dispatch(login(values));
    if (login.fulfilled.match(resultAction)) return history.replace("/home");
    else if (resultAction.payload) {
      formikHelpers.setErrors({
        email: "Check your email",
        password: "Check your password",
      });
      toast.error(resultAction.payload);
    }

    formikHelpers.setSubmitting(false);
  };

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
      <SocialLogin provider="google" />
      <SocialLogin provider="facebook" />
    </div>
  );
}
