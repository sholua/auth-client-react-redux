import React from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import { backend } from "../apis/backend";
import { AppForm, AppFormField, SubmitButton } from "./forms";

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

      <AppForm
        initialValues={{ newPassword: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="newPassword"
          label="Enter your new password"
          type="password"
          placeholder="New password"
          feedback
        />

        <SubmitButton title="Submit" />
      </AppForm>
    </div>
  );
};

export default ResetPassword;
