import React, { useEffect } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";

import { createDepartment } from "../store/departments";
import { AppForm, AppFormField, SubmitButton } from "./forms";
import { AppState } from "../store/reducer";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("name"),
});

let formActions: FormikHelpers<{}>;

interface DepartmentFormValues {
  name: string;
}

export default function DepartmentForm() {
  const initialValues: DepartmentFormValues = { name: "" };
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(
    (state: AppState) => state.entities.departments.loading
  );
  const errors = useSelector(
    (state: AppState) => state.entities.departments.errors
  );

  useEffect(() => {
    if (formActions) {
      formActions.setSubmitting(loading);

      if (errors) {
        formActions.setErrors(errors);
      }
    }
  }, [loading, errors]);

  const handleSubmit = (
    values: DepartmentFormValues,
    actions: FormikHelpers<{}>
  ) => {
    formActions = actions;

    dispatch(createDepartment(values));
    history.push("/profile/departments");
  };

  return (
    <div>
      <h1>Creating new department</h1>
      <AppForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="name"
          type="text"
          label="Name"
          placeholder="Enter department name"
        />

        <SubmitButton title="Submit" />
      </AppForm>
    </div>
  );
}
