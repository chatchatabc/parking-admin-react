import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

interface Props {
  open: boolean;
}

function Sidebar({ open }: Props) {
  const navigations = [
    { label: "Home", icon: "mdi:home", path: "/" },
    { label: "Users", icon: "mdi:account-group", path: "/users" },
    { label: "Settings", icon: "mdi:cog", path: "/settings" },
  ];

  return (
    <aside
      className={`sticky top-[66px] h-[calc(100vh-66px)] bg-blue-300 border-r-2 border-blue-900 ${
        open ? "min-w-[200px]" : "min-w-[1px]"
      } transition-all ease-linear group hover:min-w-[200px]`}
    >
      {/* Navigation */}
      <nav className="p-2 mt-4">
        <ul>
          {navigations.map((navigation) => {
            return (
              <li className="p-0.5" key={navigation.path}>
                <NavLink
                  className={({ isActive }) =>
                    `p-2 rounded-md flex items-center ${
                      isActive ? "bg-blue-100" : "hover:bg-blue-100"
                    } `
                  }
                  to={navigation.path}
                >
                  <span>
                    <Icon className="w-6 h-6" icon={navigation.icon} />
                  </span>
                  <span
                    className={`transition-all ease-linear overflow-hidden ${
                      open ? "max-w-[100px] px-2" : "max-w-[0]"
                    } group-hover:max-w-[100px] group-hover:px-2`}
                  >
                    {navigation.label}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
