import axios from "axios";
import config from "../config.json";
import { toast } from "react-toastify";
import {
  getAccessToken,
  getRefreshToken,
  loginWithJwt,
} from "../services/authService";

export const backend = axios.create({
  baseURL: config.apiUrl,
});

backend.interceptors.request.use((request) => {
  const accessToken = getAccessToken();
  if (accessToken) request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});

backend.interceptors.response.use(null, (error) => {
  const originalRequest = error.config;

  if (
    error.response.status === 401 &&
    originalRequest.url.includes("/auth/refresh_token")
  ) {
    console.log("Loop with axios interseptors when refresh token!!!");
    //  router.push('/login');
    return Promise.reject(error);
  }

  const refreshToken = getRefreshToken();
  if (
    error.response.status === 401 &&
    !originalRequest._retry &&
    refreshToken
  ) {
    originalRequest._retry = true;
    return backend
      .post("/auth/refresh_token", { refreshToken })
      .then((response) => {
        if (response.status === 201) {
          const { accessToken, refreshToken } = response.data;
          loginWithJwt(accessToken, refreshToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        }
      });
  }

  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedErrors) {
    toast.error("An unexpected error occurred.");
  }

  return Promise.reject(error);
});
