import React from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { backend } from "../apis/backend";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .label("Password"),
});

const ResetPassword = () => {
  const history = useHistory();
  const { userId, token } = useParams();

  const handleSubmit = async (values, actions) => {
    const { newPassword } = values;

    try {
      const response = await backend.post("/auth/reset_password", {
        userId,
        token,
        newPassword,
      });
      toast.success(response.data);
      history.replace("/login");
    } catch (ex) {
      actions.setErrors(ex.response.data);
      toast.error(ex.response.data);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div>
      <p>
        Enter your new password. It should include uppercase and lowercase
        letters, numbers and special symbols. Minimum 8 characters.
      </p>
      <Formik
        initialValues={{ newPassword: "" }}
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
            <Form.Group controlId="formBasicEmail">
              <Form.Label>New password</Form.Label>
              <Form.Control
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.newPassword && errors.newPassword}
                isValid={touched.newPassword && !errors.newPassword}
              />
              <Form.Control.Feedback type="valid">
                Looks good!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                <div
                  dangerouslySetInnerHTML={{ __html: errors.newPassword }}
                ></div>
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

export default ResetPassword;
