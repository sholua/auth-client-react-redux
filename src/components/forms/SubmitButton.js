import React from "react";
import { Button } from "react-bootstrap";
import { useFormikContext } from "formik";

export default function SubmitButton({ title }) {
  const { isSubmitting } = useFormikContext();

  return (
    <Button variant="primary" type="submit" disabled={isSubmitting}>
      {title}
    </Button>
  );
}
