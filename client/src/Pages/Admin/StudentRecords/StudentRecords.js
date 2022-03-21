import React, { useState, useEffect } from "react";
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
import TestData from "../../../mock data/test_data.json";

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

// for pop-up
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// for card
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import studentRecords from "../../../mock data/test_data.json";
import tableRecords from "../../../mock data/records.json";

// Axios.get("http://localhost:3001/placementrecord/student/acadyear", {}).then(
//   (response) => {
//     console.log(response);
//   }
// );
// Axios.get(
//   "http://localhost:3001/placementrecord/student/placementyear",
//   {}
// ).then((response) => {
//   console.log(response);
// });

// get json of all student records
// get json of all placement records

function StudentRecords({ authorized }) {
  const history = useHistory();

  // let records = tableRecords;

  const [open, setOpen] = React.useState(false);
  const [acadYear, setAcadYear] = useState("");
  const [placementYear, setPlacementYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [recentlyUpdated, setRecentlyUpdated] = useState(false);
  const [records, setRecords] = useState(tableRecords);
  const [filteredRecords, setFilteredRecords] = useState(tableRecords);
  const [sortRecentlyUpdated, setSortRecentlyUpdated] = useState([]);
  const [show, setShow] = useState(false);

  const [rows, setRows] = useState(
    Object.keys(records).map((element) =>
      createData(
        records[element]["student_uid"],
        records[element]["english_name"],
        records[element]["username"],
        records[element]["curriculum"],
        records[element]["placement_status"]
      )
    )
  );

  const fields = [
    {
      placement_id: "Placement ID",
      placement_year: "Placement Year",
      acad_year: "Academic Year",
      username: "Username",
      student_uid: "Student UID",
      english_name: "Student Name",
      curriculum: "Curriculum",
      job_title: "Job Title",
      company_name: "Company Name",
      job_nature: "Job Nature",
      start_date: "Start Date",
      end_date: "End Date",
      employment_duration: "Employment Duration",
      working_location: "Working Location",
      payment_type: "Payment Type",
      salary: "Salary",
      supervisor_name: "Supervisor Name",
      supervisor_telephone: "Supervisor Telephone",
      supervisor_email: "Supervisor Email",
      consent_form: "Consent Form (Uploaded: Yes/No)",
      appointment_letter: "Appointment Letter (Uploaded: Yes/No)",
      feedback_form: "Feedback Form (Uploaded: Yes/No)",
      feedback_comment: "Feedback Comment",
      placement_status: "Placement Status",
    },
  ];

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

  // ADD API
  // Axios.get("http://localhost:3001/{}}").then((response) => {
  //   console.log(response);
  // });

  function sortAlphabetically() {
    // records = tableRecords;
    // records.sort(function (a, b) {
    //   return a.english_name < b.english_name
    //     ? -1
    //     : a.english_name > b.english_name
    //     ? 1
    //     : 0;
    // });
    // setRecords(tableRecords);
    filteredRecords.sort(function (a, b) {
      return a.english_name < b.english_name
        ? -1
        : a.english_name > b.english_name
        ? 1
        : 0;
    });
  }

  acadYears.sort();
  placementYears.sort();
  sortAlphabetically();

  const handleAcadYear = (e) => {
    setAcadYear(e.target.value);
    if (placementYear == "") {
      setFilteredRecords(
        records.filter(function (data) {
          return data.acad_year == e.target.value;
        })
      );
    } else {
      setFilteredRecords(
        records.filter(function (data) {
          return (
            data.acad_year == e.target.value &&
            data.placement_year == placementYear
          );
        })
      );
    }
  };

  const handlePlacementYear = (e) => {
    setPlacementYear(e.target.value);
    if (acadYear == "") {
      setFilteredRecords(
        records.filter(function (data) {
          return data.placement_year == e.target.value;
        })
      );
    } else {
      setFilteredRecords(
        records.filter(function (data) {
          return (
            data.placement_year == e.target.value && data.acad_year == acadYear
          );
        })
      );
    }
  };

  // useEffect(() => {
  //   console.log("Do something after counter has changed", placementYear);
  // }, [placementYear]);
  const handleRecentlyUpdated = (e) => {
    // records.sort(function (a, b) {
    //   return a.last_modified < b.last_modified
    //     ? -1
    //     : a.last_modified > b.last_modified
    //     ? 1
    //     : 0;
    // });
    // alert("Recently Updated button clicked");
  };

  const selectAll = (e) => {};

  const handleStudent = (e) => {
    return history.push("/admin/edit/studentrecord");
  };

  const handlePlacement = (e) => {
    return history.push("/admin/edit/placementrecord");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // alert(e.target.value);
    setFilteredRecords(
      records.filter(function (data) {
        return (
          String(data.student_uid).includes(e.target.value) ||
          String(data.english_name).includes(e.target.value) ||
          String(data.username).includes(e.target.value)
        );
      })
    );
  };

  const resetFilters = () => {
    // alert("Default button clicked! This button is used to reset the filters!");
    setAcadYear("");
    setPlacementYear("");
    setFilteredRecords(records);
    sortAlphabetically();
    setSearchTerm("");
  };

  useEffect(() => {
    setAcadYear(acadYear);
    console.log(acadYear);
  }, [acadYear]);

  useEffect(() => {
    // console.log(records);
    // PROBLEM WITH FILTERS ACAD AND PLACMENT
    // console.log(acadYear);
    // alert("Academic Year is " + acadYear);
    // console.log(placementYear);
    // alert("Placement Year is " + placementYear);
    // setAcadYear(acadYear);
    // setPlacementYear(placementYear);
    // if (acadYear != "") {
    //   setRecords(
    //     tableRecords.filter(function (data) {
    //       return data.acad_year == acadYear;
    //     })
    //   );
    // }

    console.log(filteredRecords);
    setRows(
      Object.keys(filteredRecords).map((element) =>
        createData(
          filteredRecords[element]["student_uid"],
          filteredRecords[element]["english_name"],
          filteredRecords[element]["username"],
          filteredRecords[element]["curriculum"],
          filteredRecords[element]["placement_status"]
        )
      )
    );
  }, [acadYear, placementYear, recentlyUpdated, searchTerm]);

  if (authorized === false) {
    console.log(authorized);
    return <Redirect to="/" />;
  }

  return (
    <>
      <div>
        <NavigationBar />
        <Container>
          <Box sx={{ display: { xs: "none", md: "initial" } }}>
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
                  value={acadYear}
                  onChange={handleAcadYear}
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
                  value={placementYear}
                  onChange={handlePlacementYear}
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
                onClick={handleClickOpen}
              >
                Export
              </Button>
              <Dialog maxWidth="xl" open={open} onClose={handleClose}>
                <DialogTitle>Select fields to export</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Select the fields you would like to export and the relevant
                    information will be exported in an Excel file.
                  </DialogContentText>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      checked={selectAll}
                      label="All"
                    />
                    {Object.keys(fields[0]).map((element) => (
                      <FormControlLabel
                        control={<Checkbox />}
                        label={fields[0][element]}
                      />
                    ))}
                  </FormGroup>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClose}>Export</Button>
                </DialogActions>
              </Dialog>
              <Button
                style={{
                  marginLeft: "20px",
                  marginRight: "20px",
                  width: "90px",
                  height: "2.5rem",
                  backgroundColor: "#f2f2f2",
                  borderStyle: "none",
                  color: "#333333",
                  boxShadow: "1px 1px 1px rgba(34, 48, 15, 0.4)",
                  fontSize: "14px",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
                onClick={resetFilters}
              >
                Default
              </Button>
              <TextField
                id="filled-search"
                label="Search..."
                type="search"
                variant="filled"
                style={{
                  marginLeft: "auto",
                  marginRight: "20px",
                  fontSize: "14px",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
                value={searchTerm}
                onChange={handleSearch}
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
                      <TableCell align="center">
                        {row.placement_status}
                      </TableCell>
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
          </Box>
          <Box sx={{ display: { xs: "initial", md: "none" } }}>
            <Box style={{ paddingTop: "20px", paddingBottom: "20px" }}>
              <TextField
                id="filled-search"
                label="Search..."
                type="search"
                variant="filled"
                style={{
                  marginLeft: "auto",
                  marginRight: "20px",
                  fontSize: "13px",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
                value={searchTerm}
                onChange={handleSearch}
              />
              <Button
                variant="outlined"
                style={{
                  marginLeft: "20px",
                  marginRight: "20px",
                  width: "90px",
                  height: "2.5rem",
                  backgroundColor: "#f2f2f2",
                  borderStyle: "none",
                  color: "#333333",
                  boxShadow: "1px 1px 1px rgba(34, 48, 15, 0.4)",
                  fontSize: "14px",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
                onClick={() => setShow(!show)}
              >
                Filters
              </Button>
              {show ? (
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Box style={{ display: "flex" }}>
                      <Box>
                        <InputLabel variant="standard" id="academicYear">
                          <Typography
                            style={{
                              fontSize: "12px",
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
                          value={acadYear}
                          onChange={handleAcadYear}
                        >
                          {Object.keys(acadYears).map((element) => (
                            <MenuItem value={acadYears[element]}>
                              {acadYears[element]}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                      <Box>
                        <InputLabel variant="standard" id="placementYear">
                          <Typography
                            style={{
                              fontSize: "12px",
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
                          value={placementYear}
                          onChange={handlePlacementYear}
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
                          width: "150px",
                          height: "3rem",
                          backgroundColor: "#f2f2f2",
                          borderStyle: "none",
                          color: "#333333",
                          boxShadow: "1px 1px 1px rgba(34, 48, 15, 0.4)",
                          fontSize: "13px",
                          marginTop: "auto",
                          marginBottom: "auto",
                        }}
                        onClick={handleRecentlyUpdated}
                      >
                        Recently Updated
                      </Button>
                    </Box>
                    <Box style={{ display: "flex" }}>
                      <Button
                        style={{
                          marginLeft: "20px",
                          marginRight: "20px",
                          width: "70px",
                          height: "2rem",
                          backgroundColor: "#f2f2f2",
                          borderStyle: "none",
                          color: "#404040",
                          boxShadow: "1px 1px 1px rgba(34, 48, 15, 0.4)",
                          fontSize: "13px",
                          marginTop: "auto",
                          marginBottom: "auto",
                        }}
                        onClick={handleClickOpen}
                      >
                        Export
                      </Button>
                      <Dialog maxWidth="xl" open={open} onClose={handleClose}>
                        <DialogTitle>Select fields to export</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Select the fields you would like to export and the
                            relevant information will be exported in an Excel
                            file.
                          </DialogContentText>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              checked={selectAll}
                              label="All"
                            />
                            {Object.keys(fields[0]).map((element) => (
                              <FormControlLabel
                                control={<Checkbox />}
                                label={fields[0][element]}
                              />
                            ))}
                          </FormGroup>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={handleClose}>Export</Button>
                        </DialogActions>
                      </Dialog>
                      <Button
                        style={{
                          marginLeft: "20px",
                          marginRight: "20px",
                          width: "70px",
                          height: "2rem",
                          backgroundColor: "#f2f2f2",
                          borderStyle: "none",
                          color: "#333333",
                          boxShadow: "1px 1px 1px rgba(34, 48, 15, 0.4)",
                          fontSize: "13px",
                          marginTop: "auto",
                          marginBottom: "auto",
                        }}
                        onClick={resetFilters}
                      >
                        Default
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ) : null}
            </Box>{" "}
            {filteredRecords.map((val, key) => {
              return (
                <Card variant="outlined" style={{ marginBottom: "5px" }}>
                  <CardContent style={{ display: "flex" }}>
                    <Typography variant="body2">
                      Name: {val.english_name}
                    </Typography>
                    <Typography variant="body2">
                      UID: {val.student_uid}
                    </Typography>
                    <Typography variant="body2">Status: </Typography>
                    <Button size="small">Edit Student</Button>
                    <Button size="small">Edit Record</Button>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Container>
      </div>
    </>
  );
}

export default StudentRecords;
