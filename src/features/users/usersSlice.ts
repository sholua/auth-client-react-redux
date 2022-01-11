import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import moment from "moment";
import { RootState } from "../../app/store";
import { backend } from "../../apis/backend";

export interface User {
  _id: string;
  firstName: string;
  email: string;
  role: string;
  avatar?: string;
}

const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user._id,
});

const initialState = usersAdapter.getInitialState({
  loading: false,
  error: "",
  lastFetch: null as null | number,
});

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await backend.get("/users");
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      const {
        users: { loading, lastFetch },
      } = getState() as RootState;

      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

      if (loading || diffInMinutes < 2) {
        return false;
      }
    },
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending.type]: (state, action) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<User[]>) => {
      usersAdapter.setAll(state, action.payload);
      state.loading = false;
      state.lastFetch = Date.now();
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default usersSlice.reducer;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersIds,
} = usersAdapter.getSelectors((state: RootState) => state.users);
