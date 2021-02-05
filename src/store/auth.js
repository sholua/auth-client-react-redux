import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./apiActions";

const slice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    loading: false,
    errors: null,
  },
  reducers: {
    authRequested: (auth, action) => {
      auth.loading = true;
      auth.errors = null;
    },

    authReceived: (auth, action) => {
      auth.currentUser = action.payload;
      auth.loading = false;
    },

    authLogout: (auth, action) => {
      auth.currentUser = null;
      auth.loading = false;
    },

    authRequestFailed: (auth, action) => {
      auth.loading = false;
      auth.errors = action.payload;
    },
  },
});

export const {
  authRequested,
  authReceived,
  authLogout,
  authRequestFailed,
} = slice.actions;

export default slice.reducer;

// Action Creators
const url = "/auth";

export const register = (user) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${url}/register`,
      method: "POST",
      data: user,
      onStart: authRequested.type,
      onSuccess: authReceived.type,
      onError: authRequestFailed.type,
    })
  );
};

export const login = (email, password) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${url}/login`,
      method: "POST",
      data: { email, password },
      onStart: authRequested.type,
      onSuccess: authReceived.type,
      onError: authRequestFailed.type,
    })
  );
};

export const getCurrentUser = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${url}/me`,
      onStart: authRequested.type,
      onSuccess: authReceived.type,
      onError: authRequestFailed.type,
    })
  );
};

export const logout = (refreshToken) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${url}/logout`,
      method: "DELETE",
      data: { params: { refreshToken } },
      onStart: authRequested.type,
      onSuccess: authLogout.type,
      onError: authRequestFailed.type,
    })
  );
};
