import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../store/apiActions";
import { Dispatch } from "redux";
import { User } from "../users/users";
import { AppState } from "../../store/reducer";

export interface AuthSlice {
  currentUser: unknown;
  loading: boolean;
  errors: null | { [key: string]: string };
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    loading: false,
    errors: null,
  } as AuthSlice,
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
} = authSlice.actions;

export default authSlice.reducer;

// Action Interfaces
export interface AuthRequestedAction {
  type: typeof authRequested.type;
}

export interface AuthReceivedAction {
  type: typeof authReceived.type;
  payload: User[];
}

export interface AuthLogoutAction {
  type: typeof authLogout.type;
}

export interface AuthRequestFailedAction {
  type: typeof authRequestFailed.type;
  payload: { [key: string]: string } | string;
}

// Action Creators
const url = "/auth";

export const register = (user: { email: string; password: string }) => (
  dispatch: Dispatch
) => {
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

export const login = (email: string, password: string) => (
  dispatch: Dispatch
) => {
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

export const getCurrentUser = () => (dispatch: Dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${url}/me`,
      onStart: authRequested.type,
      onSuccess: authReceived.type,
      onError: authRequestFailed.type,
    })
  );
};

export const logout = (refreshToken: string | null) => (dispatch: Dispatch) => {
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

export const avatarUploaded = (user: User) => (dispatch: Dispatch) => {
  return dispatch({ type: authReceived.type, payload: user });
};

// Selectors

export const selectCurrentUser = (state: AppState) => state.auth.currentUser;
