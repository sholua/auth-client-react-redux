import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import authReducer, { AuthSlice } from "../features/auth/authSlice";
import usersReducer, { UsersSlice } from "../features/users/usersSlice";
import departmentsReducer, {
  DepartmentsSlice,
} from "../features/departments/departmentsSlice";
import toastMiddleware from "./middleware/toastMiddleware";
import apiMidleware from "./middleware/apiMiddleware";
import authMiddleware from "./middleware/authMiddleware";

export interface AppState {
  auth: AuthSlice;
  users: UsersSlice;
  departments: DepartmentsSlice;
}

export default configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    departments: departmentsReducer,
  },
  middleware: [
    ...getDefaultMiddleware<AppState>(),
    toastMiddleware,
    apiMidleware,
    authMiddleware,
  ],
  devTools: process.env.NODE_ENV !== "production",
});
