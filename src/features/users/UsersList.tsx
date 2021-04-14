import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, selectAllUsers } from "./usersSlice";

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  console.log("users!!!!!!", users);

  useEffect(() => {
    dispatch(fetchUsers());
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

export default UsersList;
