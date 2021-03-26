import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./apiActions";
import moment from "moment";
import { Dispatch } from "redux";
import { AppState } from "./reducer";

export interface Department {
  _id: string;
  name: string;
}

export interface DepartmentsSlice {
  list: Department[];
  loading: boolean;
  lastFetch: null | number;
}

const slice = createSlice({
  name: "departments",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  } as DepartmentsSlice,
  reducers: {
    departmentsRequested: (departments, action) => {
      departments.loading = true;
    },

    departmentsReceived: (departments, action) => {
      departments.list = action.payload;
      departments.loading = false;
      departments.lastFetch = Date.now();
    },

    departmentsRequestFailed: (departments, action) => {
      departments.loading = false;
    },
  },
});

export const {
  departmentsRequested,
  departmentsReceived,
  departmentsRequestFailed,
} = slice.actions;

export default slice.reducer;

// Action Creators
const url = "/departments";

export const loadDepartments = () => (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  const { lastFetch } = getState().entities.departments;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 2) return;

  return dispatch(
    apiCallBegan({
      url,
      onStart: departmentsRequested.type,
      onSuccess: departmentsReceived.type,
      onError: departmentsRequestFailed.type,
    })
  );
};

// Selector

// Memoization
// departments => get unresolved departments from the cache
