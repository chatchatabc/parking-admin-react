import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

function Sidebar() {
  const navigations = [
    { label: "Home", icon: "mdi:home", path: "/" },
    { label: "Users", icon: "mdi:account-group", path: "/users" },
    { label: "Settings", icon: "mdi:cog", path: "/settings" },
  ];

  return (
    <ul>
      {navigations.map((navigation) => {
        return (
          <li key={navigation.path}>
            <NavLink
              className={({ isActive }) =>
                `p-2 flex items-center ${
                  isActive ? "bg-blue-100" : "hover:bg-blue-100"
                } `
              }
              to={navigation.path}
            >
              <span className="inline-block w-6">
                <Icon icon={navigation.icon} />
              </span>
              {navigation.label}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}

export default Sidebar;
