import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { apiCallBegan } from "../../store/apiActions";
import { Dispatch } from "redux";
import { RootState } from "../../app/store";
import { backend } from "../../apis/backend";

export interface Department {
  _id: string;
  name: string;
}

const departmentsAdapter = createEntityAdapter<Department>({
  selectId: (department) => department._id,
});

const initialState = departmentsAdapter.getInitialState({
  loading: false,
  error: "",
});

export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async () => {
    const response = await backend.get("/departments");
    return response.data;
  }
);

const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
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
  },
  extraReducers: {
    [fetchDepartments.pending.type]: (state, action) => {
      state.loading = true;
      state.error = "";
    },

    [fetchDepartments.fulfilled.type]: (
      state,
      action: PayloadAction<Department[]>
    ) => {
      departmentsAdapter.setAll(state, action.payload);
      state.loading = false;
    },

    [fetchDepartments.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  departmentReceived,
  departmentUpdated,
  departmentDeleted,
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

export const {
  selectAll: selectAllDepartments,
  selectById: selectDepartmentById,
  selectIds: selectDepartmentsIds,
} = departmentsAdapter.getSelectors((state: RootState) => state.departments);
