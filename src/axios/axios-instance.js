import axios from "axios";
import { baseUrl } from "../util/util.js";
import store from "../redux/store.js";


export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (req) => {
    const token =
      localStorage.getItem("access-token") //|| store.getState().auth.token;
    req.headers.Authorization = token ? token : "";
    return req;
  },
  async (error) => Promise.reject(error)
);

