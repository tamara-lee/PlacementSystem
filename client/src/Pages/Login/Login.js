import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";
import logo from "../../images/logo.png";

function Login() {
  Axios.defaults.withCredentials = true;

  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clickField, setClickField] = useState("");

  // to store error messages when attempting to log in
  const [loginStatus, setLoginStatus] = useState("");

  const login = () => {
    Axios.post("http://localhost:3001/auth/login", {
      username: username,
      password: password,
    })
      .then((response) => {
        if (response.data.login_status === "Logged In") {
          // store variables to use during the session
          localStorage.setItem("userState", true);
          localStorage.setItem("userUid", response.data.student_uid);
          localStorage.setItem("username", response.data.account_username);
          localStorage.setItem("userId", response.data.account_id);

          // check if user is the admin or student
          if (response.data.student_uid === "0000000000") {
            return history.push("/admin/mainpage");
          } else {
            return history.push("/student/mainpage");
          }
        }
      })
      .catch((error) => {
        setLoginStatus(error.response.data.error);
      });
  };

  // to check whether user is already logged in or not
  // if logged in, go to admin or student main page
  useEffect(() => {
    Axios.get("http://localhost:3001/auth/login")
      .then((response) => {
        if (response.data === "Logged In") {
          if (response.data.student_uid === "00000000000") {
            return history.push("/admin/mainpage");
          } else {
            return history.push("/student/mainpage");
          }
        } else {
          return history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            <div className="text-red">{loginStatus}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
