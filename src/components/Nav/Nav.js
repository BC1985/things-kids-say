import React, { useEffect, useState } from "react";
// import {withRouter} from "react-router"
import { context } from "../../Context";

import { Link } from "react-router-dom";
import "./Nav.css";
function Nav(props) {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwt token");

      const res = await fetch(`http://localhost:5000/users/username`, {
        method: "GET",
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      let data = await res.json();
      setUser(data);
      // let username = data._id
    };
    fetchData();
  }, []);

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
        <p>Welcome {user.username}</p>
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
        </ul>
      </nav>
    </>
  );
}

export default Nav;
