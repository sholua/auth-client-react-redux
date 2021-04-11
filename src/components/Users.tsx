import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readUsers, selectUsers } from "../store/users";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(readUsers());
  }, [dispatch]);

  return (
    <ul data-testid="users">
      {users.map((user) => (
        <li key={user._id}>
          {user.firstName} - <span>{user.email}</span>
        </li>
      ))}
    </ul>
  );
};

export default Users;
