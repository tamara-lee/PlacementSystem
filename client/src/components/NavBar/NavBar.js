import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/myplacementrecord">My Placement Record</Link>
        </li>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
      </ul>
    </>
  );
}

export default NavBar;
