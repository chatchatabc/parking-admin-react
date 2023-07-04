import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/globals.css";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import { message } from "antd";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import UsersCreatePage from "./pages/users/UsersProfilePage";
import UsersPage from "./pages/users/UsersPage";
import HomePage from "./pages/HomePage";
import ParkingLotsPage from "./pages/parking-lots/ParkingLotsPage";
import ParkingLotsProfilePage from "./pages/parking-lots/ParkingLotsProfilePage";
import SearchPage from "./pages/SearchPage";
import VehiclesPage from "./pages/vehicles/VehiclesPage";
import InvoicePage from "./pages/invoices/InvoicesPage";
import CommutesJeepneysPage from "./pages/commutes/CommutesJeepneysPage";
import CommutesRoutesPage from "./pages/commutes/CommutesRoutesPage";
import CommutesNodesPage from "./pages/commutes/CommutesNodesPage";
import CommutesMapPage from "./pages/commutes/CommutesMapPage";
import InvoiceProfilePage from "./pages/invoices/InvoiceProfilePage";

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
        element: <HomePage />,
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
        path: "parking-lots",
        children: [
          {
            path: "",
            element: <ParkingLotsPage />,
          },
          {
            path: ":identifier",
            element: <ParkingLotsProfilePage />,
          },
        ],
      },
      {
        path: "vehicles",
        children: [
          {
            path: "",
            element: <VehiclesPage />,
          },
        ],
      },
      {
        path: "invoices",
        children: [
          {
            path: "",
            element: <InvoicePage />,
          },
          {
            path: ":invoiceId",
            element: <InvoiceProfilePage />,
          },
        ],
      },
      {
        path: "commutes",
        children: [
          {
            path: "jeepneys",
            element: <CommutesJeepneysPage />,
          },
          {
            path: "routes",
            element: <CommutesRoutesPage />,
          },
          {
            path: "nodes",
            element: <CommutesNodesPage />,
          },
          {
            path: "map",
            element: <CommutesMapPage />,
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
        path: "search",
        element: <SearchPage />,
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
