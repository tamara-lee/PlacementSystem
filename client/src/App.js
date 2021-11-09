import React, { useEffect } from "react";
import "./App.css";
import Login from "./Login";
import Home from "./Home";
import FAQ from "./FAQ";
import { BrowserRouter as Routes, Route, Switch } from "react-router-dom";
// import NavBar from "./NavBar";

function App() {

  return (
    <div className="App">
      <Routes>
        <Switch>
          <Route exact path="/" component={Login} />
          {/* <Route exact path="/home" component={Home} /> */}
          <Route exact path="/home" component={() => <Home authorized={global.loggedIn} />} />
          <Route exact path="/faq" component={FAQ} />
        </Switch>
      </ Routes>
    </div>
  );
}

export default App;
