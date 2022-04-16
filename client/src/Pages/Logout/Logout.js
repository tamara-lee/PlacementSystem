import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

function Logout() {
  const history = useHistory();

  Axios.defaults.withCredentials = true;

  // logs user out when executed
  useEffect(() => {
    Axios.get("http://localhost:3001/auth/logout")
      .then((response) => {
        if (response.data === "Logged Out") {
          localStorage.removeItem("userState");
          localStorage.removeItem("userUid");
          localStorage.removeItem("username");
          localStorage.removeItem("userId");
          return history.push("/");
        }
      })
      .catch((error) => {
        if (
          error.response.data.error ===
          "User is not authenticated!\nPlease log in."
        ) {
          localStorage.setItem("userState", false);
          return history.push("/");
        }
      });
  }, []);

  return <></>;
}

export default Logout;
