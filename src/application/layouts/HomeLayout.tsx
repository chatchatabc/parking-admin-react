import React from "react";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-300 border-b-2 p-2 flex items-center border-blue-900">
        <h2 className="text-lg font-medium">Navbar Logo</h2>
        <div className="ml-auto flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full border border-blue-900"></div>
          <p>Admin</p>
        </div>
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
