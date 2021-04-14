import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
import { backend } from "../../apis/backend";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await backend.get("/users");
  return response.data;
});

export interface User {
  _id: string;
  firstName: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface UsersSlice {
  list: User[];
  loading: boolean;
  error: null;
}

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  } as UsersSlice,
  reducers: {
    usersRequested: (users, action) => {
      users.loading = true;
    },

    usersReceived: (users, action) => {
      users.list = action.payload;
      users.loading = false;
      users.error = null;
    },

    usersRequestFailed: (users, action) => {
      users.loading = false;
      users.error = action.payload;
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled.type]: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
  },
});

export const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
} = usersSlice.actions;

export default usersSlice.reducer;

export const selectAllUsers = (state: AppState) => state.users.list;
