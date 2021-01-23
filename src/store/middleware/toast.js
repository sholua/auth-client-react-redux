import { toast } from "react-toastify";

const toaster = (store) => (next) => (action) => {
  if (action.type === "error") toast.error(action.payload.message);
  else return next(action);
};

export default toaster;
