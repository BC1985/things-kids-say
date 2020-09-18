import React, { useEffect, useState } from "react";
import  UserIcon from "./UserIcon/UserIcon";
import { Link } from "react-router-dom";
import { apiService } from "../../Services/apiServices"
import "./Nav.css";
function Nav(props) {
  const [user, setUser] = useState({});

  
  useEffect(()=>{   
      const fetchUsername = async()=>{
        const res = await apiService.getUsername()
        if (res === undefined) {
          return null
        }else{
          setUser(res)
        }
      }
      fetchUsername();      
  },[props.isSignedIn])

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
