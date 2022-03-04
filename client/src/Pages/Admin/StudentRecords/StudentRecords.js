import React, { useState } from "react";
import NavigationBar from "../../../components/NavBarAdmin/NavBarAdmin";
import { Redirect } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import NativeSelect from "@mui/material/NativeSelect"; //use for mobile
import MenuItem from "@mui/material/MenuItem";
<<<<<<< HEAD
import TestData from "../../../mock data/test_data.json";
import Axios from "axios";

Axios.get("http://localhost:3001/placementrecord/student/acadyear", {}).then(
    (response) => {
      console.log(response);
    }
  );
  Axios.get("http://localhost:3001/placementrecord/student/placementyear", {}).then(
    (response) => {
      console.log(response);
    }
  );
=======
// for the table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import studentRecords from "../../../mock data/test_data.json";
import tableRecords from "../../../mock data/records.json";

// get json of all student records
// get json of all placement records
>>>>>>> 8878e71a2ce7a2a6a97f7f6bdef6f7572102e60c

function StudentRecords({ authorized }) {
  const history = useHistory();

  function createData(
    student_uid,
    english_name,
    username,
    curriculum,
    placement_status
  ) {
    return {
      student_uid,
      english_name,
      username,
      curriculum,
      placement_status,
    };
  }

  const [acadYear, setAcadYear] = useState("");
  const [placementYear, setPlacementYear] = useState("");

  const rows = Object.keys(tableRecords).map((element) =>
    createData(
      tableRecords[element]["student_uid"],
      tableRecords[element]["english_name"],
      tableRecords[element]["username"],
      tableRecords[element]["curriculum"],
      tableRecords[element]["placement_status"]
    )
  );

  const [searchTerm, setSearchTerm] = useState("");

  // Axios.get("http://localhost:3001/placementrecord/student/acadyear", {}).then(
  //   (response) => {
  //     console.log(response);
  //   }
  // );
  // Axios.get("http://localhost:3001/placementrecord/student/placementyear", {}).then(
  //   (response) => {
  //     console.log(response);
  //   }
  // );

  const acadYears = [
    ...new Set(
      Object.keys(studentRecords).map(
        (element) => studentRecords[element]["acad_year"]
      )
    ),
  ];

  const placementYears = [
    ...new Set(
      Object.keys(studentRecords).map(
        (element) => studentRecords[element]["placement_year"]
      )
    ),
  ];

  const handleExport = (e) => {
    alert("Export button clicked");
  };

  const handleRecentlyUpdated = (e) => {
    alert("Recently Updated button clicked");
  };

  const handleStudent = (e) => {
    return history.push("/studentrecord/admin");
  };

  const handlePlacement = (e) => {
    return history.push("/placementrecord/admin");
  };

  if (authorized === false) {
    console.log(authorized);
    return <Redirect to="/" />;
  }

  return (
    <>
      <div>
        <NavigationBar />
        <Container>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              marginTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <Box style={{ paddingRight: "20px" }}>
              <InputLabel variant="standard" id="academicYear">
                <Typography
                  style={{
                    fontSize: "15px",
                    color: "grey",
                  }}
                >
                  Academic Year
                </Typography>
              </InputLabel>
              <Select
                labelId="academicYear"
                id="select"
                style={{
                  minWidth: "100px",
                  maxHeight: "30px",
                  marginTop: "5px",
                  marginBottom: "10px",
                }}
              >
                {Object.keys(acadYears).map((element) => (
                  <MenuItem value={acadYears[element]}>
                    {acadYears[element]}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box style={{ paddingLeft: "20px", paddingRight: "20px" }}>
              <InputLabel variant="standard" id="placementYear">
                <Typography
                  style={{
                    fontSize: "15px",
                    color: "grey",
                  }}
                >
                  Placement Year
                </Typography>
              </InputLabel>
              <Select
                labelId="placementYear"
                id="select"
                style={{
                  minWidth: "100px",
                  maxHeight: "30px",
                  marginTop: "5px",
                  marginBottom: "10px",
                }}
              >
                {Object.keys(placementYears).map((element) => (
                  <MenuItem value={placementYears[element]}>
                    {placementYears[element]}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Button
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                width: "170px",
                height: "2.5rem",
                backgroundColor: "#f2f2f2",
                borderStyle: "none",
                color: "#333333",
                boxShadow: "1px 1px 1px rgba(34, 48, 15, 0.4)",
                fontSize: "14px",
                marginTop: "auto",
                marginBottom: "auto",
              }}
              onClick={handleRecentlyUpdated}
            >
              Recently Updated
            </Button>
            <Button
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                width: "90px",
                height: "2.5rem",
                backgroundColor: "#f2f2f2",
                borderStyle: "none",
                color: "#404040",
                boxShadow: "1px 1px 1px rgba(34, 48, 15, 0.4)",
                fontSize: "14px",
                marginTop: "auto",
                marginBottom: "auto",
              }}
              onClick={handleExport}
            >
              Export
            </Button>
            <TextField
              id="filled-search"
              label="Search field"
              type="search"
              variant="filled"
              style={{
                marginLeft: "auto",
                marginRight: "20px",
                fontSize: "14px",
                marginTop: "auto",
                marginBottom: "auto",
              }}
            />
          </Box>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Student UID</TableCell>
                  <TableCell align="center">Student Name</TableCell>
                  <TableCell align="center">CS ID</TableCell>
                  <TableCell align="center">Curriculum</TableCell>
                  <TableCell align="center">Placement Status</TableCell>
                  <TableCell align="center">Feedback Form</TableCell>
                  <TableCell align="center">Edit Student Details</TableCell>
                  <TableCell align="center">Edit Placement Record</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.student_uid}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.student_uid}
                    </TableCell>
                    <TableCell align="center">{row.english_name}</TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">{row.curriculum}</TableCell>
                    <TableCell align="center">{row.placement_status}</TableCell>
                    <TableCell align="center">
                      <Link href="sample_file.pdf" download>
                        Download
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={handleStudent}>Edit</Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={handlePlacement}>Edit</Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button disabled>Test</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </>
  );
}

export default StudentRecords;
