import { apiCallSuccess } from "../apiActions";
import { authLogout } from "../auth";
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

  if (action.type === authLogout.type) {
    authService.logout();
  }

  next(action);
};

export default localStorageMiddleware;
