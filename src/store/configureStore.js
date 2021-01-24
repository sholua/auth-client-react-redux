import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import toaster from "./middleware/toast";
import api from "./middleware/api";
import localStorageMiddleware from "./middleware/localStorage";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      toaster,
      api,
      localStorageMiddleware,
    ],
  });
}
