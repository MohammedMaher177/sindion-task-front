import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios/axios-instance.js";

export const sign_up = createAsyncThunk(
  "authentication/signup",
  async (values) => {
    console.log(values);
    const result = await axiosInstance("auth/signup", values)
      .then((res) => res)
      .catch((err) => err);
    console.log(result);
    return result;
  }
);
export const sign_in = createAsyncThunk(
  "authentication/signin",
  async (values) => {
    // console.log(values);
    const result = await axiosInstance
      .get("auth/signin", values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(result);
    return result;
  }
);
