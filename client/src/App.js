import React from "react";
import "./App.css";
import Login from "./Pages/Login/Login";
import FAQ from "./Pages/Student/FAQ/FAQ";
import MyPlacementRecord from "./Pages/Student/MyPlacementRecord/MyPlacementRecord";
import AdminFAQ from "./Pages/Admin/AdminFAQ/AdminFAQ";
import AddStudent from "./Pages/Admin/AddStudent/AddStudent";
import StudentRecords from "./Pages/Admin/StudentRecords/StudentRecords";
import EditPlacementRecord from "./Pages/Admin/StudentRecords/EditPlacementRecord";
import EditStudentRecord from "./Pages/Admin/StudentRecords/EditStudentRecord";
import Logout from "./Pages/Logout/Logout";

import { BrowserRouter as Routes, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route
            exact
            path="/student/mainpage"
            component={() => (
              <MyPlacementRecord
                authorized={JSON.parse(localStorage.getItem("userState"))}
              />
            )}
          />
          <Route
            exact
            path="/student/faq"
            component={() => (
              <FAQ authorized={JSON.parse(localStorage.getItem("userState"))} />
            )}
          />
          <Route
            exact
            path="/admin/faq"
            component={() => (
              <AdminFAQ
                authorized={JSON.parse(localStorage.getItem("userState"))}
                access={JSON.parse(localStorage.getItem("userUid"))}
              />
            )}
          />
          <Route
            exact
            path="/admin/addstudents"
            component={() => (
              <AddStudent
                authorized={JSON.parse(localStorage.getItem("userState"))}
                access={JSON.parse(localStorage.getItem("userUid"))}
              />
            )}
          />
          <Route
            exact
            path="/admin/mainpage"
            component={() => (
              <StudentRecords
                authorized={JSON.parse(localStorage.getItem("userState"))}
                access={JSON.parse(localStorage.getItem("userUid"))}
              />
            )}
          />
          <Route
            exact
            path="/admin/edit/studentrecord"
            component={() => (
              <EditStudentRecord
                authorized={JSON.parse(localStorage.getItem("userState"))}
                access={JSON.parse(localStorage.getItem("userUid"))}
              />
            )}
          />
          <Route
            exact
            path="/admin/edit/placementrecord"
            component={() => (
              <EditPlacementRecord
                authorized={JSON.parse(localStorage.getItem("userState"))}
                access={JSON.parse(localStorage.getItem("userUid"))}
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
