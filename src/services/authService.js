import { setAuthHeader } from "../apis/backend";
const accessTokenKey = "accessToken";
const refreshTokenKey = "refreshToken";

setAuthHeader(getAccessToken());

export function loginWithJwt(accessToken, refreshToken) {
  localStorage.setItem(accessTokenKey, accessToken);
  localStorage.setItem(refreshTokenKey, refreshToken);
  setAuthHeader(getAccessToken());
}

export function logout() {
  localStorage.removeItem(accessTokenKey);
  localStorage.removeItem(refreshTokenKey);
}

export function getAccessToken() {
  return localStorage.getItem(accessTokenKey);
}

export function getRefreshToken() {
  return localStorage.getItem(refreshTokenKey);
}

const authService = {
  loginWithJwt,
  logout,
  getAccessToken,
  getRefreshToken,
};

export default authService;
