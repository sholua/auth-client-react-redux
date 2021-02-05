import { backend } from "../../apis/backend";
import * as actions from "../apiActions";

const apiMiddleware = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = await backend.request({
      url,
      method,
      data,
    });
    // General
    dispatch(actions.apiCallSuccess({ headers: response.headers }));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (ex) {
    // General
    dispatch(actions.apiCallFailed(ex.response.data));
    // Specific
    if (onError && ex.response.status !== 500)
      dispatch({ type: onError, payload: ex.response.data });
  }
};

export default apiMiddleware;
