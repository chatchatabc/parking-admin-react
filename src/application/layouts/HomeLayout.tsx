import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { authCheckSession } from "../../domain/service/authService";
import Sidebar from "../components/Sidebar";
import { Popover } from "antd";
import NavbarProfileMenu from "../components/navbar/NavbarProfileMenu";
import { Icon } from "@iconify/react";

function HomeLayout() {
  const [openProfileMenu, setProfileMenu] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authCheckSession()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex bg-blue-50">
      {/* Sidebar */}
      <aside className="w-[300px] h-screen sticky top-0 bg-blue-300 border-r-2 border-blue-900">
        {/* Sidebar header */}
        <header className="p-2">
          <div className="flex items-center space-x-2">
            <div className="w-32">
              <div className="relative pb-[40%] bg-white">
                <p className="absolute">Davao Parking logo</p>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="p-2 mt-4">
          <Sidebar />
        </nav>
      </aside>

      {/* Right Content */}
      <main className="flex-1">
        <header className="bg-blue-300 sticky top-0 border-b-2 p-2 flex items-center border-blue-900">
          <div className="ml-auto flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full border border-blue-900 bg-white"></div>
            <p>Admin</p>
            <Popover
              open={openProfileMenu}
              content={<NavbarProfileMenu />}
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
        <div className="flex flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default HomeLayout;
