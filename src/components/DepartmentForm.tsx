import React, { useEffect } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormikHelpers } from "formik";
import { useHistory, useParams } from "react-router-dom";

import {
  createDepartment,
  editDepartment,
  selectDepartmentById,
} from "../store/departments";
import { AppForm, AppFormField, SubmitButton } from "./forms";
import { AppState } from "../store/reducer";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(4).required().label("name"),
});

let formActions: FormikHelpers<{}>;

interface DepartmentFormValues {
  name: string;
}

export default function DepartmentForm() {
  const { id } = useParams<{ id: string }>();
  const department = useSelector((state: AppState) =>
    selectDepartmentById(state, id)
  );
  const loading = useSelector(
    (state: AppState) => state.entities.departments.loading
  );
  const errors = useSelector(
    (state: AppState) => state.entities.departments.errors
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const initialValues: DepartmentFormValues = {
    name: department ? department.name : "",
  };

  useEffect(() => {
    if (formActions) {
      formActions.setSubmitting(loading);

      if (errors) {
        formActions.setErrors(errors);
      }
    }
    // TODO: load department by id
    if (!department && id !== "new")
      console.log("Should load department by id");
  }, [loading, errors, department, id]);

  const handleSubmit = (
    values: DepartmentFormValues,
    actions: FormikHelpers<{}>
  ) => {
    formActions = actions;

    if (id === "new") dispatch(createDepartment(values));
    if (department && department._id)
      dispatch(editDepartment(values, department._id));
    if (!errors) history.push("/profile/departments");
  };

  return (
    <div>
      {id === "new" && <h1>Creating new department</h1>}
      {id !== "new" && <h1>Update department</h1>}

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
