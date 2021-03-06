import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Dispatch } from "redux";

import { User } from "../users/usersSlice";
import { RootState } from "../../app/store";
import { backend } from "../../apis/backend";
import {
  loginWithJwt,
  logout as localStorageLogout,
} from "../../services/authService";

interface UserForRegister {
  firstName: string;
  email: string;
  password: string;
}

interface LoginCredentials {
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

export const login = createAsyncThunk<
  User,
  LoginCredentials,
  { rejectValue: Record<string, string> }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await backend.post("/auth/login", credentials);
    loginWithJwt(
      response.headers["x-access-token"],
      response.headers["x-refresh-token"]
    );
    return response.data;
  } catch (err) {
    if (err.response) return rejectWithValue(err.response.data);
  }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (refreshToken: string) => {
    const response = await backend.delete("/auth/logout", {
      data: { refreshToken },
    });
    localStorageLogout();
    toast.success(response.data);
    return response.data;
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    const response = await backend.get("/auth/me");
    return response.data;
  }
);

export const avatarUploaded = (user: User) => (dispatch: Dispatch) => {
  return dispatch({ type: currentUserReceived.type, payload: user });
};

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
    currentUserReceived: (auth, action) => {
      auth.currentUser = action.payload;
      auth.loading = false;
    },
  },
  extraReducers: {
    [register.pending.type]: (state, action) => {
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

    [login.pending.type]: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    [login.fulfilled.type]: (state, { payload }: PayloadAction<User>) => {
      state.loading = false;
      state.currentUser = payload;
    },
    [login.rejected.type]: (state, { payload }: PayloadAction<string>) => {
      state.loading = false;
      state.error = payload;
    },

    [logout.pending.type]: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    [logout.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.currentUser = null;
    },
    [logout.rejected.type]: (state, { payload }: PayloadAction<string>) => {
      state.loading = false;
      state.error = payload;
    },

    [getCurrentUser.pending.type]: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    [getCurrentUser.fulfilled.type]: (
      state,
      { payload }: PayloadAction<User>
    ) => {
      state.loading = false;
      state.currentUser = payload;
    },
    [getCurrentUser.rejected.type]: (
      state,
      { payload }: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { currentUserReceived } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
