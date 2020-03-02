import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
function Nav() {
  const logoStyle = {
    background: "teal",
    textAlign: "center",
    color: "white",
    fontFamily: "Mouse Memoirs"
  };

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
            <Link to="/add" className="nav-link link">
              Add quote
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
