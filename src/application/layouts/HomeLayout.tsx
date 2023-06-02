import React from "react";
import { Outlet } from "react-router-dom";
import { authCheckSession } from "../../domain/services/authService";
import Sidebar from "../components/sidebar/Sidebar";
import { Popover } from "antd";
import NavbarProfileMenu from "../components/navbar/NavbarProfileMenu";
import { Icon } from "@iconify/react";
import DrawerForm from "../components/drawers/DrawerForm";
import { FormInstance, useForm } from "antd/es/form/Form";
import NavbarSearchBar from "../components/navbar/NavbarSearchBar";
import MultiTabs from "../components/MultiTabs";
import NoAccessPage from "../pages/NoAccessPage";

export let formRefHandler: FormInstance<any>;

function HomeLayout() {
  const [openSidebar, setOpenSidebar] = React.useState(
    JSON.parse(localStorage.getItem("sidebarState") ?? "true")
  );
  const [openProfileMenu, setProfileMenu] = React.useState(false);

  const [form] = useForm();
  formRefHandler = form;

  function handleSidebar() {
    setOpenSidebar(!openSidebar);
    localStorage.setItem("sidebarState", JSON.stringify(!openSidebar));
  }

  if (!authCheckSession()) {
    return <NoAccessPage />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg1 text-t1">
      {/* Navbar */}
      <header className="bg-bg2 z-[10] sticky top-0 border-b-2 py-2 px-3 flex items-center border-t2">
        {/* Left side */}
        <div className="flex space-x-4 items-center">
          {/* Sidebar show and hide btn */}
          <button className="p-1 rounded-md hover:bg-bg3">
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
        <NavbarSearchBar />

        {/* Right side */}
        <div className="ml-auto">
          <Popover
            open={openProfileMenu}
            content={<NavbarProfileMenu setProfileMenu={setProfileMenu} />}
            placement="topRight"
            trigger="click"
            onOpenChange={(open) => setProfileMenu(open)}
            zIndex={1001}
            arrow={false}
          >
            <button
              className={`flex items-center space-x-2 p-1 rounded-md transition ${
                openProfileMenu ? "bg-bg3" : ""
              } hover:bg-bg3`}
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
        <main className="flex flex-col flex-1">
          <section className="uppercase">
            <MultiTabs />
          </section>
          <Outlet />
        </main>
      </div>

      <DrawerForm />
    </div>
  );
}

export default HomeLayout;
