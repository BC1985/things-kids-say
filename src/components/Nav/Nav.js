import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
function Nav(props) {
  const logoStyle = {
    background: "teal",
    textAlign: "center",
    color: "white",
    fontFamily: "Mouse Memoirs"
  };
  const {isSignedIn} = props

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
            <Link to={isSignedIn? 'add':'sign-in'} className="nav-link link">
              {isSignedIn ? 'Add Quote': 'Sign in'}
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
