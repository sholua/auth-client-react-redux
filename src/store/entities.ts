import { combineReducers } from "redux";
import usersReducer, { UsersSlice } from "../features/users/users";
import departmentsReducer, { DepartmentsSlice } from "./departments";

export interface EntitiesReducer {
  users: UsersSlice;
  departments: DepartmentsSlice;
}

export default combineReducers<EntitiesReducer>({
  users: usersReducer,
  departments: departmentsReducer,
});
