import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice.js";
import taskReducer from "./TaskSlice/TaskSlice.js";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
  },
});
