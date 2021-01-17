import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";
const accessTokenKey = "accessToken";
const refreshTokenKey = "refreshToken";

http.setAccessToken(getAccessToken());

export async function login(email, password) {
  const response = await http.post(`${apiEndpoint}/login`, {
    email,
    password,
  });

  loginWithJwt(
    response.headers["x-access-token"],
    response.headers["x-refresh-token"]
  );
}

export function loginWithJwt(accessToken, refreshToken) {
  localStorage.setItem(accessTokenKey, accessToken);
  localStorage.setItem(refreshTokenKey, refreshToken);
}

export async function logout() {
  await http.delete(`${apiEndpoint}/logout`, {
    data: {
      refreshToken: localStorage.getItem(refreshTokenKey),
    },
  });
  localStorage.removeItem(accessTokenKey);
  localStorage.removeItem(refreshTokenKey);
}

export function getCurrentUser() {
  try {
    const accessToken = localStorage.getItem(accessTokenKey);
    return jwtDecode(accessToken);
  } catch (ex) {
    return null;
  }
}

export function getAccessToken() {
  return localStorage.getItem(accessTokenKey);
}

const auth = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt: getAccessToken,
};

export default auth;
