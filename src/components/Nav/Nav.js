import React, { useContext } from "react";
import  UserIcon from "./UserIcon/UserIcon";
import { Link } from "react-router-dom";
import { context } from "../../Context";
import "./Nav.css";

function Nav(props) {
  const {user} = useContext(context)

  const logoStyle = {
    background: "teal",
    textAlign: "center",
    color: "white",
    fontFamily: "Mouse Memoirs"
  };
  const {isSignedIn, logOut} = props
  return (
    <>
      <nav style={logoStyle} className="d-flex justify-content-between">
        <Link className="nav-link link" to="/">
          <h1>Things Kids Say</h1>
        </Link>
        <ul className="nav justify-content-end d-flex align-content-center">
          <li className="nav-item">
            <Link to="/list" className="nav-link link">
              All quotes
            </Link>
          </li>
          <li>
            <Link to={isSignedIn? 'add':'login'} className="nav-link link">
              {isSignedIn ? 'Add Quote': 'Log in'}
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
            <Link to='/' className="nav-link link" onClick={logOut}>
              {isSignedIn && 'Log out'}
            </Link>
          </li>
          <li>
            {isSignedIn && <UserIcon username={user}/>}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
