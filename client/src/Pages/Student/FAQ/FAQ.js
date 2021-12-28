import React from "react";
import NavBar from "../../../components/NavBar/NavBar";
import Navbar from "../../../components/NavBar/index";
import { Redirect } from "react-router-dom";

function FAQ({ authorized }) {
  if (authorized === false) {
    console.log(authorized);
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Navbar />
      <h1></h1>
    </div>
  );
}

export default FAQ;
