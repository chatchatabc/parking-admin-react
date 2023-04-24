import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./globals.css";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <h1>Home</h1>,
      },
      {
        path: "users",
        element: <h1>Users</h1>,
      },
      {
        path: "/settings",
        element: <h1>Settings</h1>,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);

function RouteManager() {
  return <RouterProvider router={router} />;
}

export default RouteManager;
