import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

interface Props {
  open: boolean;
}
interface DropDownProps {
  navigation: Record<string, any>;
  open: boolean;
}

function NavigationDropDown({ navigation, open }: DropDownProps) {
  const [hide, setHide] = React.useState(true);

  return (
    <div>
      <button
        onClick={() => {
          setHide(!hide);
        }}
        className="p-2 w-full rounded-md flex items-center hover:bg-blue-100"
      >
        <span>
          <Icon className="w-6 h-6" icon={navigation.icon} />
        </span>
        <span
          className={`transition-all ease-linear overflow-hidden line-clamp-1 ${
            open ? "max-w-[100px] px-2" : "max-w-[0]"
          } group-hover:max-w-[100px] group-hover:px-2`}
        >
          {navigation.label}
        </span>
        <span className="ml-auto">
          <Icon
            className={`w-6 h-6 transition-all ease-linear transform ${
              hide ? "rotate-0" : "rotate-180"
            } ${open ? "" : "hidden"} group-hover:block`}
            icon="mdi:chevron-down"
          />
        </span>
      </button>
      {hide ? null : (
        <ul className="mt-0.5">
          {navigation.children.map((child: Record<string, any>) => {
            return (
              <li className="p-0.5" key={child.path}>
                <NavLink
                  to={child.path}
                  className={({ isActive }) =>
                    `p-2 rounded-md flex items-center ${
                      isActive ? "bg-blue-100" : "hover:bg-blue-100"
                    }`
                  }
                >
                  <span>
                    <div
                      className={`block text-center w-6 h-6 rounded-full ${
                        open ? "opacity-0" : ""
                      } group-hover:opacity-0`}
                    >
                      {child.label.charAt(0).toUpperCase()}
                    </div>
                  </span>
                  <span
                    className={`transition-all ease-linear overflow-hidden line-clamp-1 ${
                      open ? "max-w-[200px] px-2" : "max-w-[0]"
                    } group-hover:max-w-[200px] group-hover:px-2`}
                  >
                    {child.label}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Sidebar({ open }: Props) {
  const navigations = [
    { label: "Home", icon: "mdi:home", path: "/" },
    {
      label: "Users",
      icon: "mdi:account-group",
      path: "/users",
      children: [
        {
          label: "List Users",
          icon: "mdi:account-multiple",
          path: "/users/list",
        },
        {
          label: "Create User",
          icon: "mdi:account-plus",
          path: "/users/create",
        },
      ],
    },
    { label: "Settings", icon: "mdi:cog", path: "/settings" },
  ];
  const navigationsHelp = [
    { label: "Help", icon: "mdi:help", path: "/help" },
    { label: "About", icon: "mdi:information", path: "/about" },
  ];

  return (
    <aside
      className={`sticky top-[66px] h-[calc(100vh-66px)] bg-blue-300 border-r-2 border-blue-900 ${
        open ? "min-w-[200px]" : "min-w-[1px]"
      } transition-all ease-linear group hover:min-w-[200px]`}
    >
      {/* Navigation */}
      <nav className="p-2 space-y-2">
        <ul>
          {navigations.map((navigation) => {
            return (
              <li className="p-0.5" key={navigation.path}>
                {navigation.children ? (
                  <NavigationDropDown navigation={navigation} open={open} />
                ) : (
                  <NavLink
                    className={({ isActive }) =>
                      `p-2 rounded-md flex items-center ${
                        isActive ? "bg-blue-100" : "hover:bg-blue-100"
                      }`
                    }
                    to={navigation.path}
                  >
                    <span>
                      <Icon className="w-6 h-6" icon={navigation.icon} />
                    </span>
                    <span
                      className={`transition-all ease-linear overflow-hidden  line-clamp-1 ${
                        open ? "max-w-[200px] px-2" : "max-w-[0]"
                      } group-hover:max-w-[100px] group-hover:px-2`}
                    >
                      {navigation.label}
                    </span>
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
        <hr />
        <ul>
          {navigationsHelp.map((navigation) => {
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
