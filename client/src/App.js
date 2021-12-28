import React, { useEffect } from "react";
import "./App.css";
import Login from "./Pages/Login/Login";
import Home from "./Home";
import FAQ from "./Pages/Student/FAQ/FAQ";
import MyPlacementRecord from "./Pages/Student/MyPlacementRecord/MyPlacementRecord";
import { BrowserRouter as Routes, Route, Switch } from "react-router-dom";
import "./global.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Switch>
          <Route exact path="/" component={Login} />
          {/* <Route exact path="/home" component={Home} /> */}
          <Route
            exact
            path="/home"
            component={() => <Home authorized={global.loggedIn} />}
          />
          <Route
            exact
            path="/myplacementrecord"
            component={() => <MyPlacementRecord />}
          />
          <Route exact path="/faq" component={FAQ} />
        </Switch>
      </Routes>
    </div>
  );
}

export default App;
