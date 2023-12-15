import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layout/MainLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import Signin from "./pages/Signin/Signin.jsx";
import Register from "./pages/Register/Register.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

const AppRoutes = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        { path: "signin", element: <Signin /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};
export default AppRoutes;
