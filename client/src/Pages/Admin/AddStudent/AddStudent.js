import React, { useState, useEffect } from "react";
import NavigationBar from "../../../components/NavBarAdmin/NavBarAdmin";
import { Redirect } from "react-router-dom";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import "./style.css";
import Axios from "axios";

// for pop-ups
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function AddStudent({ authorized, access }) {
  Axios.defaults.withCredentials = true;

  // executed when page is loaded
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
  }, []);

  // constants for fields in form
  const [name, setName] = useState("");
  const [universityNumber, setUniversityNumber] = useState("");
  const [curriculum, setCurriculum] = useState("BEng(CompSc)");
  const [academicYear, setAcademicYear] = useState("");
  const [placementYear, setPlacementYear] = useState("");
  const [courseYear, setCourseYear] = useState("");

  // for pop-ups and error messages
  const [openUploadError, setOpenUploadError] = useState(false);
  const [openFieldError, setOpenFieldError] = useState(false);
  const [openImportError, setOpenImportError] = useState(false);

  const [openUploadConfirmation, setOpenUploadConfirmation] = useState(false);
  const [openImportConfirmation, setOpenImportConfirmation] = useState(false);

  const [openImportSuccess, setOpenImportSuccess] = useState(false);
  const [openImportFail, setOpenImportFail] = useState(false);
  const [openUploadSuccess, setOpenUploadSuccess] = useState(false);

  const [openUploadFail, setOpenUploadFail] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState("Error!");
  const [uploadFailMsg, setUploadFailMsg] = useState("Error!");
  const [importFailMsg, setImportFailMsg] = useState("Error!");
  const [importSuccessMsg, setImportSuccessMsg] = useState("Error!");

  const [showUidErrorMsg, setShowUidErrorMsg] = useState(false);
  const [showAcademicErrorMsg, setShowAcademicErrorMsg] = useState(false);
  const [showPlacementErrorMsg, setShowPlacementErrorMsg] = useState(false);
  const [showCourseErrorMsg, setShowCourseErrorMsg] = useState(false);

  // for import file
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");

  const username = localStorage.getItem("username");
  const account_id = localStorage.getItem("userId");

  // handle pop-ups
  const handleCloseUploadError = () => {
    setOpenUploadError(false);
  };

  const handleCloseFieldError = () => {
    setOpenFieldError(false);
  };

  const handleCloseImportError = () => {
    setOpenImportError(false);
  };

  const handleCloseUploadConfirmation = () => {
    setOpenUploadConfirmation(false);
  };

  const handleCloseImportConfirmation = () => {
    setOpenImportConfirmation(false);
  };

  const handleCloseImportSuccess = () => {
    setOpenImportSuccess(false);
  };

  const handleCloseImportFail = () => {
    setOpenImportFail(false);
  };

  const handleCloseUploadSuccess = () => {
    setOpenUploadSuccess(false);
  };

  const handleCloseUploadFail = () => {
    setOpenUploadFail(false);
  };

  // handle error checking
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

  // for importing
  const handleImport = (e) => {
    if (file === "") {
      setOpenImportError(true);
    } else {
      setOpenImportConfirmation(true);
    }
  };

  const confirmHandleImport = (e) => {
    handleCloseImportConfirmation();

    // send file in formdata
    const formData = new FormData();

    formData.append("studentRecordsFile", file, fileName);
    formData.append("username", username);

    Axios.post("http://localhost:3001/importexcel", formData)
      .then((res) => {
        // setImportSuccessMsg(res.data.message);
        setImportSuccessMsg("Successfully imported excel file!");
        setOpenImportSuccess(true);
      })
      .catch((error) => {
        // setImportFailMsg(error.response.data.message);
        setImportFailMsg("Failed to import excel file!");
        setOpenImportFail(true);
      });
  };

  // for uploading student record individually
  const handleUpload = () => {
    if (
      !name &&
      !universityNumber &&
      !academicYear &&
      !placementYear &&
      !courseYear
    ) {
      setOpenFieldError(true);
    } else if (
      showUidErrorMsg ||
      showCourseErrorMsg ||
      showAcademicErrorMsg ||
      showPlacementErrorMsg
    ) {
      setOpenUploadError(true);
    } else {
      setOpenUploadConfirmation(true);
    }
  };

  const confirmHandleUpload = () => {
    handleCloseUploadConfirmation();

    Axios.post("http://localhost:3001/addstudents/admin", {
      username: username,
      account_id: account_id,
      name: name,
      universityNumber: universityNumber,
      curriculum: curriculum,
      academicYear: academicYear,
      placementYear: placementYear,
      courseYear: parseInt(courseYear),
    })
      .then((res) => {
        setUploadSuccessMsg(res.data.message);
        setOpenUploadSuccess(true);
        // console.log(res);
      })
      .catch((error) => {
        setUploadFailMsg(error.response.data.message);
        setOpenUploadFail(true);
        // console.log(error.response.data.message);
      });
  };

  // check login status
  if (authorized === false) {
    console.log(authorized);
    return <Redirect to="/" />;
  }

  // check user access
  if (access !== "0000000000") {
    console.log(authorized);
    return <Redirect to="/student/mainpage" />;
  }

  return (
    <>
      <div>
        <NavigationBar />
        <Container
          sx={{
            paddingTop: "30px",
            paddingBottom: "30px",
          }}
        >
          <Typography
            style={{
              fontSize: "18px",
            }}
          >
            Add students by importing excel file
          </Typography>
          <Box
            textAlign="left"
            sx={{
              paddingTop: "10px",
            }}
          >
            <div className="file-drop-area">
              <span className="fake-btn">Choose file</span>
              <span className="file-msg">
                {fileName != "" ? fileName : "or drag and drop file here"}
              </span>
              <input
                type="file"
                name="studentRecordsFile"
                id="studentRecordsFile"
                onChange={function (e) {
                  setFile(e.target.files[0]);
                  setFileName(e.target.files[0].name);
                }}
              />
            </div>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  width: "100px",
                  height: "2.5rem",
                  backgroundColor: "#257F2F",
                  borderStyle: "none",
                  color: "white",
                  boxShadow: "1px 1px 1px rgba(34, 48, 15, 0.4)",
                  fontSize: "0.9rem",
                  "&:hover": {
                    color: "#257F2F",
                    borderColor: "#257F2F",
                  },
                  "&:active": {
                    color: "#257F2F",
                    borderColor: "#257F2F",
                  },
                }}
                onClick={handleImport}
              >
                Import
              </Button>
              <Box
                textAlign="left"
                sx={{
                  paddingLeft: "25px",
                }}
              >
                <Typography style={{ fontSize: "14px", fontWeight: "600" }}>
                  Template file:{" "}
                  <Link href="/template.xlsx" download>
                    Student Records Template
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider
            variant="middle"
            style={{
              marginTop: "20px",
              marginBottom: "20px",
            }}
          />

          <Typography
            style={{
              fontSize: "18px",
            }}
          >
            Add students individually
          </Typography>

          <Box
            textAlign="left"
            sx={{
              paddingTop: "10px",
              maxWidth: 600,
            }}
          >
            <Card sx={{ maxWidth: 600 }}>
              <CardContent>
                <div className="container">
                  <label htmlFor="studentName">Student Name</label>
                  <input
                    className="input"
                    type="text"
                    id="studentName"
                    value={name}
                    maxLength="100"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <label htmlFor="studentUniversityNumber">
                    Student University Number
                    {showUidErrorMsg && (
                      <span className="error-message">
                        Invalid university number. Please enter a valid
                        university number.
                      </span>
                    )}
                  </label>
                  <input
                    className="input"
                    type="number"
                    id="studentUniversityNumber"
                    value={universityNumber}
                    maxLength="50"
                    onChange={(e) => {
                      if (e.target.value == "") {
                        setUniversityNumber(e.target.value);
                        setShowUidErrorMsg(false);
                      } else if (checkUniversityNumber(e.target.value)) {
                        setUniversityNumber(e.target.value);
                        setShowUidErrorMsg(false);
                      } else {
                        setUniversityNumber(e.target.value);
                        setShowUidErrorMsg(true);
                      }
                    }}
                  />
                  <label htmlFor="curriculum">Curriculum</label>
                  <select
                    className="input"
                    type="text"
                    id="curriculum"
                    value={curriculum}
                    onChange={(e) => {
                      setCurriculum(e.target.value);
                    }}
                  >
                    <option value="BEng(CompSc)">BEng(CompSc)</option>
                    <option value="BBA(IS)">BBA(IS)</option>
                  </select>
                  <label htmlFor="courseYear">
                    Course Year
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
                    value={courseYear}
                    maxLength="4"
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
                  <label htmlFor="academicYear">
                    Academic Year
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
                    value={academicYear}
                    maxLength="4"
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
                    Placement Year
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
                    value={placementYear}
                    maxLength="4"
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
                </div>
                <CardActions>
                  <Button
                    type="submit"
                    style={{
                      width: "100px",
                      height: "2.5rem",
                      backgroundColor: "#257F2F",
                      borderStyle: "none",
                      color: "white",
                      boxShadow: "1px 1px 1px rgba(34, 48, 15, 0.4)",
                      fontSize: "0.9rem",
                      "&:hover": {
                        color: "#257F2F",
                        borderColor: "#257F2F",
                      },
                      "&:active": {
                        color: "#257F2F",
                        borderColor: "#257F2F",
                      },
                    }}
                    onClick={handleUpload}
                  >
                    Upload
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Box>
          {/* pop-ups */}
          <Dialog
            open={openImportError}
            onClose={handleCloseImportError}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"No file selected!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please select a file to upload by selecting a file from your
                local directory or drag and drop to the designated area.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseImportError} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openFieldError}
            onClose={handleCloseFieldError}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"All fields must be completed!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please ensure that all fields are completed before uploading the
                record.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseFieldError} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openUploadError}
            onClose={handleCloseUploadError}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Error(s) in form!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please check the error message(s) in red and fix them before
                submitting the form.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseUploadError} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openImportConfirmation}
            onClose={handleCloseImportConfirmation}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirm import of " + fileName + " ?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please ensure the correct file is selected.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseImportConfirmation}>No</Button>
              <Button onClick={confirmHandleImport} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openUploadConfirmation}
            onClose={handleCloseUploadConfirmation}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Student record will be added after submission.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseUploadConfirmation}>No</Button>
              <Button onClick={confirmHandleUpload} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openUploadSuccess}
            onClose={handleCloseUploadSuccess}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {uploadSuccessMsg}
            </DialogTitle>
            <DialogActions>
              <Button
                type="button"
                onClick={handleCloseUploadSuccess}
                autoFocus
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openUploadFail}
            onClose={handleCloseUploadFail}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{uploadFailMsg}</DialogTitle>
            <DialogActions>
              <Button type="button" onClick={handleCloseUploadFail} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openImportSuccess}
            onClose={handleCloseImportSuccess}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {importSuccessMsg}
            </DialogTitle>
            <DialogActions>
              <Button
                type="button"
                onClick={handleCloseImportSuccess}
                autoFocus
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openImportFail}
            onClose={handleCloseImportFail}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{importFailMsg}</DialogTitle>
            <DialogActions>
              <Button type="button" onClick={handleCloseImportFail} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    </>
  );
}

export default AddStudent;
