import React, { useContext, useEffect } from "react";
import UserIcon from "./UserIcon/UserIcon";
import { Link } from "react-router-dom";
import { context } from "../../Context";
import "./Nav.css";

function Nav(props) {
  const { user } = useContext(context);
  
// watch for loggin in, then display icon
  useEffect(()=>{
  },[props.isSignedIn])

  const { isSignedIn, logOut } = props;
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
            <Link
              to={isSignedIn ? `my_quotes/user/${user._id}` : ""}
              className="nav-link link"
            >
              {isSignedIn ? "My Quotes" : ""}
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link link" onClick={logOut}>
              {isSignedIn && "Log out"}
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link link">
              {isSignedIn && <UserIcon username={user} />}
            </Link>
            </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
