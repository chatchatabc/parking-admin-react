import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./globals.css";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import { message } from "antd";
import ProfilePage from "./pages/ProfilePage";
import UsersListPage from "./pages/users/UsersListPage";
import UsersCreatePage from "./pages/users/UsersCreatePage";

message.config({
  maxCount: 2,
});

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
        children: [
          {
            path: "create",
            element: <UsersCreatePage />,
          },
          {
            path: "list",
            element: <UsersListPage />,
          },
        ],
      },
      {
        path: "settings",
        element: <h1>Settings</h1>,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "help",
        element: <h1>Help</h1>,
      },
      {
        path: "about",
        element: <h1>About</h1>,
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
