import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUsers } from "../store/users";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.entities.users.list);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <ul>
      {users.map((user) => (
        <li key={user._id}>
          {user.firstName} - <span>{user.email}</span>
        </li>
      ))}
    </ul>
  );
};

export default Users;
