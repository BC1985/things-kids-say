import React, { useContext, useEffect, useState } from "react";
import UserIcon from "./UserIcon/UserIcon";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import { context } from "../../Context";

function Nav({ isSignedIn, logOut }) {
  const { fetchUsername, user } = useContext(context);
  const [scrolled, setScrolled] = useState(false);
  // watch for loggin in, then display icon
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    isSignedIn && fetchUsername();
  }, [isSignedIn]);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const scrollClass = scrolled ? "nav-wrapper scrolled" : "nav-wrapper";

  const baseRoutes = [
    {
      to: "/",
      name: "Home",
      needsAuth: false,
    },
    {
      to: "/quotes",
      name: "All quotes",
      needsAuth: false,
    },
    {
      to: "/add",
      name: "Add quote",
      needsAuth: isSignedIn ? false : true,
    },
    {
      to: !isSignedIn ? "/login" : "/",
      name: !isSignedIn ? "Log in" : "Log out",
      onClick: logOut,
    },
  ];
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
          <NavLink
            to={route.to}
            onClick={route.onClick}
            className="nav-link link"
          >
            {route.name}
          </NavLink>
        </li>
      );
    });
  return (
    <div className={scrollClass}>
      <nav className="flex">
        <ul className="nav">{routes}</ul>
        {isSignedIn && (
          <div>
            <NavLink
              to={`/settings/user/${user._id}`}
              className="nav-link link"
            >
              {<UserIcon username={user.username} />}
            </NavLink>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Nav;
