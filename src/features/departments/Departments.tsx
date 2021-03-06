import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDepartments,
  deleteDepartment,
  selectAllDepartments,
} from "./departmentsSlice";
import { Link, useRouteMatch } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { isAdmin } from "../../services/authService";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function Departments() {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const departments = useSelector(selectAllDepartments);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleDelete = (id: string) => () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteItem(id),
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  };

  const deleteItem = (id: string) => {
    dispatch(deleteDepartment(id));
  };

  return (
    <div>
      {isAdmin() && (
        <Link to={`${url}/new`}>
          <Button size="sm">Create new department</Button>
        </Link>
      )}
      <ul data-testid="departments">
        {departments.map((department) => (
          <li key={department._id}>
            {department.name}
            {isAdmin() && (
              <span>
                <Link to={`${url}/${department._id}`}>Edit</Link>
                {" / "}
                {department._id && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleDelete(department._id)}
                  >
                    Delete
                  </Button>
                )}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
