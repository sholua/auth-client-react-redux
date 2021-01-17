import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";
const accessTokenKey = "accessToken";
const refreshTokenKey = "refreshToken";

http.setAccessToken(getAccessToken());

export async function login(email, password) {
  const { data: accessToken } = await http.post(apiEndpoint, {
    email,
    password,
  });
  localStorage.setItem(accessTokenKey, accessToken);
}

export function loginWithJwt(accessToken, refreshToken) {
  localStorage.setItem(accessTokenKey, accessToken);
  localStorage.setItem(refreshTokenKey, refreshToken);
}

export function logout() {
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