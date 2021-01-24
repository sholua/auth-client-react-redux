const accessTokenKey = "accessToken";
const refreshTokenKey = "refreshToken";

// http.setAccessToken(getAccessToken());

export function loginWithJwt(accessToken, refreshToken) {
  localStorage.setItem(accessTokenKey, accessToken);
  localStorage.setItem(refreshTokenKey, refreshToken);
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

const auth = {
  loginWithJwt,
  logout,
  getAccessToken,
  getRefreshToken,
};

export default auth;
