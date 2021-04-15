import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/usersSlice";
import departmentsReducer from "../features/departments/departmentsSlice";
import toastMiddleware from "./middleware/toastMiddleware";
import apiMidleware from "./middleware/apiMiddleware";
import authMiddleware from "./middleware/authMiddleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    departments: departmentsReducer,
  },
  middleware: [
    ...getDefaultMiddleware(),
    toastMiddleware,
    apiMidleware,
    authMiddleware,
  ],
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
