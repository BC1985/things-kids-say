import React, { useState, useEffect } from "react";
import NavToggleButton from "../Sidenav/NavToggle/NavToggleButton";

import "./Sidenav.css";
import { NavLink } from "react-router-dom";

function SideNav() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
 

  const openSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };
  const routes = [
    {
      to: "/list",
      name: "All quotes",
      onClick: openSideNav,
    },
    {
      to: "/add",
      name: "Add quote",
      onClick: openSideNav,
    },
    {
      to: `my_quotes/user/${user._id}`,
      name: "My quotes",
      onClick: openSideNav,
    },
    {
      to: "/",
      name: "Log out",
      onClick: openSideNav,
    },
  ];

  // close sidenav on menu click

  let sideNavClass = isSideNavOpen ? "nav-links open" : "nav-links";
  return (
    <>
      <NavToggleButton
        openSideNav={openSideNav}
        isSideNavOpen={isSideNavOpen}
      />
      <nav>
        <p>{user.username}</p>
        <ul className={sideNavClass}>
          {routes.map(route => (
            <li key={route.name}>
              <NavLink to={route.to} onClick={route.onClick}>
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default SideNav;
