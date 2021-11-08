import React, { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import "./Login.css";
import logo from "./images/logo.png";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // for testing
    const [loginStatus, setLoginStatus] = useState("");



    const login = () => {
        Axios.post("http://localhost:3001/login", {
            username: username,
            password: password
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message)
            } else {
                setLoginStatus(response.data[0].username)
            }
            console.log(response);
        });
    }

    return (
        <div class="d-md-flex h-md-100 align-items-center">
            <div class="col-md-6 p-0 bg-green h-md-100">
                <div class="text-white d-md-flex align-items-center h-100 p-5 text-center justify-content-center">
                    <div class="logoarea pt-5 pb-5">
                        <p>
                            <img src={logo} />
                        </p>
                        <h2 class="mb-10 mt-0 text-help">香港大學</h2>
                        <h2 class="mb-4 text-help">THE UNIVERSITY OF HONG KONG</h2>

                    </div>
                </div>
            </div>

            <div class="col-md-6 p-0 bg-white h-md-100 loginarea">
                <div class="d-md-flex align-items-center h-md-100 p-5 justify-content-center">
                    <div class="">
                        <h3 class="mb-4 text-help title-style">INTERNSHIP PLACEMENT SYSTEM</h3>
                        <form class="p-6">
                            <div class="form-group p-2">
                                <input type="text" class="form-control" placeholder="CS Username" required="" onChange={(e) => {
                                    setUsername(e.target.value);
                                }} />
                            </div>
                            <div class="form-group p-2">
                                <input type="password" class="form-control" placeholder="Password" required="" onChange={(e) => {
                                    setPassword(e.target.value);
                                }} />
                            </div>
                            <button type="submit" class="btn btn-success shadow-sm m-3 btn-lg" onClick={login}>Login</button>
                        </form>
                        {/* to test if login is successful. map to homepage later */}
                        <h1>{loginStatus}</h1>
                    </div>

                </div>
            </div>
        </div>

        // <div>
        //     <div class="split left flex-container">
        //         <div class="helper">
        //             <img src={logo}/>
        //             <span class="logo-text">香港大學<br />THE UNIVERSITY OF HONG KONG</span>
        //         </div>
        //     </div>
        //     <div class="split right">
        //         details
        //     </div>

        // </div>

    );
}

export default Login;