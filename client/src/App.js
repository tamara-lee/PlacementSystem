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
import TestFileUpload from "./Pages/Admin/StudentRecords/TestFileUpload";
import { BrowserRouter as Routes, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Switch>
          <Route exact path="/" component={Login} />
          {/* <Route exact path="/home" component={Home} /> */}
          {/* <Route
            exact
            path="/home"
            component={() => (
              <Home
                authorized={JSON.parse(localStorage.getItem("userState"))}
              />
            )}
          /> */}
          <Route
            exact
            path="/student/mainpage"
            component={() => (
              <MyPlacementRecord
                authorized={JSON.parse(localStorage.getItem("userState"))}
              />
            )}
          />
          <Route exact path="/student/faq" component={FAQ} />
          <Route exact path="/admin/faq" component={AdminFAQ} />
          <Route exact path="/admin/addstudents" component={AddStudent} />
          <Route exact path="/admin/mainpage" component={StudentRecords} />
          <Route
            exact
            path="/admin/edit/studentrecord"
            component={EditStudentRecord}
          />
          <Route
            exact
            path="/admin/edit/placementrecord"
            component={() => (
              <EditPlacementRecord
                authorized={JSON.parse(localStorage.getItem("userState"))}
              />
            )}
          />
          <Route exact path="/testfileupload" component={TestFileUpload} />
          <Route exact path="/logout" component={Logout} />
        </Switch>
      </Routes>
    </div>
  );
}

export default App;
