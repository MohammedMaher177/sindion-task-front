import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance.js";

const initialState = { loading: {}, tasks: [], error: {} };

export const createTask = createAsyncThunk(
  "task/createTask",
  async (values, { rejectWithValue }) => {
    console.log(values);
    return axiosInstance
      .post("/task", values)
      .then(({ data }) => data.task)
      .catch(({ response }) => rejectWithValue(response.data));
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (values, { rejectWithValue }) => {
    const { _id } = values;
    delete values._id;
    return await axiosInstance
      .put(`/task/${_id}`, values)
      .then(({ data }) => data.result)
      .catch(({ response }) => rejectWithValue(response.data));
  }
);

export const getAllTasks = createAsyncThunk(
  "task/getTasks",
  async (_, { rejectWithValue }) => {
    return axiosInstance
      .get("/task")
      .then(({ data }) => data.result)
      .catch(({ response }) => rejectWithValue(response.data));
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id, { rejectWithValue }) => {
    return await axiosInstance
      .delete(`task/${id}`)
      .then(({ data }) => data.result)
      .catch(({ response }) => rejectWithValue(response.data));
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
        state.tasks = payload;
      })
      .addCase(getAllTasks.rejected, (state, { payload }) => {
        console.log(payload);
        state.loading["getTasks"] = false;
      })
      .addCase(createTask.pending, (state) => {
        state.loading["createTask"] = true;
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        state.loading["createTask"] = false;
        state.error["createTask"] = null;
        state.tasks.push(payload);
      })
      .addCase(createTask.rejected, (state, { payload }) => {
        console.log(payload);
        state.loading["createTask"] = false;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading["deleteTask"] = true;
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.loading["deleteTask"] = false;
        state.tasks = state.tasks.filter((el) => el._id !== payload._id);
      })
      .addCase(deleteTask.rejected, (state, { payload }) => {
        state.loading["deleteTask"] = false;
        console.log(payload);
      })
      .addCase(updateTask.pending, (state) => {
        state.loading["updateTask"] = true;
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        state.loading["updateTask"] = false;
        console.log(payload);
        state.tasks = state.tasks.map((el) => {
          if (el._id === payload._id) {
            el = payload;
          }
          return el;
        });
        // state.tasks = state.tasks.filter((el) => el._id !== payload._id);
      })
      .addCase(updateTask.rejected, (state, { payload }) => {
        state.loading["updateTask"] = false;
        console.log(payload);
      });
  },
});

export default taskSlice.reducer;
