import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { authCheckSession } from "../../domain/service/authService";
import Sidebar from "../components/Sidebar";
import { Input, Popover } from "antd";
import NavbarProfileMenu from "../components/navbar/NavbarProfileMenu";
import { Icon } from "@iconify/react";

function HomeLayout() {
  const [openSidebar, setOpenSidebar] = React.useState(
    JSON.parse(localStorage.getItem("sidebarState") ?? "true")
  );
  const [openProfileMenu, setProfileMenu] = React.useState(false);
  const navigate = useNavigate();

  function handleSidebar() {
    setOpenSidebar(!openSidebar);
    localStorage.setItem("sidebarState", JSON.stringify(!openSidebar));
  }

  React.useEffect(() => {
    if (!authCheckSession()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-bg0 text-text1">
      {/* Navbar */}
      <header className="bg-bg4 sticky top-0 border-b-2 py-2 px-3 flex items-center border-accent1">
        {/* Left side */}
        <div className="flex space-x-4 items-center">
          {/* Sidebar show and hide btn */}
          <button className="p-1 rounded-md hover:bg-accent1">
            <Icon
              className="w-8 h-8"
              icon={openSidebar ? "mdi:menu-open" : "mdi:menu"}
              onClick={handleSidebar}
            />
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-12">
              <div className="relative pb-[100%] rounded-full overflow-hidden bg-white">
                <p className="absolute">Davao Parking logo</p>
              </div>
            </div>
            <h1 className="text-2xl font-bold">Parking Admin</h1>
          </div>
        </div>

        {/* Search Bar */}
        <Input
          prefix={<Icon className="w-6 h-6" icon="ph:magnifying-glass" />}
          className="h-full p-2 w-64 ml-12 rounded-md"
          placeholder="Search..."
        />

        {/* Right side */}
        <div className="ml-auto">
          <Popover
            open={openProfileMenu}
            content={<NavbarProfileMenu setProfileMenu={setProfileMenu} />}
            placement="topRight"
            trigger="click"
            onOpenChange={(open) => setProfileMenu(open)}
            zIndex={1001}
          >
            <button
              className={`flex items-center space-x-2 p-1 rounded-md transition ${
                openProfileMenu ? "bg-accent1" : ""
              } hover:bg-accent1`}
            >
              <div className="w-10 h-10 rounded-full border border-accent1 bg-white"></div>
              <p>Admin</p>
              <span
                className={`transition ${openProfileMenu ? "rotate-180" : ""}`}
              >
                <Icon className="w-8 h-8" icon="mdi:caret-down" />
              </span>
            </button>
          </Popover>
        </div>
      </header>

      {/* Right Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <Sidebar open={openSidebar} />
        <main className="flex flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default HomeLayout;
