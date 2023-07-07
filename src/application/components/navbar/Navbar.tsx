import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import NavbarSearchBar from "./NavbarSearchBar";
import { Popover } from "antd";
import NavbarProfileMenu from "./NavbarProfileMenu";
import ImageComp from "../ImageComp";
import { authUserUuid } from "../../../domain/services/authService";

type Props = {
  open: boolean;
  handleSidebar: () => void;
};

function Navbar({ open, handleSidebar }: Props) {
  const [openProfileMenu, setProfileMenu] = React.useState(false);

  return (
    <>
      {/* Left side */}
      <div className="flex space-x-4 items-center">
        {/* Sidebar show and hide btn */}
        <button className="p-1 rounded-md hover:bg-bg3">
          <Icon
            className="w-8 h-8"
            icon={open ? "mdi:menu-open" : "mdi:menu"}
            onClick={handleSidebar}
          />
        </button>

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <a href="/" className="block w-12">
            <div className="relative pb-[100%] rounded-full overflow-hidden bg-white">
              <p className="absolute">Davao Parking logo</p>
            </div>
          </a>
          <a href="/" className="text-2xl font-bold">
            Parking Admin
          </a>
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
            <ImageComp
              className="w-10 h-10 rounded-full border border-accent1 bg-white"
              src={`/api/user/avatar/${authUserUuid()}`}
              alt={authUserUuid() ?? "User Avatar"}
            />
            <p>Admin</p>
            <span
              className={`transition ${openProfileMenu ? "rotate-180" : ""}`}
            >
              <Icon className="w-8 h-8" icon="mdi:caret-down" />
            </span>
          </button>
        </Popover>
      </div>
    </>
  );
}

export default Navbar;
