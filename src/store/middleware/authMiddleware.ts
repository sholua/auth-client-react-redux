import { apiCallSuccess } from "../apiActions";
import { authLogout } from "../auth";
import { loginWithJwt, logout } from "../../services/authService";
import { Dispatch, Middleware } from "redux";
import { AppState } from "../reducer";
import { ApiCallSuccessAction } from "../apiActions";

const authMiddeware: Middleware<{}, AppState> = () => (next: Dispatch) => (
  action: ApiCallSuccessAction
) => {
  const isAuthenticated =
    action.type === apiCallSuccess.type &&
    action.payload.headers["x-access-token"] &&
    action.payload.headers["x-refresh-token"];

  if (isAuthenticated) {
    loginWithJwt(
      action.payload.headers["x-access-token"],
      action.payload.headers["x-refresh-token"]
    );
  }

  if (action.type === authLogout.type) {
    logout();
  }

  next(action);
};

export default authMiddeware;
