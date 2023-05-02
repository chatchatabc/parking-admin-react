import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();
  const crumbs = location.pathname.split("/");

  return (
    <ul className="flex items-center gap-x-2 text-xs flex-wrap">
      {crumbs.map((crumb, index) => {
        const path = crumbs.slice(0, index + 1).join("/");
        if (crumb === "") {
          return (
            <li key={`crumb-${crumb}-${index}`}>
              <NavLink to="/">Home</NavLink> /
            </li>
          );
        } else if (index === crumbs.length - 1) {
          return (
            <p key={`crumb-${crumb}-${index}`} className="font-bold uppercase">
              {crumb}
            </p>
          );
        }
        return (
          <li key={`crumb-${crumb}-${index}`}>
            <NavLink to={path} className={"capitalize"}>
              {crumb}
            </NavLink>{" "}
            /
          </li>
        );
      })}
    </ul>
  );
}

export default Breadcrumbs;
