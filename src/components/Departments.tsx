import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { loadDepartments } from "../store/departments";
import { AppState } from "../store/reducer";
import { Link, useRouteMatch } from "react-router-dom";

export default function Departments() {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const departments = useSelector(
    (state: AppState) => state.entities.departments.list
  );

  useEffect(() => {
    dispatch(loadDepartments());
  }, [dispatch]);

  return (
    <div>
      <Link to={`${url}/new`}>
        <Button size="sm">Create new department</Button>
      </Link>
      <ul data-testid="departments">
        {departments.map((department) => (
          <li key={department._id}>
            {department.name} <Link to={`${url}/${department._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
