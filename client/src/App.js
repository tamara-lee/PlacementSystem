import React, { useEffect } from "react";
import "./App.css";
import Login from "./Pages/Login/Login";
import Home from "./Home";
import FAQ from "./Pages/Student/FAQ/FAQ";
import AdminFAQ from "./Pages/Admin/AdminFAQ/AdminFAQ";
import AddStudent from "./Pages/Admin/AddStudent/AddStudent";
import StudentRecords from "./Pages/Admin/StudentRecords/StudentRecords";
import EditPlacementRecord from "./Pages/Admin/StudentRecords/EditPlacementRecord";
import EditStudentRecord from "./Pages/Admin/StudentRecords/EditStudentRecord";
import Logout from "./Pages/Logout/Logout";
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
            component={() => (
              <Home
                authorized={JSON.parse(localStorage.getItem("userState"))}
              />
            )}
          />
          <Route
            exact
            path="/placementrecord/student"
            component={() => (
              <MyPlacementRecord
                authorized={JSON.parse(localStorage.getItem("userState"))}
              />
            )}
          />
          <Route exact path="/faq/student" component={FAQ} />
          <Route exact path="/faq/admin" component={AdminFAQ} />
          <Route exact path="/addstudents/admin" component={AddStudent} />
          <Route exact path="/mainpage/admin" component={StudentRecords} />
          <Route
            exact
            path="/studentrecord/admin"
            component={EditStudentRecord}
          />
          <Route
            exact
            path="/placementrecord/admin"
            component={() => (
              <EditPlacementRecord
                authorized={JSON.parse(localStorage.getItem("userState"))}
              />
            )}
          />
          <Route exact path="/logout" component={Logout} />
        </Switch>
      </Routes>
    </div>
  );
}

export default App;
