import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, {
  addAxiosHeader,
  removeAxiosHeader,
} from "../../axios/axios-instance.js";

const initialState = { user: null, token: null, loading: {}, error: {} };

export const sign_up = createAsyncThunk(
  "authentication/sign_up",
  async (values, { rejectWithValue }) => {
    return await axiosInstance
      .post("auth/signup", values)
      .then(({ data }) => data.token)
      .catch(({ response }) => rejectWithValue(response.data));
  }
);

export const sign_in = createAsyncThunk(
  "authentication/sign_in",
  async (values, { rejectWithValue }) => {
    return await axiosInstance
      .post("auth/signin", values)
      .then(({ data }) => data.token)
      .catch(({ response }) => rejectWithValue(response.data));
  }
);

const saveUserData = (token) => {
  localStorage.setItem("access-token", token);
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    getUserToken: (state) => {
      if (localStorage.getItem("access-token")) {
        state.token = localStorage.getItem("access-token");
      }
    },
    logOut: (state) => {
      localStorage.removeItem("access-token");
      state.token = null;
      removeAxiosHeader();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sign_up.pending, (state) => {
      state.loading["sign_up"] = true;
      state.error["sign_up"] = null;
    });
    builder.addCase(sign_up.fulfilled, (state, { payload }) => {
      state.loading["sign_up"] = false;
      state.token = payload;
      state.error["sign_up"] = null;
      saveUserData(payload);
      addAxiosHeader(payload);
    });
    builder.addCase(sign_up.rejected, (state, { payload }) => {
      state.loading["sign_up"] = false;
      state.error["sign_up"] = payload.error;
    });
    builder.addCase(sign_in.pending, (state) => {
      state.loading["sign_in"] = true;
      state.error["sign_in"] = null;
    });
    builder.addCase(sign_in.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.error["sign_in"] = null;
      state.loading["sign_in"] = false;
      state.token = payload;
      saveUserData(payload);
      addAxiosHeader(payload);
    });
    builder.addCase(sign_in.rejected, (state, { payload }) => {
      state.loading["sign_in"] = false;
      state.error["sign_in"] = payload.error;
    });
  },
});

export default authSlice.reducer;

export const { getUserToken, logOut } = authSlice.actions;
