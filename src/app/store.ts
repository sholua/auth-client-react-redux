import {
  AnyAction,
  configureStore,
  getDefaultMiddleware,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

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

export type AppDispatch = typeof store.dispatch &
  ThunkDispatch<RootState, void, AnyAction>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
