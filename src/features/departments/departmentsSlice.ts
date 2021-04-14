import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { backend } from "../../apis/backend";
import history from "../../history";

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
    return response.data as Department[];
  }
);

export const createDepartment = createAsyncThunk(
  "departments/createDepartment",
  async (initialDepartment: Omit<Department, "_id">) => {
    const response = await backend.post("/departments", initialDepartment);
    history.push("/profile/departments");
    return response.data;
  }
);

export const updateDepartment = createAsyncThunk(
  "departments/updateDepartment",
  async ({
    values,
    departmentId,
  }: {
    values: Omit<Department, "_id">;
    departmentId: string;
  }) => {
    const response = await backend.put(`/departments/${departmentId}`, values);
    history.push("/profile/departments");
    return response.data;
  }
);

export const deleteDepartment = createAsyncThunk(
  "departments/deleteDepartment",
  async (departmentId: string) => {
    const response = await backend.delete(`/departments/${departmentId}`);
    return response.data._id;
  }
);

const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {},
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

    [createDepartment.fulfilled.type]: departmentsAdapter.addOne,

    [updateDepartment.fulfilled.type]: departmentsAdapter.upsertOne,

    [deleteDepartment.fulfilled.type]: departmentsAdapter.removeOne,
  },
});

export default departmentsSlice.reducer;

export const {
  selectAll: selectAllDepartments,
  selectById: selectDepartmentById,
  selectIds: selectDepartmentsIds,
} = departmentsAdapter.getSelectors((state: RootState) => state.departments);
