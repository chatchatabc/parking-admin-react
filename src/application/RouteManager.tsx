import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./globals.css";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
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
