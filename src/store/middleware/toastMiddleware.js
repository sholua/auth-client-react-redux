import { toast } from "react-toastify";
import { apiCallFailed } from "../apiActions";

const toastMiddleware = (store) => (next) => (action) => {
  if (action.type === apiCallFailed.type) toast.error(action.payload);
  else return next(action);
};

export default toastMiddleware;
