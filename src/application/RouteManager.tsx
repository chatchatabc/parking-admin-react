import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/globals.css";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import { message } from "antd";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import UsersCreatePage from "./pages/users/UsersProfilePage";
import UsersPage from "./pages/users/UsersPage";

message.config({
  maxCount: 2,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <h1>Home</h1>,
      },
      {
        path: "users",
        children: [
          {
            path: "",
            element: <UsersPage />,
          },
          {
            path: "create",
            element: <UsersCreatePage />,
          },
          {
            path: ":profile",
            element: <UsersCreatePage />,
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
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function RouteManager() {
  return <RouterProvider router={router} />;
}

export default RouteManager;
