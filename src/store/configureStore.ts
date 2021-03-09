import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer, { AppState } from "./reducer";
import toastMiddleware from "./middleware/toastMiddleware";
import apiMidleware from "./middleware/apiMiddleware";
import authMiddleware from "./middleware/authMiddleware";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware<AppState>(),
      toastMiddleware,
      apiMidleware,
      authMiddleware,
    ],
  });
}
