import React from "react";
import { useFormikContext } from "formik";
import { Form } from "react-bootstrap";

interface FieldProps {
  name: string;
  label?: string;
  feedback?: boolean | string;
  type?: string;
  placeholder?: string;
}

function AppFormField({
  name,
  label,
  feedback = false,
  ...otherProps
}: FieldProps) {
  const { handleChange, handleBlur, errors, touched } = useFormikContext();

  return (
    <Form.Group>
      {label ? <Form.Label>{label}</Form.Label> : null}

      <Form.Control
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        isInvalid={
          touched[name as keyof typeof touched] &&
          errors[name as keyof typeof errors]
        }
        isValid={
          touched[name as keyof typeof touched] &&
          !errors[name as keyof typeof errors]
        }
        {...otherProps}
      />

      <Form.Control.Feedback type="invalid">
        {errors[name as keyof typeof errors]}
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
