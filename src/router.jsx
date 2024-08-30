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
import Order from "./pages/admin/order";
import Product from "./pages/admin/product";
import CreateProduct from "./pages/admin/product/CreateProduct";
import UpdateProduct from "./pages/admin/product/UpdateProduct";
import User from "./pages/admin/user";
import Category from "./pages/admin/category";
import CreateCategory from "./pages/admin/category/CreateCategory";

import ShowOrder from "./pages/admin/order/ShowOrder";
import UpdateCategory from "./pages/admin/category/UpdateCategory";
import CreateUser from "./pages/admin/user/CreateUser";
import UpdateUser from "./pages/admin/user/UpdateUser";

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
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "order/:id",
        element: <ShowOrder />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "createProduct",
        element: <CreateProduct />,
      },
      {
        path: "updateProduct/:id",
        element: <UpdateProduct />,
      },
      {
        path: "user",
        element: <User />,
      },

      {
        path: "createUser",
        element: <CreateUser />,
      },

      {
        path: "updateUser/:id",
        element: <UpdateUser />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "createCategory",
        element: <CreateCategory />,
      },
      {
        path: "updateCategory/:id",
        element: <UpdateCategory />,
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
