import config from "../config.json";
const accessTokenKey = config.accessTokenKey;
const refreshTokenKey = config.refreshTokenKey;

export const loginWithJwt = (accessToken, refreshToken) => {
  localStorage.setItem(accessTokenKey, accessToken);
  localStorage.setItem(refreshTokenKey, refreshToken);
};

export const logout = () => {
  localStorage.removeItem(accessTokenKey);
  localStorage.removeItem(refreshTokenKey);
};

export const getAccessToken = () => {
  return localStorage.getItem(accessTokenKey);
};

export const getRefreshToken = () => {
  return localStorage.getItem(refreshTokenKey);
};
