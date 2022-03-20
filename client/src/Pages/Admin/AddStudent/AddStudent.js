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

function AddStudent({ authorized }) {
  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/auth/login")
      .then((response) => {})
      .catch((error) => {
        console.log(error.response);
        if (
          error.response.data.error ===
          "User is not authenticated!\nPlease log in."
        ) {
          console.log("logged out.");
          localStorage.setItem("userState", false);
          alert("You have been logged out. Please refresh and log in again.");
        }
      });
  }, []);

  const [name, setName] = useState("");
  const [universityNumber, setUniversityNumber] = useState("");
  const [curriculum, setCurriculum] = useState("BEng(CompSc)");
  const [academicYear, setAcademicYear] = useState("");
  const [placementYear, setPlacementYear] = useState("");

  const [showUidErrorMsg, setShowUidErrorMsg] = useState(false);
  const [showAcademicErrorMsg, setShowAcademicErrorMsg] = useState(false);
  const [showPlacementErrorMsg, setShowPlacementErrorMsg] = useState(false);

  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");

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

  const handleImport = (e) => {
    alert(`File uploaded is ${file}`);
  };
  const handleUpload = (e) => {
    const username = localStorage.getItem("username");
    const account_id = localStorage.getItem("userId");

    if (!showUidErrorMsg && !showAcademicErrorMsg && !showPlacementErrorMsg) {
      // alert(`The following is the data you want to submit:
      //         Name: ${name}
      //         University Number: ${universityNumber}
      //         Curriculum: ${curriculum}
      //         Academic Year: ${academicYear}
      //         Placement Year: ${placementYear}
      // `);

      Axios.post("http://localhost:3001/addstudents/admin", {
        username: username,
        account_id: account_id,
        name: name,
        universityNumber: universityNumber,
        curriculum: curriculum,
        academicYear: parseInt(academicYear),
        placementYear: parseInt(placementYear),
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert(
        `There is an error in the form. Please make sure there are no error messages before submitting!`
      );
    }
  };

  if (authorized === false) {
    console.log(authorized);
    return <Redirect to="/" />;
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
                Upload
              </Button>

              {/* Import
            </input> */}
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
                    // placeholder="Enter university number here..."
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
                    <option value="compsc" selected>
                      BEng(CompSc)
                    </option>
                    <option value="is">BBA(IS)</option>
                  </select>
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
                    // placeholder="Enter academic year here..."
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
                    // placeholder="Enter placement year here..."
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
                  {/* <button className="form-submit" onClick={submitForm}>
            Save & Submit
          </button> */}
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
        </Container>
      </div>
    </>
  );
}

export default AddStudent;
