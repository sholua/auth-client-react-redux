import { toast } from "react-toastify";
import { apiCallFailed } from "../../store/apiActions";
import { Middleware, Dispatch } from "redux";
import { ApiActions } from "../../store/AppAction";
import { AppState } from "../store";

const toastMiddleware: Middleware<{}, AppState> = () => (next: Dispatch) => (
  action: ApiActions
) => {
  if (action.type === apiCallFailed.type) toast.error(action.payload);
  else return next(action);
};

export default toastMiddleware;
