import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { backend } from "../apis/backend";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (values) => {
    const { email } = values;
    const result = await backend.post("/auth/forgot_password", { email });
    if (result) setEmailSent(true);
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
        {({ handleChange, handleSubmit, touched, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleChange("email")}
                isValid={touched.email && !errors.email}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
