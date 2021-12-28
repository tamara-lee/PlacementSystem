import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";
import logo from "../../images/logo.png";
import "../../global.js";

function Login() {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clickField, setClickField] = useState("");

  Axios.defaults.withCredentials = true;

  // for testing
  const [loginStatus, setLoginStatus] = useState("");

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    })
      .then((response) => {
        if (response.data === "Logged In") {
          global.loggedIn = true;
          return history.push("/myplacementrecord");
        }
      })
      .catch((error) => {
        setLoginStatus(error.response.data.error);
      });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login")
      .then((response) => {
        if (response.data === "Logged In") {
          return history.push("/myplacementrecord");
          // setLoginStatus(response.data.user[0].username);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   console.log(global.loggedIn);
  //   if (global.loggedIn === true) {
  //     return history.push("/myplacementrecord");
  //     // setLoginStatus(response.data.user[0].username);
  //   }
  // }, []);

  return (
    <div className="d-md-flex h-md-100 align-items-center">
      <div className="col-md-6 p-0 bg-green h-md-100">
        <div className="text-white d-md-flex align-items-center h-100 p-3 text-center justify-content-center">
          <div className="logoarea pt-1 pb-1">
            <p>
              <img src={logo} />
            </p>
            <h2 className="mb-10 mt-0 text-help">香港大學</h2>
            <h2 className="mb-0 text-help">THE UNIVERSITY OF HONG KONG</h2>
          </div>
        </div>
      </div>

      <div className="col-md-6 p-0 bg-white h-md-100 loginarea">
        <div className="d-md-flex align-items-center h-md-100 p-5 justify-content-center">
          <div>
            <h3 className="mb-4 title-style">INTERNSHIP PLACEMENT SYSTEM</h3>
            <form className="p-6">
              <div className="form-group p-2">
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="CS Username"
                  required=""
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setClickField("yes");
                    setLoginStatus("");
                  }}
                />
              </div>
              <div className="form-group p-2">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  required=""
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setClickField("yes");
                    setLoginStatus("");
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-success shadow-sm m-3 btn-lg"
                disabled={!(username && password) ? true : false}
                onClick={(e) => {
                  e.preventDefault();
                  login();
                }}
              >
                Login
              </button>
            </form>
            <div
              className={
                (username && password) || !(clickField === "yes")
                  ? "error"
                  : "text-red"
              }
            >
              Please complete all fields.
            </div>
            {/* to test if login is successful. map to homepage later */}
            <div className="text-red">{loginStatus}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
