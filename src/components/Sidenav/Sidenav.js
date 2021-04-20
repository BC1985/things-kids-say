import React, { useContext } from "react";
import NavToggleButton from "../Sidenav/NavToggle/NavToggleButton";
import { context } from "../../Context";
import { NavLink } from "react-router-dom";
import UserIcon from "../Nav/UserIcon/UserIcon";
import "./Sidenav.css";

function SideNav({ toggleSideNav, isSideNavOpen, logOut, isSignedIn }) {
  const { user } = useContext(context);

  const baseRoutes = [
    {
      to: "/",
      name: "Home",
      onClick: toggleSideNav,
      needsAuth: false,
    },
    {
      to: "/quotes",
      name: "All quotes",
      onClick: toggleSideNav,
      needsAuth: false,
    },
    {
      to: "/add",
      name: "Add quote",
      onClick: toggleSideNav,
      needsAuth: isSignedIn ? false : true,
    },

    {
      to: isSignedIn ? `/my_quotes/user/${user._id}` : "",
      name: isSignedIn ? "My Quotes" : "",
      onClick: toggleSideNav,
      needsAuth: isSignedIn ? false : true,
    },
    {
      to: !isSignedIn ? "/login" : "/",
      name: !isSignedIn ? "Log in" : "Log out",
      onClick: isSignedIn ? logOut : toggleSideNav,
    },
  ];

  // Display routes according to log in status
  const routes = baseRoutes
    .filter(route => {
      if (route.needsAuth === true) {
        return false;
      }
      return true;
    })
    .map(route => {
      return (
        <li key={route.name}>
          <NavLink to={route.to} onClick={route.onClick}>
            {route.name}
          </NavLink>
        </li>
      );
    });
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
              <UserIcon username={user.username} />
            </li>
          )}
          {routes}
        </ul>
      </nav>
    </>
  );
}

export default SideNav;
