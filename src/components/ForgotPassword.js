import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { backend } from "../apis/backend";
import { toast } from "react-toastify";

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
      <Formik
        initialValues={{ email: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          errors,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && errors.email}
                isValid={touched.email && !errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
