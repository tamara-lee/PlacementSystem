import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavTop,
} from "./NavbarElements";

import "./style.css";

const Navbar = () => {
  return (
    <>
      <div className="nav-container">
        <div className="navbar"></div>
      </div>
      {/* <Nav>
        <Bars />

        <NavMenu>
          <NavTop> test </NavTop>
          <NavLink to="/myplacementrecord" activeStyle>
            My Placement Record
          </NavLink>
          <NavLink to="/faq" activeStyle>
            FAQ
          </NavLink>
          Second Nav
          <NavBtnLink to='/sign-in'>Sign In</NavBtnLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/signin">Sign In</NavBtnLink>
        </NavBtn>
      </Nav> */}
    </>
  );
};

export default Navbar;
