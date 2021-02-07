import { toast } from "react-toastify";
import { apiCallFailed } from "../apiActions";
import { Middleware, Dispatch } from "redux";
import { ApiActions } from "../AppAction";
import { AppState } from "../reducer";

const toastMiddleware: Middleware<{}, AppState> = () => (next: Dispatch) => (
  action: ApiActions
) => {
  if (action.type === apiCallFailed.type) toast.error(action.payload);
  else return next(action);
};

export default toastMiddleware;
