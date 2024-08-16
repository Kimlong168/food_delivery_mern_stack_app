import { createBrowserRouter } from "react-router-dom";
import AdminRoute from "./components/authentication/AdminRoute";
import PrivateRoute from "./components/authentication/PrivateRoute";
import GuestRoute from "./components/authentication/GuestRoute";
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Profile from "./pages/profile";
import Search from "./pages/search";
import Error404 from "./pages/Error404";
import Unauthenticated from "./pages/Unauthenticated";

import LoginForm from "./components/authentication/LoginForm";
import SignUpForm from "./components/authentication/SignUpForm";

import Dashboard from "./pages/admin/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/profile",
        element: <PrivateRoute element={Profile} />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminRoute element={AdminLayout} />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },

  {
    path: "/login",
    element: <GuestRoute element={LoginForm} />,
  },
  {
    path: "/sign-up",
    element: <GuestRoute element={SignUpForm} />,
  },
  {
    path: "/unauthenticated",
    element: <Unauthenticated />,
  },

  {
    path: "*",
    element: <Error404 />,
  },
]);

export default router;
