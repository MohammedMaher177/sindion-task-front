import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import AppRoutes from "./routes.js";
import { useEffect } from "react";
import { getUserToken } from "./redux/AuthSlice/AuthSlice.js";
import { addAxiosHeader, removeAxiosHeader } from "./axios/axios-instance.js";
import { getAllTasks } from "./redux/TaskSlice/TaskSlice.js";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector(({ auth }) => auth);
  if (token) {
    addAxiosHeader(token);
    dispatch(getAllTasks())
  } else {
    removeAxiosHeader();
  }

  useEffect(() => {
    dispatch(getUserToken());
  }, []);
  return <AppRoutes />;
}

export default App;
