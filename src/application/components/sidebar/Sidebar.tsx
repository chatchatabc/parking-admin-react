import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import SideBarDropdown from "./SideBarDropdown";
import sidebarJson from "../../../../data/sidebar.json";

interface Props {
  open: boolean;
}

function Sidebar({ open }: Props) {
  const { navigations } = sidebarJson;
  const navigationsHelp = [
    { label: "Help", icon: "mdi:help", path: "/help" },
    { label: "About", icon: "mdi:information", path: "/about" },
  ];

  return (
    <aside
      className={`sticky top-[66px] h-[calc(100vh-66px)] bg-bg2 border-r border-t2 ${
        open ? "min-w-[250px]" : "min-w-[1px]"
      } transition-all ease-linear text-t2 group hover:min-w-[250px]`}
    >
      {/* Navigation */}
      <nav className="p-2 space-y-2">
        <ul>
          {navigations.map((navigation) => {
            return (
              <li className="p-0.5" key={navigation.path}>
                {navigation.children ? (
                  <SideBarDropdown navigation={navigation} open={open} />
                ) : (
                  <NavLink
                    className={({ isActive }) =>
                      `p-2 rounded-md flex items-center ${
                        isActive
                          ? "bg-bg2 text-white"
                          : "hover:bg-bg2 hover:text-white"
                      }`
                    }
                    to={navigation.path}
                  >
                    <span>
                      <Icon className="w-6 h-6" icon={navigation.icon} />
                    </span>
                    <span
                      className={`transition-all ease-linear overflow-hidden  line-clamp-1 ${
                        open ? "max-w-[250px] px-2" : "max-w-[0]"
                      } group-hover:max-w-[250px] group-hover:px-2`}
                    >
                      {navigation.label}
                    </span>
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
        <hr className="border-t2" />
        <ul>
          {navigationsHelp.map((navigation) => {
            return (
              <li className="p-0.5" key={navigation.path}>
                <NavLink
                  className={({ isActive }) =>
                    `p-2 rounded-md flex items-center ${
                      isActive
                        ? "bg-bg2 text-white"
                        : "hover:bg-bg2 hover:text-white"
                    } `
                  }
                  to={navigation.path}
                >
                  <span>
                    <Icon className="w-6 h-6" icon={navigation.icon} />
                  </span>
                  <span
                    className={`transition-all ease-linear overflow-hidden ${
                      open ? "max-w-[250px] px-2" : "max-w-[0]"
                    } group-hover:max-w-[250px] group-hover:px-2`}
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
