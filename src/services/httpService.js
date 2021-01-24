import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedErrors) {
    toast.error("An unexpected error occurred.");
  }

  return Promise.reject(error);
});

function setAccessToken(acessToken) {
  axios.defaults.headers.common["x-access-token"] = acessToken;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setAccessToken,
};

export default http;
