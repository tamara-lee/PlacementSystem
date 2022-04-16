import React, { useState, useRef, useEffect } from "react";
import Axios from "axios";
import NavigationBar from "../../../components/NavBarAdmin/NavBarAdmin";
import { Redirect } from "react-router-dom";
import "./style.css";
import styled from "styled-components";
import Typography from "@mui/material/Typography";

// for pop-ups
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Container = styled.div`
  justify-content: center;
  margin: 1.2rem 3rem 2rem 3rem;
`;

const user_uid = localStorage.getItem("userUid");

function EditStudentRecord({ authorized, access }) {
  Axios.defaults.withCredentials = true;

  // get student number from url
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const student_uid = params.get("studentNumber");

  // executed when page is loaded
  // details in form from server
  useEffect(() => {
    Axios.get("http://localhost:3001/auth/login")
      .then((response) => {})
      .catch((error) => {
        console.log(error.response);
        if (
          error.response.data.error ===
          "User is not authenticated!\nPlease log in."
        ) {
          localStorage.setItem("userState", false);
          alert("You have been logged out. Please refresh and log in again.");
        }
      });
    getForm();
  }, []);

  // student fields
  const [studentName, setStudentName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [studentCurriculum, setStudentCurriculum] = useState("BEng(CompSc)");
  const [academicYear, setAcademicYear] = useState("");
  const [placementYear, setPlacementYear] = useState("");
  const [courseYear, setCourseYear] = useState("");

  // get form details by calling api
  const getForm = () => {
    Axios.get("http://localhost:3001/placementrecord/student", {
      params: {
        studentNumber: student_uid,
      },
    })
      .then((res) => {
        console.log(res.data);
        setStudentName(res.data.english_name);
        setStudentNumber(res.data.placement[0].student_uid);
        setStudentCurriculum(res.data.curriculum);
        setAcademicYear(res.data.acad_year);
        setPlacementYear(res.data.placement[0].placement_year);
        setCourseYear(res.data.course_year);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  // field checking
  const checkUniversityNumber = (e) => {
    if (/^\d\d\d\d\d\d\d\d\d\d$/.test(e)) {
      return true;
    } else {
      return false;
    }
  };

  const checkYear = (e) => {
    if (/^\d\d\d\d$/.test(e)) {
      return true;
    } else {
      return false;
    }
  };

  const checkCourseYear = (e) => {
    if (/^\d$/.test(e)) {
      return true;
    } else {
      return false;
    }
  };

  // constants for error messages
  const [showUidErrorMsg, setShowUidErrorMsg] = useState(false);
  const [showAcademicErrorMsg, setShowAcademicErrorMsg] = useState(false);
  const [showPlacementErrorMsg, setShowPlacementErrorMsg] = useState(false);
  const [showCourseErrorMsg, setShowCourseErrorMsg] = useState(false);

  // constants for pop-ups
  const [openError, setOpenError] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);

  // handle pop-ups
  const handleCloseError = () => {
    setOpenError(false);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleCloseFail = () => {
    setOpenFail(false);
  };

  // check no errors before submit form
  const submitForm = () => {
    if (
      !studentName &&
      !studentNumber &&
      !academicYear &&
      !placementYear &&
      !courseYear
    ) {
      setOpenError(true);
    } else if (
      showUidErrorMsg ||
      showCourseErrorMsg ||
      showAcademicErrorMsg ||
      showPlacementErrorMsg
    ) {
      setOpenError(true);
    } else {
      setOpenConfirmation(true);
    }
  };

  // confirm to submit form
  // call put api to update record
  const confirmSubmitForm = () => {
    handleCloseConfirmation();

    Axios.put("http://localhost:3001/editStudent/admin", {
      user_uid: user_uid,
      studentName: studentName,
      studentNumber: studentNumber,
      studentCurriculum: studentCurriculum,
      acadYear: academicYear,
      placementYear: placementYear,
      courseYear: courseYear,
    })
      .then((response) => {
        console.log(response.data.message);
        setOpenSuccess(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setOpenFail(true);
      });
  };

  // check login status
  if (authorized === false) {
    console.log(authorized);
    return <Redirect to="/" />;
  }

  // check if user has access
  if (access !== "0000000000") {
    console.log(authorized);
    return <Redirect to="/student/mainpage" />;
  }

  return (
    <>
      <NavigationBar />
      {/* desktop and mobile view */}
      <Container>
        <form>
          <Typography
            style={{
              fontSize: "18px",
            }}
          >
            STUDENT RECORD
          </Typography>
          <div className="container">
            <label htmlFor="studentName">NAME</label>
            <input
              className="input"
              type="text"
              id="studentName"
              defaultValue={studentName}
              onChange={(e) => {
                setStudentName(e.target.value);
              }}
              disabled
            />
            <label htmlFor="studentNo">
              UNIVERSITY NUMBER
              {showUidErrorMsg && (
                <span className="error-message">
                  Invalid university number. Please enter a valid university
                  number.
                </span>
              )}
            </label>
            <input
              className="input"
              type="text"
              id="studentNo"
              defaultValue={studentNumber}
              onChange={(e) => {
                if (e.target.value == "") {
                  setStudentNumber(e.target.value);
                  setShowUidErrorMsg(false);
                } else if (checkUniversityNumber(e.target.value)) {
                  setStudentNumber(e.target.value);
                  setShowUidErrorMsg(false);
                } else {
                  setStudentNumber(e.target.value);
                  setShowUidErrorMsg(true);
                }
              }}
              disabled
            />
            <label htmlFor="curriculum">CURRICULUM</label>
            <select
              className="input"
              type="text"
              id="curriculum"
              value={studentCurriculum}
              onChange={(e) => {
                setStudentCurriculum(e.target.value);
              }}
            >
              <option value="BEng(CompSc)">BEng(CompSc)</option>
              <option value="BBA(IS)">BBA(IS)</option>
            </select>
            <label htmlFor="academicYear">
              ACADEMIC YEAR
              {showAcademicErrorMsg && (
                <span className="error-message">
                  Invalid academic year. Please enter a 4 digit number.
                </span>
              )}
            </label>
            <input
              className="input"
              type="number"
              id="academicYear"
              defaultValue={academicYear}
              onChange={(e) => {
                if (e.target.value == "") {
                  setAcademicYear(e.target.value);
                  setShowAcademicErrorMsg(false);
                } else if (checkYear(e.target.value)) {
                  setAcademicYear(e.target.value);
                  setShowAcademicErrorMsg(false);
                } else {
                  setAcademicYear(e.target.value);
                  setShowAcademicErrorMsg(true);
                }
              }}
            />
            <label htmlFor="placementYear">
              PLACEMENT YEAR{" "}
              {showPlacementErrorMsg && (
                <span className="error-message">
                  Invalid placement year. Please enter a 4 digit number.
                </span>
              )}
            </label>
            <input
              className="input"
              type="number"
              id="placementYear"
              defaultValue={placementYear}
              onChange={(e) => {
                if (e.target.value == "") {
                  setPlacementYear(e.target.value);
                  setShowPlacementErrorMsg(false);
                } else if (checkYear(e.target.value)) {
                  setPlacementYear(e.target.value);
                  setShowPlacementErrorMsg(false);
                } else {
                  setPlacementYear(e.target.value);
                  setShowPlacementErrorMsg(true);
                }
              }}
            />
            <label htmlFor="courseYear">
              COURSE YEAR
              {showCourseErrorMsg && (
                <span className="error-message">
                  Invalid course year. Please enter a single digit value.
                </span>
              )}
            </label>
            <input
              className="input"
              type="number"
              id="courseYear"
              defaultValue={courseYear}
              onChange={(e) => {
                if (e.target.value == "") {
                  setCourseYear(e.target.value);
                  setShowCourseErrorMsg(false);
                } else if (checkCourseYear(e.target.value)) {
                  setCourseYear(e.target.value);
                  setShowCourseErrorMsg(false);
                } else {
                  setCourseYear(e.target.value);
                  setShowCourseErrorMsg(true);
                }
              }}
            />
          </div>
          <button
            className="form-submit"
            onClick={(e) => {
              e.preventDefault();
              submitForm();
            }}
          >
            Save & Submit
          </button>
        </form>
        {/* pop-ups */}
        <Dialog
          open={openError}
          onClose={handleCloseError}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Error(s) in form!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please ensure all fields are completed and correct before
              submission.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleCloseError} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openConfirmation}
          onClose={handleCloseConfirmation}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please ensure all fields are correct before submission.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleCloseConfirmation}>
              No
            </Button>
            <Button type="button" onClick={confirmSubmitForm} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openSuccess}
          onClose={handleCloseSuccess}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Successfully submitted changes!"}
          </DialogTitle>
          <DialogActions>
            <Button type="button" onClick={handleCloseSuccess} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openFail}
          onClose={handleCloseFail}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Error in submitting form!"}
          </DialogTitle>
          <DialogActions>
            <Button type="button" onClick={handleCloseFail} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default EditStudentRecord;
