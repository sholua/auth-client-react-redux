import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../store/apiActions";
import moment from "moment";
import { Dispatch } from "redux";
import { AppState } from "../../store/reducer";

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

const departmentsSlice = createSlice({
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

    departmentUpdated: (departments, action) => {
      const foundIndex = departments.list.findIndex(
        (x) => x._id === action.payload._id
      );
      departments.list[foundIndex] = action.payload;
      departments.loading = false;
      departments.errors = null;
      departments.lastFetch = Date.now();
    },

    departmentDeleted: (departments, action) => {
      departments.list = departments.list.filter(
        (item) => item._id !== action.payload._id
      );
      departments.loading = false;
      departments.errors = null;
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
  departmentUpdated,
  departmentDeleted,
  departmentsRequestFailed,
} = departmentsSlice.actions;

export default departmentsSlice.reducer;

// Action Creators
const url = "/departments";

export const createDepartment = (
  data: Department,
  redirectTo: string = "/home"
) => (dispatch: Dispatch) => {
  return dispatch(
    apiCallBegan({
      url,
      method: "POST",
      data,
      onStart: departmentsRequested.type,
      onSuccess: departmentReceived.type,
      onError: departmentsRequestFailed.type,
      redirectTo,
    })
  );
};

export const readDepartments = () => (
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

export const updateDepartment = (
  data: Department,
  id: string,
  redirectTo: string = "/home"
) => (dispatch: Dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${url}/${id}`,
      method: "PUT",
      data,
      onSuccess: departmentUpdated.type,
      onError: departmentsRequestFailed.type,
      redirectTo,
    })
  );
};

export const deleteDepartment = (id: string) => (dispatch: Dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${url}/${id}`,
      method: "DELETE",
      onSuccess: departmentDeleted.type,
      onError: departmentsRequestFailed.type,
    })
  );
};

// Selectors
export const selectDepartments = (state: AppState) =>
  state.entities.departments.list;

const selectDepartmentId = (state: AppState, departmentId: string) =>
  departmentId;

export const selectDepartmentById = createSelector(
  [selectDepartments, selectDepartmentId],
  (departments, id) => departments.find((department) => department._id === id)
);
