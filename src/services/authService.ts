import config from "../config.json";
const accessTokenKey = config.accessTokenKey;
const refreshTokenKey = config.refreshTokenKey;

export const loginWithJwt = (
  accessToken: string,
  refreshToken: string
): void => {
  localStorage.setItem(accessTokenKey, accessToken);
  localStorage.setItem(refreshTokenKey, refreshToken);
};

export const logout = (): void => {
  localStorage.removeItem(accessTokenKey);
  localStorage.removeItem(refreshTokenKey);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(accessTokenKey);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(refreshTokenKey);
};

export const checkAuth = (): boolean => {
  return (
    !!localStorage.getItem(accessTokenKey) &&
    !!localStorage.getItem(refreshTokenKey)
  );
};
