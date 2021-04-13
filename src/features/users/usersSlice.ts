import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../store/apiActions";
import moment from "moment";
import { Dispatch } from "redux";
import { AppState } from "../../app/store";

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
  lastFetch: null | number;
}

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  } as UsersSlice,
  reducers: {
    usersRequested: (users, action) => {
      users.loading = true;
    },

    usersReceived: (users, action) => {
      users.list = action.payload;
      users.loading = false;
      users.lastFetch = Date.now();
    },

    usersRequestFailed: (users, action) => {
      users.loading = false;
    },
  },
});

export const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
} = usersSlice.actions;

export default usersSlice.reducer;

// Action Creators
const url = "/users";

export const readUsers = () => (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  const { lastFetch } = getState().users;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 2) return;

  return dispatch(
    apiCallBegan({
      url,
      onStart: usersRequested.type,
      onSuccess: usersReceived.type,
      onError: usersRequestFailed.type,
    })
  );
};

// Selector

export const selectUsers = (state: AppState) => state.users.list;
