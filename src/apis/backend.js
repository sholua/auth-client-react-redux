import axios from "axios";
import config from "../config.json";
import { toast } from "react-toastify";

export const backend = axios.create({
  baseURL: config.apiUrl,
});

backend.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedErrors) {
    toast.error("An unexpected error occurred.");
  }

  return Promise.reject(error);
});

export const setAuthHeader = (accessToken) => {
  Object.assign(backend.defaults, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
