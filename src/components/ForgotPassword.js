import React, { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { backend } from "../apis/backend";
import { AppForm, AppFormField, SubmitButton } from "./forms";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
});

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (values, actions) => {
    const { email } = values;
    try {
      const result = await backend.post("/auth/forgot_password", { email });
      if (result) setEmailSent(true);
    } catch (ex) {
      toast.error(ex.response.data);
    } finally {
      actions.setSubmitting(false);
    }
  };

  if (emailSent) return <div>Check your email and follow instructions.</div>;

  return (
    <div>
      <p>
        If you forgot your password enter your email address and we'll send you
        email letter with instructions how to reset your password.
      </p>
      <AppForm
        initialValues={{ email: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="email"
          type="email"
          label="Enter email"
          placeholder="Enter your email"
        />
        <SubmitButton title="Submit" />
      </AppForm>
    </div>
  );
};

export default ForgotPassword;
