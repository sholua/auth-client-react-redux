import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../store/apiActions";
import { Dispatch } from "redux";
import { User } from "../users/usersSlice";
import { RootState } from "../../app/store";
import { backend } from "../../apis/backend";
import { loginWithJwt } from "../../services/authService";

interface UserForRegister {
  firstName: string;
  email: string;
  password: string;
}

export const register = createAsyncThunk<
  User,
  UserForRegister,
  { rejectValue: Record<string, string> }
>("auth/register", async (user, { rejectWithValue }) => {
  try {
    const response = await backend.post("/auth/register", user);
    loginWithJwt(
      response.headers["x-access-token"],
      response.headers["x-refresh-token"]
    );
    return response.data;
  } catch (err) {
    if (err.response) return rejectWithValue(err.response.data);
  }
});

export interface AuthSlice {
  currentUser: unknown;
  loading: boolean;
  error: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    loading: false,
    error: "",
  } as AuthSlice,
  reducers: {
    authRequested: (auth, action) => {
      auth.loading = true;
      auth.error = "";
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
      auth.error = action.payload;
    },
  },
  extraReducers: {
    [register.pending.type]: (state, { payload }) => {
      state.loading = true;
      state.error = "";
    },
    [register.fulfilled.type]: (state, { payload }: PayloadAction<User>) => {
      state.loading = false;
      state.currentUser = payload;
    },
    [register.rejected.type]: (state, { payload }: PayloadAction<string>) => {
      state.loading = false;
      state.error = payload;
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

// export const register = (user: { email: string; password: string }) => (
//   dispatch: Dispatch
// ) => {
//   return dispatch(
//     apiCallBegan({
//       url: `${url}/register`,
//       method: "POST",
//       data: user,
//       onStart: authRequested.type,
//       onSuccess: authReceived.type,
//       onError: authRequestFailed.type,
//     })
//   );
// };

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

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
