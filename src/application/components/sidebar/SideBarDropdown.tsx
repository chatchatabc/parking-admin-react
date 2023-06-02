import { Icon } from "@iconify/react";
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

interface DropDownProps {
  navigation: Record<string, any>;
  open: boolean;
}

function SideBarDropdown({ navigation, open }: DropDownProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [hide, setHide] = React.useState(true);

  React.useEffect(() => {
    if (hide) {
      for (const child of navigation.children) {
        if (child.path === location.pathname) {
          setHide(false);
          break;
        }
      }
    }
  }, [navigate]);

  return (
    <div>
      <button
        onClick={() => {
          setHide(!hide);
        }}
        className="p-2 w-full rounded-md flex items-center hover:bg-bg2 hover:text-white"
      >
        <span>
          <Icon className="w-6 h-6" icon={navigation.icon} />
        </span>
        <span
          className={`transition-all ease-linear overflow-hidden line-clamp-1 ${
            open ? "max-w-[250px] px-2" : "max-w-[0]"
          } group-hover:max-w-[250px] group-hover:px-2`}
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
              <li className="py-0.5" key={child.path}>
                <NavLink
                  end
                  to={child.path}
                  className={({ isActive }) =>
                    `p-2 rounded-md flex items-center ${
                      isActive
                        ? "bg-bg2 text-white"
                        : "hover:bg-bg2 hover:text-white"
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
                      open ? "max-w-[250px] px-2" : "max-w-[0]"
                    } group-hover:max-w-[250px] group-hover:px-2`}
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

export default SideBarDropdown;
