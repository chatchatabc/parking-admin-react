import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { authCheckSession } from "../../domain/service/authService";
import Sidebar from "../components/Sidebar";
import { Popover } from "antd";
import NavbarProfileMenu from "../components/navbar/NavbarProfileMenu";
import { Icon } from "@iconify/react";

function HomeLayout() {
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const [openProfileMenu, setProfileMenu] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authCheckSession()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-blue-50">
      {/* Navbar */}
      <header className="bg-blue-300 sticky top-0 border-b-2 py-2 px-4 flex items-center border-blue-900">
        {/* Left side */}
        <div className="flex space-x-4 items-center">
          {/* Sidebar show and hide btn */}
          <button>
            <Icon
              className="w-8 h-8"
              icon={openSidebar ? "mdi:menu-open" : "mdi:menu"}
              onClick={() => setOpenSidebar(!openSidebar)}
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

        {/* Right side */}
        <div className="ml-auto flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full border border-blue-900 bg-white"></div>
          <p>Admin</p>
          <Popover
            open={openProfileMenu}
            content={<NavbarProfileMenu setProfileMenu={setProfileMenu} />}
            placement="topRight"
            trigger="click"
            onOpenChange={(open) => setProfileMenu(open)}
            zIndex={1001}
          >
            <button
              className={`transition ${openProfileMenu ? "rotate-180" : ""}`}
            >
              <Icon className="w-8 h-8" icon="mdi:caret-down" />
            </button>
          </Popover>
        </div>
      </header>

      {/* Right Content */}
      <main className="flex-1 flex">
        {/* Sidebar */}
        <Sidebar open={openSidebar} />
        <div className="flex flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default HomeLayout;
