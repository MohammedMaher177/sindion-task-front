import axios from "axios";
import { baseUrl } from "../util/util.js";
import store from "../redux/store.js";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("access-token"); //|| store.getState().auth.token;
    // req.headers.Authorization = token ? token : "";
    req.headers.Authorization =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2IxYjM2YWYwM2RmZmJkMmM5MjM1YiIsImVtYWlsIjoiTW9oYW1tZWRAZ21haWwuY29tIiwiaWF0IjoxNzAyNjMwNjM2fQ.tvMjB2Yu1zWfDSWL-UbBLGCTjkAd0n2jo8bznlp5PQU";
    return req;
  },
  async (error) => Promise.reject(error)
);
