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
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";

// for the table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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


const handleDownloadExcelForm = () => {
  window.open(
    "http://localhost:3001/exportexcel"
  );
};

const username = localStorage.getItem("username");
const student_uid = localStorage.getItem("userUid");
const account_id = localStorage.getItem("userId");
const admin_id = localStorage.getItem("admin_uid");

function StudentRecords({ authorized }) {
  const history = useHistory();

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
          localStorage.setItem("userState", false);
          alert("You have been logged out. Please refresh and log in again.");
        }
      });
    setFieldsExport([
      {
        placement_id: 0,
        placement_year: 0,
        acad_year: 0,
        username: 0,
        student_uid: 0,
        english_name: 0,
        curriculum: 0,
        job_title: 0,
        company_name: 0,
        job_nature: 0,
        start_date: 0,
        end_date: 0,
        employment_duration: 0,
        working_location: 0,
        payment_type: 0,
        salary: 0,
        supervisor_name: 0,
        supervisor_telephone: 0,
        supervisor_email: 0,
        consent_form: 0,
        appointment_letter: 0,
        feedback_form: 0,
        feedback_comment: 0,
        placement_status: 0,
      },
    ]);
    getAcadYears();
    getPlacementYears();
    getRecords();
    sortAlphabetically();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [acadYear, setAcadYear] = useState("");
  const [placementYear, setPlacementYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [recentlyUpdated, setRecentlyUpdated] = useState(false);
  // const [records, setRecords] = useState(tableRecords);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [sortRecentlyUpdated, setSortRecentlyUpdated] = useState([]);
  const [show, setShow] = useState(false);

  const [fieldsExport, setFieldsExport] = useState();
  const [academicYearExport, setAcademicYearExport] = useState();

  const [showExportMissingYear, setShowExportMissingYear] = useState(false);

  const handleExport = () => {
    if (academicYearExport) {
      Axios.post("http://localhost:3001/exportexcel", {
        academic_year: academicYearExport,
        export_fields: fieldsExport[0],
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    } else {
      setShowExportMissingYear(true);
    }
  };

  const getRecords = () => {
    Axios.get("http://localhost:3001/mainpage/").then((res) => {
      console.log(res.data);
      // res.data.forEach((element) => {
      //   console.log(element.placement[0].placement_year);
      // });
      setRecords(res.data);
      setFilteredRecords(res.data);
      setRows(
        Object.keys(res.data).map((element) =>
          createData(
            res.data[element]["student_uid"],
            res.data[element]["english_name"],
            res.data[element]["user_account"]["username"],
            res.data[element]["curriculum"],
            res.data[element]["placement_status"],
            res.data[element]["last_modified"]
          )
        )
      );
    });
  };

  const [rows, setRows] = useState(
    Object.keys(records).map((element) =>
      createData(
        records[element]["student_uid"],
        records[element]["english_name"],
        records[element]["user_account"]["username"],
        records[element]["curriculum"],
        records[element]["placement_status"],
        records[element]["last_modified"]
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

  const [checked_placement_id, set_checked_placement_id] = useState(false);
  const [checked_placement_year, set_checked_placement_year] = useState(false);
  const [checked_acad_year, set_checked_acad_year] = useState(false);
  const [checked_username, set_checked_username] = useState(false);
  const [checked_student_uid, set_checked_student_uid] = useState(false);
  const [checked_english_name, set_checked_english_name] = useState(false);
  const [checked_curriculum, set_checked_curriculum] = useState(false);
  const [checked_job_title, set_checked_job_title] = useState(false);
  const [checked_company_name, set_checked_company_name] = useState(false);
  const [checked_job_nature, set_checked_job_nature] = useState(false);
  const [checked_start_date, set_checked_start_date] = useState(false);
  const [checked_end_date, set_checked_end_date] = useState(false);
  const [checked_employment_duration, set_checked_employment_duration] =
    useState(false);
  const [checked_working_location, set_checked_working_location] =
    useState(false);
  const [checked_payment_type, set_checked_payment_type] = useState(false);
  const [checked_salary, set_checked_salary] = useState(false);
  const [checked_supervisor_name, set_checked_supervisor_name] =
    useState(false);
  const [checked_supervisor_telephone, set_checked_supervisor_telephone] =
    useState(false);
  const [checked_supervisor_email, set_checked_supervisor_email] =
    useState(false);
  const [checked_consent_form, set_checked_consent_form] = useState(false);
  const [checked_appointment_letter, set_checked_appointment_letter] =
    useState(false);
  const [checked_feedback_form, set_checked_feedback_form] = useState(false);
  const [checked_feedback_comment, set_checked_feedback_comment] =
    useState(false);
  const [checked_placement_status, set_checked_placement_status] =
    useState(false);

  function createData(
    student_uid,
    english_name,
    username,
    curriculum,
    placement_status,
    last_modified
  ) {
    return {
      student_uid,
      english_name,
      username,
      curriculum,
      placement_status,
      last_modified,
    };
  }

  const handleCloseExportMissingYear = () => {
    setShowExportMissingYear(false);
  };
  const [acadYears, setAcadYears] = useState([]);
  const [placementYears, setPlacementYears] = useState([]);

  const getAcadYears = () => {
    Axios.get("http://localhost:3001/mainpage/acadyears").then((res) => {
      setAcadYears(
        [
          ...new Set(
            Object.keys(res.data).map(
              (element) => res.data[element]["acad_year"]
            )
          ),
        ].sort()
      );
    });
  };

  const getPlacementYears = () => {
    Axios.get("http://localhost:3001/mainpage/placementyears").then((res) => {
      setPlacementYears(
        [
          ...new Set(
            Object.keys(res.data).map(
              (element) => res.data[element]["placement_year"]
            )
          ),
        ].sort()
      );
    });
  };

  function sortAlphabetically() {
    filteredRecords.sort(function (a, b) {
      return a.english_name < b.english_name
        ? -1
        : a.english_name > b.english_name
        ? 1
        : 0;
    });

    setRows(
      Object.keys(filteredRecords).map((element) =>
        createData(
          filteredRecords[element]["student_uid"],
          filteredRecords[element]["english_name"],
          filteredRecords[element]["user_account"]["username"],
          filteredRecords[element]["curriculum"],
          filteredRecords[element]["placement_status"],
          filteredRecords[element]["last_modified"]
        )
      )
    );
  }

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
            data.placement[0].placement_year == placementYear
          );
        })
      );
    }
  };

  const handlePlacementYear = (e) => {
    setPlacementYear(e.target.value);
    // records.forEach((data) => {
    //   console.log(data.placement[0].placement_year);
    //   console.log("target", e.target.value);
    // });
    if (acadYear == "") {
      setFilteredRecords(
        records.filter(function (data) {
          return data.placement[0].placement_year == e.target.value;
        })
      );
    } else {
      setFilteredRecords(
        records.filter(function (data) {
          return (
            data.placement[0].placement_year == e.target.value &&
            data.acad_year == acadYear
          );
        })
      );
    }
  };

  // useEffect(() => {
  //   console.log("Do something after counter has changed", placementYear);
  // }, [placementYear]);
  const handleRecentlyUpdated = () => {
    filteredRecords.sort(function (a, b) {
      return a.last_modified < b.last_modified
        ? -1
        : a.last_modified > b.last_modified
        ? 1
        : 0;
    });
    setRows(
      Object.keys(filteredRecords).map((element) =>
        createData(
          filteredRecords[element]["student_uid"],
          filteredRecords[element]["english_name"],
          filteredRecords[element]["user_account"]["username"],
          filteredRecords[element]["curriculum"],
          filteredRecords[element]["placement_status"],
          filteredRecords[element]["last_modified"]
        )
      )
    );
    console.log(filteredRecords);
    // alert("Recently Updated button clicked");
  };

  // const selectAll = () => {
  //   // e.target.checked;
  //   console.log("select all checked!");
  // };

  const [selectedUsername, setSelectedUsername] = useState("");

  const handleStudent = (e, id) => {
    console.log("edit student clicked!");
    console.log(id);

    return history.push("/admin/edit/studentrecord?studentNumber=" + id);
  };

  const handlePlacement = (e, id) => {
    console.log("edit placement clicked!");
    console.log(id);

    return history.push("/admin/edit/placementrecord?studentNumber=" + id);
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
          String(data.user_account.username).includes(e.target.value)
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
    console.log(filteredRecords);
  };

  // useEffect(() => {
  //   setAcadYear(acadYear);
  // }, [acadYear]);

  useEffect(() => {
    console.log(filteredRecords);
    setRows(
      Object.keys(filteredRecords).map((element) =>
        createData(
          filteredRecords[element]["student_uid"],
          filteredRecords[element]["english_name"],
          filteredRecords[element]["user_account"]["username"],
          filteredRecords[element]["curriculum"],
          filteredRecords[element]["placement_status"],
          filteredRecords[element]["last_modified"]
        )
      )
    );
  }, [acadYear, placementYear, recentlyUpdated, searchTerm]);

  const IsolatedEditStudentButton = (row) => {
    return (
      <React.Fragment>
        <Button
          type="button"
          key={row.student_uid}
          onClick={(e) => handleStudent(e, row.student_uid)}
        >
          Edit
        </Button>
      </React.Fragment>
    );
  };

  const IsolatedEditStudentButtonMobile = (row) => {
    return (
      <React.Fragment>
        <Button
          type="button"
          key={row.student_uid}
          onClick={(e) => handleStudent(e, row.student_uid)}
        >
          Edit Student
        </Button>
      </React.Fragment>
    );
  };

  const IsolatedEditPlacementButton = (row) => {
    return (
      <React.Fragment>
        <Button
          type="button"
          key={row.student_uid}
          onClick={(e) => handlePlacement(e, row.student_uid)}
        >
          Edit
        </Button>
      </React.Fragment>
    );
  };

  const IsolatedEditPlacementButtonMobile = (row) => {
    return (
      <React.Fragment>
        <Button
          type="button"
          key={row.student_uid}
          onClick={(e) => handlePlacement(e, row.student_uid)}
        >
          Edit Placement
        </Button>
      </React.Fragment>
    );
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
                    <MenuItem key={element} value={acadYears[element]}>
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
                    <MenuItem key={element} value={placementYears[element]}>
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
                    <InputLabel variant="standard" id="academicYearExport">
                      <Typography
                        style={{
                          fontSize: "15px",
                          color: "black",
                          marginTop: "10px",
                        }}
                      >
                        Academic Year
                      </Typography>
                    </InputLabel>
                    <Select
                      labelId="academicYearExport"
                      id="select"
                      style={{
                        minWidth: "100px",
                        maxHeight: "30px",
                        marginTop: "5px",
                        marginBottom: "10px",
                      }}
                      // defaultValue={acadYears[0]}
                      value={academicYearExport}
                      onChange={(e) => {
                        setAcademicYearExport(e.target.value);
                        console.log(e.target.value);
                      }}
                    >
                      {Object.keys(acadYears).map((element) => (
                        <MenuItem key={element} value={acadYears[element]}>
                          {acadYears[element]}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormControlLabel
                      control={<Checkbox />}
                      onChange={(e) => {
                        if (e.target.checked) {
                          set_checked_placement_id(true);
                          set_checked_placement_year(true);
                          set_checked_acad_year(true);
                          set_checked_username(true);
                          set_checked_student_uid(true);
                          set_checked_english_name(true);
                          set_checked_curriculum(true);
                          set_checked_job_title(true);
                          set_checked_company_name(true);
                          set_checked_job_nature(true);
                          set_checked_start_date(true);
                          set_checked_end_date(true);
                          set_checked_employment_duration(true);
                          set_checked_working_location(true);
                          set_checked_payment_type(true);
                          set_checked_salary(true);
                          set_checked_supervisor_name(true);
                          set_checked_supervisor_telephone(true);
                          set_checked_supervisor_email(true);
                          set_checked_consent_form(true);
                          set_checked_appointment_letter(true);
                          set_checked_feedback_form(true);
                          set_checked_feedback_comment(true);
                          set_checked_placement_status(true);
                          Object.keys(fieldsExport[0]).map(
                            (element) => (fieldsExport[0][element] = 1)
                          );
                        } else {
                          set_checked_placement_id(false);
                          set_checked_placement_year(false);
                          set_checked_acad_year(false);
                          set_checked_username(false);
                          set_checked_student_uid(false);
                          set_checked_english_name(false);
                          set_checked_curriculum(false);
                          set_checked_job_title(false);
                          set_checked_company_name(false);
                          set_checked_job_nature(false);
                          set_checked_start_date(false);
                          set_checked_end_date(false);
                          set_checked_employment_duration(false);
                          set_checked_working_location(false);
                          set_checked_payment_type(false);
                          set_checked_salary(false);
                          set_checked_supervisor_name(false);
                          set_checked_supervisor_telephone(false);
                          set_checked_supervisor_email(false);
                          set_checked_consent_form(false);
                          set_checked_appointment_letter(false);
                          set_checked_feedback_form(false);
                          set_checked_feedback_comment(false);
                          set_checked_placement_status(false);
                          Object.keys(fieldsExport[0]).map(
                            (element) => (fieldsExport[0][element] = 0)
                          );
                        }
                      }}
                      label="All"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Placement ID"
                      checked={checked_placement_id}
                      onChange={() => {
                        if (checked_placement_id) {
                          set_checked_placement_id(false);
                          fieldsExport[0].placement_id = 0;
                        } else {
                          set_checked_placement_id(true);
                          fieldsExport[0].placement_id = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Placement Year"
                      checked={checked_placement_year}
                      onChange={() => {
                        if (checked_placement_year) {
                          set_checked_placement_year(false);
                          fieldsExport[0].placement_year = 0;
                        } else {
                          set_checked_placement_year(true);
                          fieldsExport[0].placement_year = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Academic Year"
                      checked={checked_acad_year}
                      onChange={() => {
                        if (checked_acad_year) {
                          set_checked_acad_year(false);
                          fieldsExport[0].acad_year = 0;
                        } else {
                          set_checked_acad_year(true);
                          fieldsExport[0].acad_year = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Username"
                      checked={checked_username}
                      onChange={() => {
                        if (checked_username) {
                          set_checked_username(false);
                          fieldsExport[0].username = 0;
                        } else {
                          set_checked_username(true);
                          fieldsExport[0].username = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Student UID"
                      checked={checked_student_uid}
                      onChange={() => {
                        if (checked_student_uid) {
                          set_checked_student_uid(false);
                          fieldsExport[0].student_uid = 0;
                        } else {
                          set_checked_student_uid(true);
                          fieldsExport[0].student_uid = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Student Name"
                      checked={checked_english_name}
                      onChange={() => {
                        if (checked_english_name) {
                          set_checked_english_name(false);
                          fieldsExport[0].english_name = 0;
                        } else {
                          set_checked_english_name(true);
                          fieldsExport[0].english_name = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Curriculum"
                      checked={checked_curriculum}
                      onChange={() => {
                        if (checked_curriculum) {
                          set_checked_curriculum(false);
                          fieldsExport[0].curriculum = 0;
                        } else {
                          set_checked_curriculum(true);
                          fieldsExport[0].curriculum = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Job Title"
                      checked={checked_job_title}
                      onChange={() => {
                        if (checked_job_title) {
                          set_checked_job_title(false);
                          fieldsExport[0].job_title = 0;
                        } else {
                          set_checked_job_title(true);
                          fieldsExport[0].job_title = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Company Name"
                      checked={checked_company_name}
                      onChange={() => {
                        if (checked_company_name) {
                          set_checked_company_name(false);
                          fieldsExport[0].company_name = 0;
                        } else {
                          set_checked_company_name(true);
                          fieldsExport[0].company_name = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Job Nature"
                      checked={checked_job_nature}
                      onChange={() => {
                        if (checked_job_nature) {
                          set_checked_job_nature(false);
                          fieldsExport[0].job_nature = 0;
                        } else {
                          set_checked_job_nature(true);
                          fieldsExport[0].job_nature = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Start Date"
                      checked={checked_start_date}
                      onChange={() => {
                        if (checked_start_date) {
                          set_checked_start_date(false);
                          fieldsExport[0].start_date = 0;
                        } else {
                          set_checked_start_date(true);
                          fieldsExport[0].start_date = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="End Date"
                      checked={checked_end_date}
                      onChange={() => {
                        if (checked_end_date) {
                          set_checked_end_date(false);
                          fieldsExport[0].end_date = 0;
                        } else {
                          set_checked_end_date(true);
                          fieldsExport[0].end_date = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Employment Duration"
                      checked={checked_employment_duration}
                      onChange={() => {
                        if (checked_employment_duration) {
                          set_checked_employment_duration(false);
                          fieldsExport[0].employment_duration = 0;
                        } else {
                          set_checked_employment_duration(true);
                          fieldsExport[0].employment_duration = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Working Location"
                      checked={checked_working_location}
                      onChange={() => {
                        if (checked_working_location) {
                          set_checked_working_location(false);
                          fieldsExport[0].working_location = 0;
                        } else {
                          set_checked_working_location(true);
                          fieldsExport[0].working_location = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Payment Type"
                      checked={checked_payment_type}
                      onChange={() => {
                        if (checked_payment_type) {
                          set_checked_payment_type(false);
                          fieldsExport[0].payment_type = 0;
                        } else {
                          set_checked_payment_type(true);
                          fieldsExport[0].payment_type = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Salary"
                      checked={checked_salary}
                      onChange={() => {
                        if (checked_salary) {
                          set_checked_salary(false);
                          fieldsExport[0].salary = 0;
                        } else {
                          set_checked_salary(true);
                          fieldsExport[0].salary = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Supervisor Name"
                      checked={checked_supervisor_name}
                      onChange={() => {
                        if (checked_supervisor_name) {
                          set_checked_supervisor_name(false);
                          fieldsExport[0].supervisor_name = 0;
                        } else {
                          set_checked_supervisor_name(true);
                          fieldsExport[0].supervisor_name = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Supervisor Telephone"
                      checked={checked_supervisor_telephone}
                      onChange={() => {
                        if (checked_supervisor_telephone) {
                          set_checked_supervisor_telephone(false);
                          fieldsExport[0].supervisor_telephone = 0;
                        } else {
                          set_checked_supervisor_telephone(true);
                          fieldsExport[0].supervisor_telephone = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Supervisor Email"
                      checked={checked_supervisor_email}
                      onChange={() => {
                        if (checked_supervisor_email) {
                          set_checked_supervisor_email(false);
                          fieldsExport[0].supervisor_email = 0;
                        } else {
                          set_checked_supervisor_email(true);
                          fieldsExport[0].supervisor_email = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Consent Form (Uploaded: Yes/No)"
                      checked={checked_consent_form}
                      onChange={() => {
                        if (checked_consent_form) {
                          set_checked_consent_form(false);
                          fieldsExport[0].consent_form = 0;
                        } else {
                          set_checked_consent_form(true);
                          fieldsExport[0].consent_form = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Appointment Letter (Uploaded: Yes/No)"
                      checked={checked_appointment_letter}
                      onChange={() => {
                        if (checked_appointment_letter) {
                          set_checked_appointment_letter(false);
                          fieldsExport[0].appointment_letter = 0;
                        } else {
                          set_checked_appointment_letter(true);
                          fieldsExport[0].appointment_letter = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Feedback Form (Uploaded: Yes/No)"
                      checked={checked_appointment_letter}
                      onChange={() => {
                        if (checked_appointment_letter) {
                          set_checked_appointment_letter(false);
                          fieldsExport[0].appointment_letter = 0;
                        } else {
                          set_checked_appointment_letter(true);
                          fieldsExport[0].appointment_letter = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Feedback Comment"
                      checked={checked_feedback_comment}
                      onChange={() => {
                        if (checked_feedback_comment) {
                          set_checked_feedback_comment(false);
                          fieldsExport[0].feedback_comment = 0;
                        } else {
                          set_checked_feedback_comment(true);
                          fieldsExport[0].feedback_comment = 1;
                        }
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Placement Status"
                      checked={checked_placement_status}
                      onChange={() => {
                        if (checked_placement_status) {
                          set_checked_placement_status(false);
                          fieldsExport[0].placement_status = 0;
                        } else {
                          set_checked_placement_status(true);
                          fieldsExport[0].placement_status = 1;
                        }
                      }}
                    />
                  </FormGroup>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleExport}>Export</Button>
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
                    <TableCell align="center">Edit Student Details</TableCell>
                    <TableCell align="center">Edit Placement Record</TableCell>
                    <TableCell align="center">Last Modified</TableCell>
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
                        <IsolatedEditStudentButton
                          student_uid={row.student_uid}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IsolatedEditPlacementButton
                          student_uid={row.student_uid}
                        />
                      </TableCell>

                      <TableCell align="center">
                        {moment
                          .utc(row.last_modified)
                          .local()
                          .format("DD-MMM-YYYY h:mm A")}
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
                            <MenuItem key={element} value={acadYears[element]}>
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
                            <MenuItem
                              key={element}
                              value={placementYears[element]}
                            >
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
                            <InputLabel
                              variant="standard"
                              id="academicYearExport"
                            >
                              <Typography
                                style={{
                                  fontSize: "15px",
                                  color: "black",
                                  marginTop: "10px",
                                }}
                              >
                                Academic Year
                              </Typography>
                            </InputLabel>
                            <Select
                              labelId="academicYearExport"
                              id="select"
                              style={{
                                minWidth: "100px",
                                maxHeight: "30px",
                                marginTop: "5px",
                                marginBottom: "10px",
                              }}
                              // defaultValue={acadYears[0]}
                              value={academicYearExport}
                              onChange={(e) => {
                                setAcademicYearExport(e.target.value);
                                console.log(e.target.value);
                              }}
                            >
                              {Object.keys(acadYears).map((element) => (
                                <MenuItem
                                  key={element}
                                  value={acadYears[element]}
                                >
                                  {acadYears[element]}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormControlLabel
                              control={<Checkbox />}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  set_checked_placement_id(true);
                                  set_checked_placement_year(true);
                                  set_checked_acad_year(true);
                                  set_checked_username(true);
                                  set_checked_student_uid(true);
                                  set_checked_english_name(true);
                                  set_checked_curriculum(true);
                                  set_checked_job_title(true);
                                  set_checked_company_name(true);
                                  set_checked_job_nature(true);
                                  set_checked_start_date(true);
                                  set_checked_end_date(true);
                                  set_checked_employment_duration(true);
                                  set_checked_working_location(true);
                                  set_checked_payment_type(true);
                                  set_checked_salary(true);
                                  set_checked_supervisor_name(true);
                                  set_checked_supervisor_telephone(true);
                                  set_checked_supervisor_email(true);
                                  set_checked_consent_form(true);
                                  set_checked_appointment_letter(true);
                                  set_checked_feedback_form(true);
                                  set_checked_feedback_comment(true);
                                  set_checked_placement_status(true);
                                  Object.keys(fieldsExport[0]).map(
                                    (element) => (fieldsExport[0][element] = 1)
                                  );
                                } else {
                                  set_checked_placement_id(false);
                                  set_checked_placement_year(false);
                                  set_checked_acad_year(false);
                                  set_checked_username(false);
                                  set_checked_student_uid(false);
                                  set_checked_english_name(false);
                                  set_checked_curriculum(false);
                                  set_checked_job_title(false);
                                  set_checked_company_name(false);
                                  set_checked_job_nature(false);
                                  set_checked_start_date(false);
                                  set_checked_end_date(false);
                                  set_checked_employment_duration(false);
                                  set_checked_working_location(false);
                                  set_checked_payment_type(false);
                                  set_checked_salary(false);
                                  set_checked_supervisor_name(false);
                                  set_checked_supervisor_telephone(false);
                                  set_checked_supervisor_email(false);
                                  set_checked_consent_form(false);
                                  set_checked_appointment_letter(false);
                                  set_checked_feedback_form(false);
                                  set_checked_feedback_comment(false);
                                  set_checked_placement_status(false);
                                  Object.keys(fieldsExport[0]).map(
                                    (element) => (fieldsExport[0][element] = 0)
                                  );
                                }
                              }}
                              label="All"
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Placement ID"
                              checked={checked_placement_id}
                              onChange={() => {
                                if (checked_placement_id) {
                                  set_checked_placement_id(false);
                                  fieldsExport[0].placement_id = 0;
                                } else {
                                  set_checked_placement_id(true);
                                  fieldsExport[0].placement_id = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Placement Year"
                              checked={checked_placement_year}
                              onChange={() => {
                                if (checked_placement_year) {
                                  set_checked_placement_year(false);
                                  fieldsExport[0].placement_year = 0;
                                } else {
                                  set_checked_placement_year(true);
                                  fieldsExport[0].placement_year = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Academic Year"
                              checked={checked_acad_year}
                              onChange={() => {
                                if (checked_acad_year) {
                                  set_checked_acad_year(false);
                                  fieldsExport[0].acad_year = 0;
                                } else {
                                  set_checked_acad_year(true);
                                  fieldsExport[0].acad_year = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Username"
                              checked={checked_username}
                              onChange={() => {
                                if (checked_username) {
                                  set_checked_username(false);
                                  fieldsExport[0].username = 0;
                                } else {
                                  set_checked_username(true);
                                  fieldsExport[0].username = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Student UID"
                              checked={checked_student_uid}
                              onChange={() => {
                                if (checked_student_uid) {
                                  set_checked_student_uid(false);
                                  fieldsExport[0].student_uid = 0;
                                } else {
                                  set_checked_student_uid(true);
                                  fieldsExport[0].student_uid = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Student Name"
                              checked={checked_english_name}
                              onChange={() => {
                                if (checked_english_name) {
                                  set_checked_english_name(false);
                                  fieldsExport[0].english_name = 0;
                                } else {
                                  set_checked_english_name(true);
                                  fieldsExport[0].english_name = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Curriculum"
                              checked={checked_curriculum}
                              onChange={() => {
                                if (checked_curriculum) {
                                  set_checked_curriculum(false);
                                  fieldsExport[0].curriculum = 0;
                                } else {
                                  set_checked_curriculum(true);
                                  fieldsExport[0].curriculum = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Job Title"
                              checked={checked_job_title}
                              onChange={() => {
                                if (checked_job_title) {
                                  set_checked_job_title(false);
                                  fieldsExport[0].job_title = 0;
                                } else {
                                  set_checked_job_title(true);
                                  fieldsExport[0].job_title = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Company Name"
                              checked={checked_company_name}
                              onChange={() => {
                                if (checked_company_name) {
                                  set_checked_company_name(false);
                                  fieldsExport[0].company_name = 0;
                                } else {
                                  set_checked_company_name(true);
                                  fieldsExport[0].company_name = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Job Nature"
                              checked={checked_job_nature}
                              onChange={() => {
                                if (checked_job_nature) {
                                  set_checked_job_nature(false);
                                  fieldsExport[0].job_nature = 0;
                                } else {
                                  set_checked_job_nature(true);
                                  fieldsExport[0].job_nature = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Start Date"
                              checked={checked_start_date}
                              onChange={() => {
                                if (checked_start_date) {
                                  set_checked_start_date(false);
                                  fieldsExport[0].start_date = 0;
                                } else {
                                  set_checked_start_date(true);
                                  fieldsExport[0].start_date = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="End Date"
                              checked={checked_end_date}
                              onChange={() => {
                                if (checked_end_date) {
                                  set_checked_end_date(false);
                                  fieldsExport[0].end_date = 0;
                                } else {
                                  set_checked_end_date(true);
                                  fieldsExport[0].end_date = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Employment Duration"
                              checked={checked_employment_duration}
                              onChange={() => {
                                if (checked_employment_duration) {
                                  set_checked_employment_duration(false);
                                  fieldsExport[0].employment_duration = 0;
                                } else {
                                  set_checked_employment_duration(true);
                                  fieldsExport[0].employment_duration = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Working Location"
                              checked={checked_working_location}
                              onChange={() => {
                                if (checked_working_location) {
                                  set_checked_working_location(false);
                                  fieldsExport[0].working_location = 0;
                                } else {
                                  set_checked_working_location(true);
                                  fieldsExport[0].working_location = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Payment Type"
                              checked={checked_payment_type}
                              onChange={() => {
                                if (checked_payment_type) {
                                  set_checked_payment_type(false);
                                  fieldsExport[0].payment_type = 0;
                                } else {
                                  set_checked_payment_type(true);
                                  fieldsExport[0].payment_type = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Salary"
                              checked={checked_salary}
                              onChange={() => {
                                if (checked_salary) {
                                  set_checked_salary(false);
                                  fieldsExport[0].salary = 0;
                                } else {
                                  set_checked_salary(true);
                                  fieldsExport[0].salary = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Supervisor Name"
                              checked={checked_supervisor_name}
                              onChange={() => {
                                if (checked_supervisor_name) {
                                  set_checked_supervisor_name(false);
                                  fieldsExport[0].supervisor_name = 0;
                                } else {
                                  set_checked_supervisor_name(true);
                                  fieldsExport[0].supervisor_name = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Supervisor Telephone"
                              checked={checked_supervisor_telephone}
                              onChange={() => {
                                if (checked_supervisor_telephone) {
                                  set_checked_supervisor_telephone(false);
                                  fieldsExport[0].supervisor_telephone = 0;
                                } else {
                                  set_checked_supervisor_telephone(true);
                                  fieldsExport[0].supervisor_telephone = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Supervisor Email"
                              checked={checked_supervisor_email}
                              onChange={() => {
                                if (checked_supervisor_email) {
                                  set_checked_supervisor_email(false);
                                  fieldsExport[0].supervisor_email = 0;
                                } else {
                                  set_checked_supervisor_email(true);
                                  fieldsExport[0].supervisor_email = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Consent Form (Uploaded: Yes/No)"
                              checked={checked_consent_form}
                              onChange={() => {
                                if (checked_consent_form) {
                                  set_checked_consent_form(false);
                                  fieldsExport[0].consent_form = 0;
                                } else {
                                  set_checked_consent_form(true);
                                  fieldsExport[0].consent_form = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Appointment Letter (Uploaded: Yes/No)"
                              checked={checked_appointment_letter}
                              onChange={() => {
                                if (checked_appointment_letter) {
                                  set_checked_appointment_letter(false);
                                  fieldsExport[0].appointment_letter = 0;
                                } else {
                                  set_checked_appointment_letter(true);
                                  fieldsExport[0].appointment_letter = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Feedback Form (Uploaded: Yes/No)"
                              checked={checked_appointment_letter}
                              onChange={() => {
                                if (checked_appointment_letter) {
                                  set_checked_appointment_letter(false);
                                  fieldsExport[0].appointment_letter = 0;
                                } else {
                                  set_checked_appointment_letter(true);
                                  fieldsExport[0].appointment_letter = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Feedback Comment"
                              checked={checked_feedback_comment}
                              onChange={() => {
                                if (checked_feedback_comment) {
                                  set_checked_feedback_comment(false);
                                  fieldsExport[0].feedback_comment = 0;
                                } else {
                                  set_checked_feedback_comment(true);
                                  fieldsExport[0].feedback_comment = 1;
                                }
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Placement Status"
                              checked={checked_placement_status}
                              onChange={() => {
                                if (checked_placement_status) {
                                  set_checked_placement_status(false);
                                  fieldsExport[0].placement_status = 0;
                                } else {
                                  set_checked_placement_status(true);
                                  fieldsExport[0].placement_status = 1;
                                }
                              }}
                            />
                          </FormGroup>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={handleExport}>Export</Button>
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
                <Card
                  key={key}
                  variant="outlined"
                  style={{ marginBottom: "5px" }}
                >
                  <CardContent style={{ display: "flex" }}>
                    <Typography variant="body2">
                      Name: {val.english_name}
                    </Typography>
                    <Typography variant="body2">
                      UID: {val.student_uid}
                    </Typography>
                    <Typography variant="body2">
                      Status: {val.placement_status}
                    </Typography>
                    <IsolatedEditStudentButtonMobile
                      student_uid={val.student_uid}
                    />
                    <IsolatedEditPlacementButtonMobile
                      student_uid={val.student_uid}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </Box>
          <Dialog
            open={showExportMissingYear}
            onClose={handleCloseExportMissingYear}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Error!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please ensure to specify academic year before exporting!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                type="button"
                onClick={handleCloseExportMissingYear}
                autoFocus
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    </>
  );
}

export default StudentRecords;
