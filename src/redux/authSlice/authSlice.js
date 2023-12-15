import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios/axios-instance.js";

const initialState = { user: null, token: null, loading: {} };

export const sign_up = createAsyncThunk(
  "authentication/sign_up",
  async (values, { rejectWithValue }) => {
    console.log(values);
    return await axiosInstance("auth/signup", values)
      .then((res) => res)
      .catch((err) => rejectWithValue(err));
  }
);

export const sign_in = createAsyncThunk(
  "authentication/sign_in",
  async (values, { rejectWithValue }) => {
    console.log(values);
    return await axiosInstance
      .get("auth/signin", values)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err);
      });
  }
);

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sign_up.pending, (state) => {
      state.loading["sign_up"] = true;
    });
    builder.addCase(sign_up.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.loading["sign_up"] = false;
    });
    builder.addCase(sign_up.rejected, (state, { payload }) => {
      console.log(payload);
      state.loading["sign_up"] = false;
    });
    builder.addCase(sign_in.pending, (state) => {
      state.loading["sign_in"] = true;
    });
    builder.addCase(sign_in.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.loading["sign_in"] = false;
    });
    builder.addCase(sign_in.rejected, (state, { payload }) => {
      console.log(payload);
      state.loading["sign_in"] = false;
    });
  },
});

export default authSlice.reducer;
