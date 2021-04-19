import React, { useContext } from "react";
import NavToggleButton from "../Sidenav/NavToggle/NavToggleButton";
import { context } from "../../Context";
import { NavLink } from "react-router-dom";
import UserIcon from "../Nav/UserIcon/UserIcon";
import "./Sidenav.css";

function SideNav({ toggleSideNav, isSideNavOpen, logOut, isSignedIn }) {
  const { user } = useContext(context);
  const authRoutes=[
    {
      to: "/add",
      name: "Add quote",
      onClick: toggleSideNav,
    },
    {
      to: "/",
      name: isSignedIn ? "Log out" : "",
      onClick: logOut,
    },
  ]
  const routes = [
    {
      to: "/",
      name: "Home",
      onClick: toggleSideNav,
    },
    {
      to: "/quotes",
      name: "All quotes",
      onClick: toggleSideNav,
    },
    {
      // to: `my_quotes/user/${user._id}`,
      to: isSignedIn ? `my_quotes/user/${user._id}` : "login",
      name: isSignedIn ? "My Quotes" : "Log in",
      onClick: toggleSideNav,
    },
  ];
  const Overlay = () => {
    return (
      <div
        className={isSideNavOpen ? "overlay" : null}
        onClick={isSideNavOpen ? toggleSideNav : null}
      ></div>
    );
  };
  // close sidenav on menu click

  let sideNavClass = isSideNavOpen ? "nav-links open" : "nav-links";
  return (
    <>
      <Overlay isSideNavOpen={isSideNavOpen} />
      <NavToggleButton
        toggleSideNav={toggleSideNav}
        isSideNavOpen={isSideNavOpen}
      />
      <nav>
        <ul className={sideNavClass}>
          {isSignedIn && (
            <li>
              <UserIcon username={user} />
            </li>
          )}
          {routes.map(route => (
            <li key={route.name}>
              <NavLink to={route.to} onClick={route.onClick}>
                {route.name}
              </NavLink>
            </li>
          ))}
          {isSignedIn &&  authRoutes.map(route => (
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
