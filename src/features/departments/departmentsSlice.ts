import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import moment from "moment";
import { RootState } from "../../app/store";
import { backend } from "../../apis/backend";

export interface Department {
  _id: string;
  name: string;
}

interface ValidationErrors extends Record<string, string> {}

const departmentsAdapter = createEntityAdapter<Department>({
  selectId: (department) => department._id,
});

const initialState = departmentsAdapter.getInitialState({
  loading: false,
  error: "",
  lastFetch: null as null | number,
});

export const createDepartment = createAsyncThunk<
  Department,
  Omit<Department, "_id">,
  {
    rejectValue: ValidationErrors;
  }
>("departments/createDepartment", async (department, { rejectWithValue }) => {
  try {
    const response = await backend.post("/departments", department);
    return response.data;
  } catch (err) {
    if (err.response) return rejectWithValue(err.response.data);
  }
});

export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async () => {
    const response = await backend.get("/departments");
    return response.data as Department[];
  },
  {
    condition: (_, { getState }) => {
      const {
        departments: { loading, lastFetch },
      } = getState() as RootState;

      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

      if (loading || diffInMinutes < 2) {
        return false;
      }
    },
  }
);

export const fetchDepartmentById = createAsyncThunk<Department, string>(
  "departments/fetchDepartmentById",
  async (departmentId) => {
    const response = await backend.get(`/departments/${departmentId}`);
    return response.data as Department;
  }
);

export const updateDepartment = createAsyncThunk<
  Department,
  Department,
  { rejectValue: ValidationErrors }
>("departments/updateDepartment", async (department, { rejectWithValue }) => {
  const { _id, ...fields } = department;
  try {
    const response = await backend.put(`/departments/${_id}`, fields);
    return response.data;
  } catch (err) {
    let error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});

export const deleteDepartment = createAsyncThunk<Department, string>(
  "departments/deleteDepartment",
  async (departmentId) => {
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
      state.lastFetch = Date.now();
    },

    [fetchDepartments.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.error = action.payload;
      state.loading = false;
    },

    [fetchDepartmentById.fulfilled.type]: departmentsAdapter.upsertOne,

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
