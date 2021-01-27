import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import toastMiddleware from "./middleware/toastMiddleware";
import apiMidleware from "./middleware/apiMiddleware";
import localStorageMiddleware from "./middleware/localStorageMiddleware";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      toastMiddleware,
      apiMidleware,
      localStorageMiddleware,
    ],
  });
}
