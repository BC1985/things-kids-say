import React, { useContext, useEffect, useState } from "react";
import UserIcon from "./UserIcon/UserIcon";
import { Link } from "react-router-dom";
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

  return (
    <div className={scrollClass}>
      <nav className="flex">
        <ul className="nav">
          <li>
            <Link to="/" className="nav-link link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/quotes" className="nav-link link">
              All quotes
            </Link>
          </li>
          <li>
            <Link to={isSignedIn ? "/add" : "/login"} className="nav-link link">
              {isSignedIn ? "Add Quote" : "Log in"}
            </Link>
          </li>
          <li>
            {isSignedIn && (
              <Link to="/" className="nav-link link" onClick={logOut}>
                Log out
              </Link>
            )}
          </li>
          </ul>
          {isSignedIn && (
            <div>
              <Link to={`/settings/user/${user._id}`} className="nav-link link">
                {<UserIcon username={user.username} />}
              </Link>
            </div>
          )}
      </nav>
    </div>
  );
}

export default Nav;
