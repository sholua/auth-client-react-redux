import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./apiActions";

const slice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    loading: false,
  },
  reducers: {
    authRequested: (auth, action) => {
      auth.loading = true;
    },

    authReceived: (auth, action) => {
      auth.currentUser = action.payload;
      auth.loading = false;
    },

    authRequestFailed: (auth, action) => {
      auth.loading = false;
    },
  },
});

export const { authRequested, authReceived, authRequestFailed } = slice.actions;

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
