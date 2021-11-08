import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./Login";
import Home from "./Home";
import FAQ from "./FAQ";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";


function App() {
  // const isNavBarHidden = false;
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/faq" element={<FAQ />} />
      </ Routes>
      {/* <Login />
      <Home />
      <FAQ /> */}
    </div>
  );
}

export default App;
