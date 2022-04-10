import React, { useState, useRef, useEffect } from "react";
import Axios from "axios";
import NavigationBar from "../../../components/NavBar/NavBar";
import { Redirect } from "react-router-dom";
import "./style.css";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { IoIosInformationCircle } from "react-icons/io";
import moment from "moment";

// for date picker
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";

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

function MyPlacementRecord({ authorized }) {
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3001/auth/login")
      .then((res) => {})
      .catch((error) => {
        console.log(error.response);
        if (
          error.response.data.error ===
          "User is not authenticated!\\nPlease log in."
        ) {
          localStorage.setItem("userState", false);
          alert("You have been logged out. Please refresh and log in again.");
        }
      });
    getForm();
  }, []);

  const username = localStorage.getItem("username");
  const student_uid = localStorage.getItem("userUid");

  const [studentName, setStudentName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [studentCurriculum, setStudentCurriculum] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobNature, setJobNature] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [paymentType, setPaymentType] = useState("unpaid");
  const [salary, setSalary] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorPhone, setSupervisorPhone] = useState("");
  const [supervisorEmail, setSupervisorEmail] = useState("");
  const [consentForm, setConsentForm] = useState();
  const [appointmentLetter, setAppointmentLetter] = useState();
  const [feedbackForm, setFeedbackForm] = useState();
  const [feedbackComment, setFeedbackComment] = useState("");
  const [placementStatus, setPlacementStatus] = useState("");

  const [showSupervisorText, setShowSupervisorText] = useState(false);
  const [showCommentText, setShowCommentText] = useState(false);
  const [showEmailErrorMsg, setShowEmailErrorMsg] = useState(false);
  const [showTelephoneErrorMsg, setShowTelephoneErrorMsg] = useState(false);
  const [showDurationErrorMsg, setShowDurationErrorMsg] = useState(false);

  const [period, setPeriod] = useState([null, null]);
  const [consentFormName, setConsentFormName] = useState("");
  const [appointmentLetterName, setAppointmentLetterName] = useState("");
  const [feedbackFormName, setFeedbackFormName] = useState("");

  const [openError, setOpenError] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  // pop-up handlers
  const handleCloseError = () => {
    setOpenError(false);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  // document handlers
  const consentFormHandler = (e) => {
    setConsentForm(e.target.files[0]);
    setConsentFormName(e.target.files[0].name);
  };

  const appointmentLetterHandler = (e) => {
    setAppointmentLetter(e.target.files[0]);
    setAppointmentLetterName(e.target.files[0].name);
  };

  const feedbackFormHandler = (e) => {
    setFeedbackForm(e.target.files[0]);
    setFeedbackFormName(e.target.files[0].name);
  };

  // test chat test messages
  const [msg1, setMsg1] = useState(
    "Job nature is not detailed enough. Please add more information."
  );
  const [msg2, setMsg2] = useState(
    "I have added more information. Is the current version ok?"
  );
  const [msg3, setMsg3] = useState("Looks good.");
  const [createTime, setCreateTime] = useState(Date().toLocaleString());

  // error checking handlers
  const checkEmail = (e) => {
    if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(e)) {
      return true;
    } else {
      return false;
    }
  };

  const checkPhone = (e) => {
    if (/^\+?\d+$/.test(e)) {
      return true;
    } else {
      return false;
    }
  };

  // Remark states
  const dummy = useRef();
  // const remarksRef = firestore.collection("remarks"); // get collection of messages here
  // const query = remarksRef.orderBy("createdAt").limit(50);
  // const [remarks] = useCollectionData(query, { idField: "id" });
  const [remarkState, setRemarkState] = useState("");

  const sendRemark = async (e) => {
    e.preventDefault();

    // const userId = 1;

    // await remarksRef.add({
    //   text: remarkState,
    //   createdAt: createTime,
    //   userId,
    // });

    // setRemarkState("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  const getForm = () => {
    // should change to get request because this request will always be called when re-rendering
    // cannot be avoided
    Axios.get("http://localhost:3001/placementrecord/student", {
      params: {
        studentNumber: student_uid,
      },
    })
      .then((res) => {
        console.log(res.data);
        setStudentName(res.data.english_name);
        setStudentNumber(res.data.student_uid);
        setStudentCurriculum(res.data.curriculum);
        setCompanyName(res.data.placement[0].company_name);
        setJobTitle(res.data.placement[0].job_title);
        setJobNature(res.data.placement[0].job_nature);
        setStartDate(res.data.placement[0].start_date);
        setEndDate(res.data.placement[0].end_date);
        setPeriod([
          res.data.placement[0].start_date,
          res.data.placement[0].end_date,
        ]);
        setDuration(res.data.placement[0].employment_duration);
        setLocation(res.data.placement[0].working_location);
        setPaymentType(res.data.placement[0].payment_type);
        setSalary(res.data.placement[0].salary);
        setSupervisorName(res.data.placement[0].supervisor_name);
        setSupervisorPhone(res.data.placement[0].supervisor_telephone);
        setSupervisorEmail(res.data.placement[0].supervisor_email);
        setConsentForm(res.data.placement[0].consent_form);
        setAppointmentLetter(res.data.placement[0].appointment_letter);
        setFeedbackForm(res.data.placement[0].feedback_form);
        setFeedbackComment(res.data.placement[0].feedback_comment);
        setPlacementStatus(res.data.placement_status);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const submitForm = () => {
    // the updating useState triggers re-render
    if (showEmailErrorMsg || showTelephoneErrorMsg || showDurationErrorMsg) {
      setOpenError(true);
    } else {
      setOpenConfirmation(true);
    }
  };

  const confirmSubmitForm = () => {
    handleCloseConfirmation();
    console.log("confirm submit clicked!");

    const formData = new FormData();

    if (appointmentLetter) {
      formData.append("appointment", appointmentLetter, appointmentLetter.name);
    }
    if (consentForm) {
      formData.append("consent", consentForm, consentForm.name);
    }
    if (feedbackForm) {
      formData.append("feedback", feedbackForm, feedbackForm.name);
    }
    // formData.append(username, username);
    // formData.append(studentName, studentName);
    // formData.append(studentNumber, student_uid);
    // formData.append(studentCurriculum, studentCurriculum);
    // formData.append(companyName, companyName);
    // formData.append(jobTitle, jobTitle);
    // formData.append(jobNature, jobNature);
    // formData.append(startDate, startDate);
    // formData.append(endDate, endDate);
    // formData.append(duration, duration);
    // formData.append(location, location);
    // formData.append(paymentType, paymentType);
    // formData.append(salary, salary);
    // formData.append(supervisorName, supervisorName);
    // formData.append(supervisorPhone, supervisorPhone);
    // formData.append(supervisorEmail, supervisorEmail);
    // formData.append(feedbackComment, feedbackComment);
    // formData.append(placementStatus, placementStatus);
    // formData.append(supervisorEmail, supervisorEmail);

    Axios.post("http://localhost:3001/placementrecord/student", {
      username: username,
      studentName: studentName,
      studentNumber: student_uid,
      studentCurriculum: studentCurriculum,
      companyName: companyName,
      jobTitle: jobTitle,
      jobNature: jobNature,
      startDate: startDate,
      endDate: endDate,
      duration: duration,
      location: location,
      paymentType: paymentType,
      salary: salary,
      supervisorName: supervisorName,
      supervisorPhone: supervisorPhone,
      supervisorEmail: supervisorEmail,
      feedbackComment: feedbackComment,
      placementStatus: placementStatus,
      formData,
    })
      .then((res) => {
        console.log(res.data);
        setStudentName(res.data.english_name);
        setStudentNumber(res.data.student_uid);
        setStudentCurriculum(res.data.curriculum);
        setCompanyName(res.data.placement[0].company_name);
        setJobTitle(res.data.placement[0].job_title);
        setJobNature(res.data.placement[0].job_nature);
        setStartDate(res.data.placement[0].start_date);
        setEndDate(res.data.placement[0].end_date);
        setDuration(res.data.placement[0].employment_duration);
        setPeriod([
          res.data.placement[0].start_date,
          res.data.placement[0].end_date,
        ]);
        setLocation(res.data.placement[0].working_location);
        setPaymentType(res.data.placement[0].payment_type);
        setSalary(res.data.placement[0].salary);
        setSupervisorName(res.data.placement[0].supervisor_name);
        setSupervisorPhone(res.data.placement[0].supervisor_telephone);
        setSupervisorEmail(res.data.placement[0].supervisor_email);
        setConsentForm(res.data.placement[0].consent_form);
        setAppointmentLetter(res.data.placement[0].appointment_letter);
        setFeedbackForm(res.data.placement[0].feedback_form);
        setFeedbackComment(res.data.placement[0].feedback_comment);
        setPlacementStatus(res.data.placement_status);
        getForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (authorized === false) {
    console.log(authorized);
    return <Redirect to="/" />;
  }

  return (
    <>
      <NavigationBar />
      <Container>
        <form>
          <div className="row">
            <div className="column">
              <p className="container-title">STUDENT INFORMATION</p>
              <div className="container">
                <label htmlFor="studentName">NAME</label>
                <input
                  className="input"
                  type="text"
                  id="studentName"
                  defaultValue={studentName}
                  readOnly
                />
                <label htmlFor="studentNo">UNIVERSITY NUMBER</label>
                <input
                  className="input"
                  type="text"
                  id="studentNo"
                  defaultValue={studentNumber}
                  readOnly
                />
                <label htmlFor="curriculum">Curriculum</label>
                <input
                  className="input"
                  type="text"
                  id="curriculum"
                  defaultValue={studentCurriculum}
                  readOnly
                />
              </div>
              <p className="container-title">PLACEMENT INFORMATION</p>
              <div className="container">
                <label htmlFor="companyName">COMPANY NAME</label>
                <input
                  className="input"
                  type="text"
                  id="companyName"
                  defaultValue={companyName}
                  placeholder="Microsoft"
                  maxLength="100"
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                />
                <label htmlFor="jobTitle">JOB TITLE / POSITION</label>
                <input
                  className="input"
                  type="text"
                  id="jobTitle"
                  defaultValue={jobTitle}
                  placeholder="Software Engineer Intern"
                  maxLength="50"
                  onChange={(e) => {
                    setJobTitle(e.target.value);
                  }}
                />
                <label htmlFor="jobNature">JOB NATURE</label>
                <textarea
                  className="input"
                  type="text"
                  id="jobNature"
                  defaultValue={jobNature}
                  placeholder="The scope of the position is ..."
                  onChange={(e) => {
                    setJobNature(e.target.value);
                  }}
                />
                <div className="col">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                      inputFormat="dd/MM/yyyy"
                      startText="START DATE"
                      endText="END DATE"
                      value={period}
                      onChange={(newPeriod) => {
                        setPeriod(newPeriod);
                        const difference = moment.duration(
                          moment(newPeriod[1]).diff(
                            moment(newPeriod[0]),
                            "weeks",
                            true
                          )
                        );
                        setDuration(Math.floor(difference).toString());
                        setStartDate(newPeriod[0]);
                        setEndDate(newPeriod[1]);
                        if (duration < 4) {
                          setShowDurationErrorMsg(true);
                        } else {
                          setShowDurationErrorMsg(false);
                        }
                      }}
                      renderInput={(startProps, endProps) => (
                        <React.Fragment>
                          <TextField {...startProps} />
                          <div className="dateTO">TO</div>
                          <TextField {...endProps} />
                        </React.Fragment>
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <label htmlFor="duration" className="duration">
                  DURATION (WEEKS)
                  {showDurationErrorMsg && (
                    <span className="error-message">
                      Duration must be a minimum of FOUR weeks!
                    </span>
                  )}
                </label>
                <input
                  className="input"
                  type="text"
                  id="duration"
                  defaultValue={duration}
                  placeholder="0"
                  maxLength="20"
                  disabled
                />
                <label htmlFor="location">WORKING LOCATION</label>
                <input
                  className="input"
                  type="text"
                  id="location"
                  defaultValue={location}
                  placeholder="Hong Kong"
                  maxLength="50"
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
                <label htmlFor="paymentType">PAYMENT TYPE</label>
                <select
                  className="input"
                  name="paymentType"
                  id="paymentType"
                  defaultValue={paymentType}
                  onChange={(e) => {
                    setPaymentType(e.target.value);
                  }}
                >
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                  <option value="honorarium">Honorarium</option>
                </select>
                <label htmlFor="salary">SALARY (HKD)</label>
                <input
                  className="input"
                  type="number"
                  id="salary"
                  defaultValue={salary}
                  // defaultValue={new Intl.NumberFormat("en-US").format(salary)}
                  // value={new Intl.NumberFormat("en-US").format(salary)}
                  placeholder="0.00"
                  onChange={(e) => {
                    setSalary(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="column">
              <IconContext.Provider
                value={{
                  color: "green",
                  className: "info-icon",
                  size: "1.2rem",
                }}
              >
                <p className="container-title">
                  SUPERVISOR INFORMATION
                  <IoIosInformationCircle
                    onMouseEnter={() => setShowSupervisorText(true)}
                    onMouseLeave={() => setShowSupervisorText(false)}
                  />
                  {showSupervisorText && (
                    <span className="supervisor-info">
                      You may complete this section later.
                    </span>
                  )}
                </p>
              </IconContext.Provider>
              <div className="container">
                <label htmlFor="supervisorName">NAME</label>
                <input
                  className="input"
                  type="text"
                  id="supervisorName"
                  defaultValue={supervisorName}
                  placeholder="Mr. Wong Man Yi"
                  maxLength="50"
                  onChange={(e) => {
                    setSupervisorName(e.target.value);
                  }}
                />
                <label htmlFor="supervisorPhone">
                  TELEPHONE
                  {showTelephoneErrorMsg && (
                    <span className="error-message">
                      Invalid telephone number. Please enter a valid telephone
                      number.
                    </span>
                  )}
                </label>
                <input
                  className="input"
                  type="tel"
                  id="supervisorPhone"
                  defaultValue={supervisorPhone}
                  placeholder="12345678"
                  onChange={(e) => {
                    if (e.target.value == "") {
                      setSupervisorPhone(e.target.value);
                      setShowTelephoneErrorMsg(false);
                    } else if (checkPhone(e.target.value)) {
                      setSupervisorPhone(e.target.value);
                      setShowTelephoneErrorMsg(false);
                    } else {
                      setSupervisorPhone(e.target.value);
                      setShowTelephoneErrorMsg(true);
                    }
                  }}
                />
                <label htmlFor="supervisorEmail">
                  EMAIL
                  {showEmailErrorMsg && (
                    <span className="error-message">
                      Invalid email. Please enter a valid email.
                    </span>
                  )}
                </label>
                <input
                  className="input"
                  type="email"
                  id="supervisorEmail"
                  defaultValue={supervisorEmail}
                  placeholder="wongmanyi@microsoft.com"
                  pattern="[\w.-]+@[\w.]+"
                  onChange={(e) => {
                    if (e.target.value == "") {
                      setSupervisorEmail(e.target.value);
                      setShowEmailErrorMsg(false);
                    } else if (checkEmail(e.target.value)) {
                      setSupervisorEmail(e.target.value);
                      setShowEmailErrorMsg(false);
                    } else {
                      setSupervisorEmail(e.target.value);
                      setShowEmailErrorMsg(true);
                    }
                  }}
                />
              </div>

              <p className="container-title">DOCUMENTS & FEEDBACK COMMENT</p>
              <div className="container">
                <label htmlFor="consentForm">CONSENT FORM</label>
                <div className="file-drop-area">
                  <span className="fake-btn">Choose file</span>
                  <span className="file-msg">
                    {consentFormName != ""
                      ? consentFormName
                      : "or drag and drop file here"}
                  </span>
                  <input
                    type="file"
                    name="consent"
                    id="consentForm"
                    onChange={consentFormHandler}
                  />
                </div>
                <label htmlFor="appointmentLetter">APPOINTMENT LETTER</label>
                <div className="file-drop-area">
                  <span className="fake-btn">Choose file</span>
                  <span className="file-msg">
                    {appointmentLetterName != ""
                      ? appointmentLetterName
                      : "or drag and drop file here"}
                  </span>
                  <input
                    type="file"
                    name="appointment"
                    id="appointmentLetter"
                    onChange={appointmentLetterHandler}
                  />
                </div>
                <label htmlFor="feedbackForm">FEEDBACK FORM</label>
                <div className="file-drop-area">
                  <span className="fake-btn">Choose file</span>
                  <span className="file-msg">
                    {feedbackFormName != ""
                      ? feedbackFormName
                      : "or drag and drop file here"}
                  </span>
                  <input
                    type="file"
                    name="feedback"
                    id="feedbackForm"
                    onChange={feedbackFormHandler}
                  />
                </div>

                <label htmlFor="feedbackComment">
                  FEEDBACK COMMENT
                  <IconContext.Provider
                    value={{
                      color: "green",
                      className: "info-icon",
                      size: "1.2rem",
                    }}
                  >
                    <IoIosInformationCircle
                      onMouseEnter={() => setShowCommentText(true)}
                      onMouseLeave={() => setShowCommentText(false)}
                    />
                  </IconContext.Provider>
                  {showCommentText && (
                    <span className="error-message">
                      This field will be filled in by the admin if student does
                      not have access to the feedback form.
                    </span>
                  )}
                </label>
                <input
                  className="input"
                  type="text"
                  id="feedbackComment"
                  defaultValue={feedbackComment}
                  onChange={(e) => {
                    setFeedbackComment(e.target.value);
                  }}
                  disabled
                />
              </div>
              <p className="container-title">PLACEMENT STATUS</p>
              <div className="container">
                <select
                  className="input"
                  name="placementStatus"
                  id="placementStatus"
                  onChange={(e) => {
                    setPlacementStatus(e.target.value);
                  }}
                  disabled
                >
                  <option value="approved">Approved</option>
                  <option value="incomplete">Incomplete</option>
                  <option value="waiting">Waiting</option>
                </select>
              </div>
              <p className="container-title">REMARKS</p>
              <div className="container">
                {/* <main>
                  {remarks &&
                    remarks.map((rmrk) => (
                      <ChatMessage key={rmrk.id} remark={rmrk} />
                    ))}

                  <span ref={dummy}></span>
                </main> */}
                <div className="remark-container">
                  <RemarkMessage />
                </div>
                <div className="new-remark">
                  <input
                    defaultValue={remarkState}
                    onChange={(e) => setRemarkState(e.target.value)}
                    placeholder="Input message here..."
                    maxLength="50"
                  />

                  <button
                    type="button"
                    disabled={!remarkState}
                    onClick={(e) => {
                      e.preventDefault();
                      sendRemark();
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button type="button" className="form-submit" onClick={submitForm}>
            Save & Submit
          </button>
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
                Please check the error message(s) in red and fix them before
                submitting the form.
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
                You may still make changes to the form after submission.
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
        </form>
      </Container>
    </>
  );
}

function RemarkMessage(props) {
  // const { text, uid, photoURL } = props.message;
  // const messageClass = uid === localStorage.getItem("userId") ? "sent" : "received";

  const messageClass = "sent";
  return (
    <>
      <div className={`message ${messageClass}`}>
        <p>Sample text!</p>
      </div>
    </>
  );
}

export default MyPlacementRecord;
