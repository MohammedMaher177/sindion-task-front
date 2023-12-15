import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice/AuthSlice.js";
import taskReducer from "./TaskSlice/TaskSlice.js";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});
