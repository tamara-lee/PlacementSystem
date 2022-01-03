import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

function Logout() {
  const history = useHistory();

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/logout")
      .then((response) => {
        console.log(response);
        if (response.data === "Logged Out") {
          localStorage.setItem("userState", false);
          return history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <></>;
}

export default Logout;
