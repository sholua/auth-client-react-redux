import React from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { backend } from "../apis/backend";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string().required().label("Password"),
});

const ResetPassword = () => {
  const history = useHistory();
  const { userId, token } = useParams();

  const handleSubmit = async (values) => {
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
      toast.error(ex.response.data);
    }
  };

  return (
    <div>
      <p>
        Enter your new password. It should include uppercase and lowercase
        letters, numbers and special symbols. Minimum 8 charakters.
      </p>
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, touched, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>New password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                onChange={handleChange("newPassword")}
                isValid={touched.newPassword && !errors.newPassword}
              />
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

export default ResetPassword;
