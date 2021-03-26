import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadDepartments } from "../store/departments";
import { AppState } from "../store/reducer";

export default function Departments() {
  const dispatch = useDispatch();
  const departments = useSelector(
    (state: AppState) => state.entities.departments.list
  );

  useEffect(() => {
    dispatch(loadDepartments());
  }, [dispatch]);

  return (
    <ul data-testid="departments">
      {departments.map((department) => (
        <li key={department._id}>{department.name}</li>
      ))}
    </ul>
  );
}
