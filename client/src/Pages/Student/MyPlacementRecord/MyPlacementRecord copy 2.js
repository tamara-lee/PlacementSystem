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
  }, []);

  const username = localStorage.getItem("username");
  const student_uid = localStorage.getItem("userUid");

  const [ren, setRen] = useState(false);

  const testValue = useRef(true);
  console.log(testValue);
  console.log(testValue.current);

  const studentName = useRef("");
  const studentNumber = useRef("");
  const studentCurriculum = useRef("");
  const companyName = useRef("");
  const jobTitle = useRef("");
  const jobNature = useRef("");
  const startDate = useRef(undefined);
  const endDate = useRef(undefined);
  const duration = useRef("");
  const location = useRef("");
  const paymentType = useRef("unpaid");
  const salary = useRef(undefined);
  const supervisorName = useRef("");
  const supervisorPhone = useRef("");
  const supervisorEmail = useRef("");
  const consentForm = useRef();
  const appointmentLetter = useRef();
  const feedbackForm = useRef();
  const feedbackComment = useRef("");
  const placementStatus = useRef("");

  const showSupervisorText = useRef(false);
  const showCommentText = useRef(false);
  const showEmailErrorMsg = useRef(false);
  const showTelephoneErrorMsg = useRef(false);
  const showDurationErrorMsg = useRef(false);

  const period = useRef([undefined, undefined]);
  const consentFormName = useRef("");
  const appointmentLetterName = useRef("");
  const feedbackFormName = useRef("");

  // const openError = useRef(false);
  // const openConfirmation = useRef(false);

  const [openError, setOpenError] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  // pop-up handlers
  const handleCloseError = () => {
    // openError.current = false;
    setOpenError(false);
  };

  const handleCloseConfirmation = () => {
    // openConfirmation.current = false;
    setOpenConfirmation(false);
  };

  // document handlers
  const consentFormHandler = (e) => {
    consentForm.current = e.target.files[0];
    consentFormName.current = e.target.files[0].name;
  };

  const appointmentLetterHandler = (e) => {
    appointmentLetter.current = e.target.files[0];
    appointmentLetterName.current = e.target.files[0].name;
  };

  const feedbackFormHandler = (e) => {
    feedbackForm.current = e.target.files[0];
    feedbackFormName.current = e.target.files[0].name;
  };

  // test chat test messages
  const msg1 = useRef(
    "Job nature is not detailed enough. Please add more information."
  );
  const msg2 = useRef(
    "I have added more information. Is the current version ok?"
  );
  const msg3 = useRef("Looks good.");

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
  const remarkState = useRef("");

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

  // useEffect(() => {
  //   setRen(true);
  // }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/placementrecord/student", {
      params: {
        studentNumber: student_uid,
      },
    })
      .then((res) => {
        console.log(res.data);
        studentName.current =
          studentName.current == null ? undefined : res.data.english_name;
        studentNumber.current =
          studentNumber.current == null ? undefined : res.data.student_uid;
        studentCurriculum.current =
          studentCurriculum.current == null ? undefined : res.data.curriculum;
        companyName.current =
          companyName.current == null
            ? undefined
            : res.data.placement[0].company_name;
        jobTitle.current =
          jobTitle.current == null
            ? undefined
            : res.data.placement[0].job_title;
        jobNature.current =
          jobNature.current == null
            ? undefined
            : res.data.placement[0].job_nature;
        startDate.current =
          startDate.current == null
            ? undefined
            : res.data.placement[0].start_date;
        endDate.current =
          endDate.current == null ? undefined : res.data.placement[0].end_date;
        duration.current =
          duration.current == null
            ? undefined
            : res.data.placement[0].employment_duration;
        location.current =
          location.current == null
            ? undefined
            : res.data.placement[0].working_location;
        paymentType.current =
          paymentType.current == null
            ? undefined
            : res.data.placement[0].payment_type;
        salary.current =
          salary.current == null ? undefined : res.data.placement[0].salary;
        supervisorName.current =
          supervisorName.current == null
            ? undefined
            : res.data.placement[0].supervisor_name;
        supervisorPhone.current =
          supervisorPhone.current == null
            ? undefined
            : res.data.placement[0].supervisor_telephone;
        supervisorEmail.current =
          supervisorEmail.current == null
            ? undefined
            : res.data.placement[0].supervisor_email;
        consentForm.current =
          consentForm.current == null
            ? undefined
            : res.data.placement[0].consent_form;
        appointmentLetter.current =
          appointmentLetter.current == null
            ? undefined
            : res.data.placement[0].appointment_letter;
        feedbackForm.current =
          feedbackForm.current == null
            ? undefined
            : res.data.placement[0].feedback_form;
        feedbackComment.current =
          feedbackComment.current == null
            ? undefined
            : res.data.placement[0].feedback_comment;
        placementStatus.current =
          placementStatus.current == null
            ? undefined
            : res.data.placement_status;
        setRen(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  // const getForm = () => {
  //   Axios.get("http://localhost:3001/placementrecord/student", {
  //     params: {
  //       studentNumber: student_uid,
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //       studentName.current = res.data.english_name;
  //       studentNumber.current = res.data.student_uid;
  //       studentCurriculum.current = res.data.curriculum;
  //       companyName.current = res.data.placement[0].company_name;
  //       jobTitle.current = res.data.placement[0].job_title;
  //       jobNature.current = res.data.placement[0].job_nature;
  //       startDate.current = res.data.placement[0].start_date;
  //       endDate.current = res.data.placement[0].end_date;
  //       duration.current = res.data.placement[0].employment_duration;
  //       location.current = res.data.placement[0].working_location;
  //       paymentType.current = res.data.placement[0].payment_type;
  //       salary.current = res.data.placement[0].salary;
  //       supervisorName.current = res.data.placement[0].supervisor_name;
  //       supervisorPhone.current = res.data.placement[0].supervisor_telephone;
  //       supervisorEmail.current = res.data.placement[0].supervisor_email;
  //       consentForm.current = res.data.placement[0].consent_form;
  //       appointmentLetter.current = res.data.placement[0].appointment_letter;
  //       feedbackForm.current = res.data.placement[0].feedback_form;
  //       feedbackComment.current = res.data.placement[0].feedback_comment;
  //       placementStatus.current = res.data.placement_status;
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  // };

  const submitForm = () => {
    if (
      showEmailErrorMsg.current ||
      showTelephoneErrorMsg.current ||
      showDurationErrorMsg.current
    ) {
      // openError.current = true;
      setOpenError(true);
    } else {
      // openConfirmation.current = true;
      setOpenConfirmation(true);
    }
  };

  const confirmSubmitForm = () => {
    handleCloseConfirmation();

    const formData = new FormData();

    if (appointmentLetter) {
      formData.append(
        "appointment",
        appointmentLetter.current,
        appointmentLetterName.current
      );
    }
    if (consentForm) {
      formData.append("consent", consentForm.current, consentFormName.current);
    }
    if (feedbackForm) {
      formData.append(
        "feedback",
        feedbackForm.current,
        feedbackFormName.current
      );
    }
    formData.append(username, username.current);
    formData.append(studentName, studentName.current);
    formData.append(studentNumber, student_uid.current);
    formData.append(studentCurriculum, studentCurriculum.current);
    formData.append(companyName, companyName.current);
    formData.append(jobTitle, jobTitle.current);
    formData.append(jobNature, jobNature.current);
    formData.append(startDate, startDate.current);
    formData.append(endDate, endDate.current);
    formData.append(duration, duration.current);
    formData.append(location, location.current);
    formData.append(paymentType, paymentType.current);
    formData.append(salary, salary.current);
    formData.append(supervisorName, supervisorName.current);
    formData.append(supervisorPhone, supervisorPhone.current);
    formData.append(supervisorEmail, supervisorEmail.current);
    formData.append(feedbackComment, feedbackComment.current);
    formData.append(placementStatus, placementStatus.current);
    formData.append(supervisorEmail, supervisorEmail.current);

    Axios.post(
      "http://localhost:3001/placementrecord/student",
      // username: username,
      // studentName: studentName,
      // studentNumber: student_uid,
      // studentCurriculum: studentCurriculum,
      // companyName: companyName,
      // jobTitle: jobTitle,
      // jobNature: jobNature,
      // startDate: startDate,
      // endDate: endDate,
      // duration: duration,
      // location: location,
      // paymentType: paymentType,
      // salary: salary,
      // supervisorName: supervisorName,
      // supervisorPhone: supervisorPhone,
      // supervisorEmail: supervisorEmail,
      // feedbackComment: feedbackComment,
      // placementStatus: placementStatus,
      formData
    )
      .then((response) => {
        console.log(response.data);
        if (ren === true) {
          setRen(false);
        } else {
          setRen(true);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
    // getForm();
  };

  // getForm();

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
                  ref={studentName}
                  defaultValue={studentName.current}
                  readOnly
                />
                <label htmlFor="studentNo">UNIVERSITY NUMBER</label>
                <input
                  className="input"
                  type="text"
                  id="studentNo"
                  ref={studentNumber}
                  defaultValue={studentNumber.current}
                  readOnly
                />
                <label htmlFor="curriculum">Curriculum</label>
                <input
                  className="input"
                  type="text"
                  id="curriculum"
                  ref={studentCurriculum}
                  defaultValue={studentCurriculum.current}
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
                  ref={companyName}
                  defaultValue={companyName.current}
                  placeholder="Microsoft"
                  maxLength="100"
                  onChange={(e) => {
                    companyName.current = e.target.value;
                  }}
                />
                <label htmlFor="jobTitle">JOB TITLE / POSITION</label>
                <input
                  className="input"
                  type="text"
                  id="jobTitle"
                  ref={jobTitle}
                  defaultValue={jobTitle.current}
                  placeholder="Software Engineer Intern"
                  maxLength="50"
                  onChange={(e) => {
                    jobTitle.current = e.target.value;
                  }}
                />
                <label htmlFor="jobNature">JOB NATURE</label>
                <textarea
                  className="input"
                  type="text"
                  id="jobNature"
                  ref={jobNature}
                  defaultValue={jobNature.current}
                  placeholder="The scope of the position is ..."
                  onChange={(e) => {
                    jobNature.current = e.target.value;
                  }}
                />
                <div className="col">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                      inputFormat="dd/MM/yyyy"
                      startText="START DATE"
                      endText="END DATE"
                      ref={period}
                      defaultValue={period.current}
                      onChange={(newPeriod) => {
                        period.current = newPeriod;
                        const duration = moment.duration(
                          moment(newPeriod[1]).diff(
                            moment(newPeriod[0]),
                            "weeks",
                            true
                          )
                        );
                        duration.current = Math.floor(duration).toString();
                        startDate.current = newPeriod[0];
                        endDate.current = newPeriod[1];
                        if (duration < 4) {
                          showDurationErrorMsg.current = true;
                        } else {
                          showDurationErrorMsg.current = false;
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
                  {showDurationErrorMsg.current && (
                    <span className="error-message">
                      Duration must be a minimum of FOUR weeks!
                    </span>
                  )}
                </label>
                <input
                  className="input"
                  type="text"
                  id="duration"
                  ref={duration}
                  defaultValue={duration.current}
                  placeholder="0"
                  maxLength="20"
                  disabled
                />
                <label htmlFor="location">WORKING LOCATION</label>
                <input
                  className="input"
                  type="text"
                  id="location"
                  ref={location}
                  defaultValue={location.current}
                  placeholder="Hong Kong"
                  maxLength="50"
                  onChange={(e) => {
                    location.current = e.target.value;
                  }}
                />
                <label htmlFor="paymentType">PAYMENT TYPE</label>
                <select
                  className="input"
                  name="paymentType"
                  id="paymentType"
                  ref={paymentType}
                  defaultValue={paymentType.current}
                  onChange={(e) => {
                    paymentType.current = e.target.value;
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
                  ref={salary}
                  defaultValue={salary.current}
                  placeholder="0.00"
                  onChange={(e) => {
                    salary.current = e.target.value;
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
                    onMouseEnter={() => (showSupervisorText.current = true)}
                    onMouseLeave={() => (showSupervisorText.current = false)}
                  />
                  {showSupervisorText.current && (
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
                  value={supervisorName.current}
                  placeholder="Mr. Wong Man Yi"
                  maxLength="50"
                  onChange={(e) => {
                    supervisorName.current = e.target.value;
                  }}
                />
                <label htmlFor="supervisorPhone">
                  TELEPHONE
                  {showTelephoneErrorMsg.current && (
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
                  value={supervisorPhone.current}
                  placeholder="12345678"
                  onChange={(e) => {
                    if (e.target.value == "") {
                      supervisorPhone.current = e.target.value;
                      showTelephoneErrorMsg.current = false;
                    } else if (checkPhone(e.target.value)) {
                      supervisorPhone.current = e.target.value;
                      showTelephoneErrorMsg.current = false;
                    } else {
                      supervisorPhone.current = e.target.value;
                      showTelephoneErrorMsg.current = true;
                    }
                  }}
                />
                <label htmlFor="supervisorEmail">
                  EMAIL
                  {showEmailErrorMsg.current && (
                    <span className="error-message">
                      Invalid email. Please enter a valid email.
                    </span>
                  )}
                </label>
                <input
                  className="input"
                  type="email"
                  id="supervisorEmail"
                  value={supervisorEmail.current}
                  placeholder="wongmanyi@microsoft.com"
                  pattern="[\w.-]+@[\w.]+"
                  onChange={(e) => {
                    if (e.target.value == "") {
                      supervisorEmail.current = e.target.value;
                      showEmailErrorMsg.current = false;
                    } else if (checkEmail(e.target.value)) {
                      supervisorEmail.current = e.target.value;
                      showEmailErrorMsg.current = false;
                    } else {
                      supervisorEmail.current = e.target.value;
                      showEmailErrorMsg.current = true;
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
                    {consentFormName.current != ""
                      ? consentFormName.current
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
                    {appointmentLetterName.current != ""
                      ? appointmentLetterName.current
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
                    {feedbackFormName.current != ""
                      ? feedbackFormName.current
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
                      onMouseEnter={() => (showCommentText.current = true)}
                      onMouseLeave={() => (showCommentText.current = false)}
                    />
                  </IconContext.Provider>
                  {showCommentText.current && (
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
                  value={feedbackComment.current}
                  onChange={(e) => {
                    feedbackComment.current = e.target.value;
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
                    placementStatus.current = e.target.value;
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
                    value={remarkState.current}
                    onChange={(e) => (remarkState.current = e.target.value)}
                    placeholder="Input message here..."
                    maxLength="50"
                  />

                  <button
                    type="button"
                    disabled={!remarkState.current}
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
