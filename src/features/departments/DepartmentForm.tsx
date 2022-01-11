import React, { useEffect } from "react";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { FormikHelpers } from "formik";
import { useParams, useHistory } from "react-router-dom";

import {
  createDepartment,
  updateDepartment,
  selectDepartmentById,
  Department,
  fetchDepartmentById,
} from "./departmentsSlice";
import { AppForm, AppFormField, SubmitButton } from "../common";
import { RootState, useAppDispatch } from "../../app/store";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(4).required().label("name"),
});

export default function DepartmentForm() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const isEditing = id !== "new";
  const department = useSelector((state: RootState) =>
    selectDepartmentById(state, id)
  );

  useEffect(() => {
    if (!department && isEditing) dispatch(fetchDepartmentById(id));
  }, [department, isEditing, id, dispatch]);

  interface FormValues extends Omit<Department, "_id"> {}

  const initialValues: FormValues = {
    name: department ? department.name : "",
  };

  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    formikHelpers.setSubmitting(true);

    if (!isEditing) {
      const resultAction = await dispatch(createDepartment(values));
      if (createDepartment.fulfilled.match(resultAction)) {
        history.push("/profile/departments");
      } else {
        if (resultAction.payload) formikHelpers.setErrors(resultAction.payload);
      }
    }

    if (isEditing && department && department._id) {
      const resultAction = await dispatch(
        updateDepartment({ _id: department._id, ...values })
      );
      if (updateDepartment.fulfilled.match(resultAction)) {
        history.push("/profile/departments");
      } else {
        if (resultAction.payload) formikHelpers.setErrors(resultAction.payload);
      }
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <div>
      {!isEditing && <h1>Creating new department</h1>}
      {isEditing && <h1>Update department</h1>}

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
