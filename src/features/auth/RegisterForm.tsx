import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { FormikHelpers } from "formik";

import { register } from "./authSlice";
import { AppForm, AppFormField, SubmitButton } from "../common";
import { useAppDispatch } from "../../app/store";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(1).required().label("First name"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required()
    .label("Password"),
});

interface RegisterFormValues {
  firstName: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const initialValues: RegisterFormValues = {
    firstName: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: RegisterFormValues,
    formikHelpers: FormikHelpers<RegisterFormValues>
  ) => {
    formikHelpers.setSubmitting(true);

    const resultAction = await dispatch(register(values));
    if (register.fulfilled.match(resultAction)) return history.replace("/home");
    else if (resultAction.payload)
      formikHelpers.setErrors(resultAction.payload);

    formikHelpers.setSubmitting(false);
  };

  return (
    <div>
      <h1>Register</h1>
      <AppForm
        initialValues={initialValues}
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
