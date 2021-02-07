import { toast } from "react-toastify";
import { apiCallFailed } from "../apiActions";
import { Middleware, Dispatch } from "redux";
import { ApiActions } from "../AppAction";

const toastMiddleware: Middleware = () => (next: Dispatch) => (
  action: ApiActions
) => {
  if (action.type === apiCallFailed.type) toast.error(action.payload);
  else return next(action);
};

export default toastMiddleware;
