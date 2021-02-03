import React from "react";
import { useFormikContext } from "formik";
import { Form } from "react-bootstrap";

function AppFormField({ name, label, feedback = false, ...otherProps }) {
  const { handleChange, handleBlur, errors, touched } = useFormikContext();

  return (
    <Form.Group>
      {label ? <Form.Label>{label}</Form.Label> : null}

      <Form.Control
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        isInvalid={touched[name] && errors[name]}
        isValid={touched[name] && !errors[name]}
        {...otherProps}
      />

      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>

      {feedback ? (
        <Form.Control.Feedback type="valid">
          {typeof feedback === "string" ? feedback : "Looks good!"}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
}

export default AppFormField;
