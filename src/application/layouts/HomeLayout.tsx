import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { authLogout } from "../../domain/service/authService";

function HomeLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    authLogout();

    navigate("/");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-300 border-b-2 p-2 flex items-center border-blue-900">
        {/* Left */}
        <div className="flex items-center space-x-2">
          <div className="w-32">
            <div className="relative pb-[40%] bg-white">
              <p className="absolute">Logo Here</p>
            </div>
          </div>
          <h1 className="text-xl font-medium">Davao Parking Dashboard</h1>
        </div>

        {/* Right */}
        <div className="ml-auto flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full border border-blue-900 bg-white"></div>
          <p>Admin</p>
        </div>
        <button
          onClick={handleLogout}
          className="ml-4 py-1 px-4 bg-red-500 text-white rounded-md transition hover:opacity-90"
        >
          Logout
        </button>
      </header>
      <div className="flex flex-1">
        <div className="w-[300px] bg-blue-300 border-r-2 border-blue-900">
          <header>
            <h2>Sidebar</h2>
          </header>
        </div>
        <div className="flex-1 p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
