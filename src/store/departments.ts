import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./apiActions";
import moment from "moment";
import { Dispatch } from "redux";
import { AppState } from "./reducer";

export interface Department {
  _id?: string;
  name: string;
}

export interface DepartmentsSlice {
  list: Department[];
  loading: boolean;
  errors: null | {};
  lastFetch: null | number;
}

const slice = createSlice({
  name: "departments",
  initialState: {
    list: [],
    loading: false,
    errors: null,
    lastFetch: null,
  } as DepartmentsSlice,
  reducers: {
    departmentsRequested: (departments, action) => {
      departments.loading = true;
      departments.errors = null;
    },

    departmentsReceived: (departments, action) => {
      departments.list = action.payload;
      departments.loading = false;
      departments.lastFetch = Date.now();
    },

    departmentReceived: (departments, action) => {
      departments.list = [...departments.list, action.payload];
      departments.loading = false;
      departments.lastFetch = Date.now();
    },

    departmentsRequestFailed: (departments, action) => {
      departments.loading = false;
      departments.errors = action.payload;
    },
  },
});

export const {
  departmentsRequested,
  departmentsReceived,
  departmentReceived,
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

export const createDepartment = (data: Department) => (dispatch: Dispatch) => {
  return dispatch(
    apiCallBegan({
      url,
      method: "POST",
      data,
      onStart: departmentsRequested.type,
      onSuccess: departmentReceived.type,
      onError: departmentsRequestFailed.type,
    })
  );
};

// Selector

// Memoization
// departments => get unresolved departments from the cache
