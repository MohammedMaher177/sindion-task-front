import axios from "axios";
import { baseUrl } from "../util/util.js";

let axiosInstance = axios.create({
  baseURL: baseUrl,
});

export function addAxiosHeader(token) {
  axiosInstance.defaults.headers.common["Authorization"] = token
}
export function removeAxiosHeader() {
  axiosInstance.defaults.headers.common["Authorization"] = undefined;
}

// axiosInstance.interceptors.request.use(
//   (req) => {
//     const token = localStorage.getItem("access-token"); //|| store.getState().auth.token;
//     req.headers.Authorization = token ? token : "";
//     return req;
//   },
//   async (error) => Promise.reject(error)
// );

export default axiosInstance;
