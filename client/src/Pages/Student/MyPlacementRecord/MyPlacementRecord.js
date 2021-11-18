import React from "react";
import NavBar from "../../../components/NavBar/NavBar";
import Navbar from "../../../components/NavBar/index";
import { Redirect } from "react-router-dom";

function MyPlacementRecord({ authorized }) {
  // if (authorized === false) {
  //   console.log(authorized);
  //   return <Redirect to="/" />;
  // }
  return (
    <>
      <Navbar />
      <div>
        <h1>This is the My Placement Record page!</h1>
      </div>
    </>
  );
}

export default MyPlacementRecord;
