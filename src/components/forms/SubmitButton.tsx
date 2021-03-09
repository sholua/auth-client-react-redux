import React from "react";
import { Button } from "react-bootstrap";
import { useFormikContext } from "formik";

interface SubmitButtonProps {
  title: string;
}

export default function SubmitButton({ title }: SubmitButtonProps) {
  const { isSubmitting } = useFormikContext();

  return (
    <Button variant="primary" type="submit" disabled={isSubmitting}>
      {title}
    </Button>
  );
}
