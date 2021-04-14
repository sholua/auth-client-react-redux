import React from "react";
import { Formik, FormikHelpers } from "formik";
import { Form } from "react-bootstrap";

interface AppFormProps {
  initialValues: {};
  onSubmit: (values: any, actions: FormikHelpers<any>) => void;
  validationSchema: {};
  children: JSX.Element[];
}

function AppForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: AppFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <Form onSubmit={handleSubmit}>{children}</Form>}
    </Formik>
  );
}

export default AppForm;
