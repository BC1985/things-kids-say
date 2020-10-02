import React, { useContext, useEffect } from "react";
import UserIcon from "./UserIcon/UserIcon";
import { Link } from "react-router-dom";
import "./Nav.css";
import { context } from "../../Context";

function Nav(props) {
  const { fetchUsername, user } = useContext(context);
  const { isSignedIn, logOut } = props;
  // watch for loggin in, then display icon
  useEffect(() => {
    isSignedIn && fetchUsername();
  }, [isSignedIn]);

  return (
    <div className="nav-wrapper">
      <nav>
        <ul className="nav">
          <li>
            <Link to="/" className="nav-link link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/list" className="nav-link link">
              All quotes
            </Link>
          </li>
          <li>
            <Link to={isSignedIn ? "add" : "login"} className="nav-link link">
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
          {isSignedIn && 
          <li>
            <Link to={`/settings/user/${user._id}`} className="nav-link link">
              {<UserIcon username={user.username} />}
            </Link>
          
          </li>
          }
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
