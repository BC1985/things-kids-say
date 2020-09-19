import React, { useState, useContext } from "react";
import NavToggleButton from "../Sidenav/NavToggle/NavToggleButton";
import { context } from "../../Context";
import { NavLink } from "react-router-dom";
import UserIcon from "../Nav/UserIcon/UserIcon";
import "./Sidenav.css";

function SideNav(props) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const {user} = useContext(context)

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
        <ul className={sideNavClass}>
        <li><UserIcon username={user}/></li>
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
