import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios/axios-instance.js";

const initialState = { loading: {}, tasks: [] };

export const createTask = createAsyncThunk(
  "task/createTask",
  async (values, { rejectWithValue }) => {
    console.log(values);
    return axiosInstance
      .post("/task", values)
      .then((res) => res)
      .catch((err) => rejectWithValue(err));
  }
);

export const getAllTasks = createAsyncThunk(
  "task/getTasks",
  async (_, { rejectWithValue }) => {
    return axiosInstance
      .get("/task")
      .then((res) => res)
      .catch((err) => rejectWithValue(err));
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.loading["getTasks"] = true;
      })
      .addCase(getAllTasks.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loading["getTasks"] = false;
      })
      .addCase(getAllTasks.rejected, (state, { payload }) => {
        console.log(payload);
        state.loading["getTasks"] = false;
      });
  },
});

export default taskSlice.reducer;
