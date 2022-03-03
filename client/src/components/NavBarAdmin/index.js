import React from "react";
import "./style.css";
import logo from "../../images/logo.png";
import { NavLink, useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();

  const logoutFunction = () => {
    // console.log("Logout button clicked!");
    return history.push("/logout");
  };

  return (
    <>
      <div className="nav-container">
        <div className="navbar-mobile" />
        <div className="nav-title">
          <img className="nav-logo" src={logo} />
          <div className="nav-container-2">
            <h2 className="title-text">Internship Placement System</h2>
            <div className="nav-links">
              <NavLink to="/myplacementrecord" activeClassName="link-active">
                My Placement Record
              </NavLink>
              <NavLink to="/faq" activeClassName="link-active">
                FAQ
              </NavLink>
              <div className="nav-button-container">
                <a id="logout-button" onClick={logoutFunction}>
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;