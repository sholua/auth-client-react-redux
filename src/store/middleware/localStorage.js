import { apiCallSuccess } from "../api";
import config from "../../config.json";

const localStorageMiddleware = (store) => (next) => (action) => {
  if (
    action.type === apiCallSuccess.type &&
    action.payload.headers["x-access-token"]
  ) {
    localStorage.setItem(
      config.accessTokenKey,
      action.payload.headers["x-access-token"]
    );
  }

  if (
    action.type === apiCallSuccess.type &&
    action.payload.headers["x-refresh-token"]
  ) {
    localStorage.setItem(
      config.refreshTokenKey,
      action.payload.headers["x-refresh-token"]
    );
  }

  next(action);
};

export default localStorageMiddleware;
