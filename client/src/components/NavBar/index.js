import React from "react";

import "./NavBarStyle.css";
import logo from "../../images/logo.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const logoutFunction = () => {
    console.log("Logout button clicked!");
  };

  return (
    <>
      <div className="nav-container">
        <div className="navbar-mobile" />
        <div className="nav-title">
          <img className="nav-logo" src={logo} />
          <h2 className="title-text">Internship Placement System</h2>
        </div>
        <div className="nav-links">
          <NavLink
            to="/myplacementrecord"
            activeStyle={{ color: "#FAF9F6", fontWeight: "bold" }}
          >
            My Placement Record
          </NavLink>
          <NavLink
            to="/faq"
            activeStyle={{ color: "#FAF9F6", fontWeight: "bold" }}
          >
            FAQ
          </NavLink>
        </div>
        <div className="nav-button">
          <button onClick={logoutFunction}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
