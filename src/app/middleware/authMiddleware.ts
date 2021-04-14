import { apiCallSuccess } from "../../store/apiActions";
import { authLogout } from "../../features/auth/authSlice";
import { loginWithJwt, logout } from "../../services/authService";
import { Dispatch, Middleware } from "redux";
import { ApiCallSuccessAction } from "../../store/apiActions";

const authMiddeware: Middleware<{}> = () => (next: Dispatch) => (
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
