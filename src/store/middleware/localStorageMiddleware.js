import { apiCallSuccess } from "../apiActions";
import authService from "../../services/authService";

const localStorageMiddleware = (store) => (next) => (action) => {
  const isAuthenticated =
    action.type === apiCallSuccess.type &&
    action.payload.headers["x-access-token"] &&
    action.payload.headers["x-refresh-token"];

  if (isAuthenticated) {
    authService.loginWithJwt(
      action.payload.headers["x-access-token"],
      action.payload.headers["x-refresh-token"]
    );
  }

  next(action);
};

export default localStorageMiddleware;
