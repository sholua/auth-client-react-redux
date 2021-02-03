import React from "react";
import { Formik } from "formik";
import { Form } from "react-bootstrap";

function AppForm({ initialValues, onSubmit, validationSchema, children }) {
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
