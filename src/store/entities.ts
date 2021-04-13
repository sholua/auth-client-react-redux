import { combineReducers } from "redux";
import usersReducer, { UsersSlice } from "../features/users/usersSlice";
import departmentsReducer, {
  DepartmentsSlice,
} from "../features/departments/departmentsSlice";

export interface EntitiesReducer {
  users: UsersSlice;
  departments: DepartmentsSlice;
}

export default combineReducers<EntitiesReducer>({
  users: usersReducer,
  departments: departmentsReducer,
});
