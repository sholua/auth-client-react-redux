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

// TODO: Send this shape of errors from backend
interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

const departmentsAdapter = createEntityAdapter<Department>({
  selectId: (department) => department._id,
});

const initialState = departmentsAdapter.getInitialState({
  loading: false,
  error: "",
  lastFetch: null as null | number,
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

      if (loading || diffInMinutes < 5) {
        return false;
      }
    },
  }
);

export const createDepartment = createAsyncThunk(
  "departments/createDepartment",
  async (initialDepartment: Omit<Department, "_id">) => {
    const response = await backend.post("/departments", initialDepartment);
    return response.data;
  }
);

export const updateDepartment = createAsyncThunk<
  Department,
  { id: string } & Partial<Department>,
  {
    rejectValue: ValidationErrors;
  }
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
      state.lastFetch = Date.now();
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
