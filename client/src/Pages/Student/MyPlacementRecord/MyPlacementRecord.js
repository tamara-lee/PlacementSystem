import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../../../components/NavBar/NavBar";
import Navbar from "../../../components/NavBar/index";
import NavigationBar from "../../../components/NavBar/NavBar";
import { Redirect } from "react-router-dom";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { AppointmentLetterModal } from "../../../components/Modal/AppointmentLetterModal";
import { IconContext } from "react-icons";
import { IoIosInformationCircle } from "react-icons/io";
import "../../../global.js";

const Container = styled.div`
  justify-content: center;
  margin: 1.2rem 3rem 2rem 3rem;
`;

function MyPlacementRecord({ authorized }) {
  const history = useHistory();
  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/login")
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
  // sample text
  const [studentName, setStudentName] = useState("John Doe");
  const [studentNumber, setStudentNumber] = useState("3031110000");
  const [studentCurriculum, setStudentCurriculum] = useState("BEng (CompSc)");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobNature, setJobNature] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [salary, setSalary] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorPhone, setSupervisorPhone] = useState("");
  const [supervisorEmail, setSupervisorEmail] = useState("");
  const [consentForm, setConsentForm] = useState("");
  const [appointmentLetter, setAppointmentLetter] = useState("");
  const [feedbackForm, setFeedbackForm] = useState("");
  const [feedbackComment, setFeedbackComment] = useState("");
  const [placementStatus, setPlacementStatus] = useState("");

  const [msg1, setMsg1] = useState(
    "Job nature is not detailed enough. Please add more information."
  );
  const [msg2, setMsg2] = useState(
    "I have added more information. Is the current version ok?"
  );
  const [msg3, setMsg3] = useState("Looks good.");
  const [createTime, setCreateTime] = useState(Date().toLocaleString());

  // states
  const [showModal, setShowModal] = useState(false);

  const [showSupervisorText, setShowSupervisorText] = useState(false);
  const [showCommentText, setShowCommentText] = useState(false);
  const [showEmailErrorMsg, setShowEmailErrorMsg] = useState(false);
  const [showTelephoneErrorMsg, setShowTelephoneErrorMsg] = useState(false);

  const [consentFormMsg, setConsentFormMsg] = useState(
    "or drag and drop file here"
  );
  const [appointmentFileMsg, setAppointmentFileMsg] = useState(
    "or drag and drop file here"
  );
  const [feedbackFileMsg, setFeedbackFileMsg] = useState(
    "or drag and drop file here"
  );

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

  if (authorized === false) {
    console.log(authorized);
    return <Redirect to="/" />;
  }

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

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

  const getForm = () => {
    Axios.get("http://localhost:3001/myplacementrecord")
      .then((response) => {
        setStudentName(response.data.studentName);
        setStudentNumber(response.data.studentNumber);
        setStudentCurriculum(response.data.studentCurriculum);
        setCompanyName(response.data.companyName);
        setJobTitle(response.data.jobTitle);
        setJobNature(response.data.jobNature);
        setStartDate(response.data.startDate);
        setEndDate(response.data.endDate);
        setLocation(response.data.location);
        setPaymentType(response.data.paymentType);
        setSalary(response.data.salary);
        setSupervisorName(response.data.supervisorName);
        setSupervisorPhone(response.data.supervisorPhone);
        setSupervisorEmail(response.data.supervisorEmail);
        setAppointmentLetter(response.data.appointmentLetter);
        setFeedbackForm(response.data.feedbackForm);
        setFeedbackComment(response.data.feedbackComment);
        setPlacementStatus(response.data.placementStatus);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const submitForm = () => {
    console.log("Submit button clicked!");
    Axios.post("http://localhost:3001/myplacementrecord", {
      studentName: studentName,
      studentNumber: studentNumber,
      studentCurriculum: studentCurriculum,
      companyName: companyName,
      jobTitle: jobTitle,
      jobNature: jobNature,
      startDate: startDate,
      endDate: endDate,
      location: location,
      paymentType: paymentType,
      salary: salary,
      supervisorName: supervisorName,
      supervisorPhone: supervisorPhone,
      supervisorEmail: supervisorEmail,
      appointmentLetter: appointmentLetter,
      consentForm: consentForm,
      feedbackForm: feedbackForm,
      feedbackComment: feedbackComment,
      placementStatus: placementStatus,
    })
      .then((response) => {
        console.log(response.data);
        // if (response.data === "Successfully submitted") {
        //   console.log(response.data);
        // }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  getForm();
  return (
    <>
      {/* <Navbar /> */}
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
                  value={studentName}
                  readOnly
                />
                <label htmlFor="studentNo">UNIVERSITY NUMBER</label>
                <input
                  className="input"
                  type="text"
                  id="studentNo"
                  value={studentNumber}
                  readOnly
                />
                <label htmlFor="curriculum">Curriculum</label>
                <input
                  className="input"
                  type="text"
                  id="curriculum"
                  value={studentCurriculum}
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
                  value={companyName}
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
                  value={jobTitle}
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
                  value={jobNature}
                  placeholder="The scope of the position is ..."
                  onChange={(e) => {
                    setJobNature(e.target.value);
                  }}
                />
                <div className="col">
                  <label htmlFor="startDate">START DATE</label>
                  <DatePicker
                    className="date-picker"
                    selected={startDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(date) => setStartDate(date)}
                    locale="en-GB"
                    showWeekNumbers
                    id="startDate"
                    value={startDate}
                  />
                  <label htmlFor="endDate">END DATE</label>
                  <DatePicker
                    className="date-picker"
                    selected={endDate}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    onChange={(date) => setEndDate(date)}
                    locale="en-GB"
                    showWeekNumbers
                    id="endDate"
                    value={endDate}
                  />
                </div>
                <label htmlFor="location">WORKING LOCATION</label>
                <input
                  className="input"
                  type="text"
                  id="location"
                  value={location}
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
                  value={paymentType}
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
                  value={salary}
                  placeholder="0.00"
                  onChange={(e) => {
                    setPaymentType(e.target.value);
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

              {/* <p>Test</p> */}
              <div className="container">
                <label htmlFor="supervisorName">NAME</label>
                <input
                  className="input"
                  type="text"
                  id="supervisorName"
                  value={supervisorName}
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
                  value={supervisorPhone}
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
                  value={supervisorEmail}
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
                  <span className="file-msg">{consentFormMsg}</span>
                  <input
                    type="file"
                    id="consentForm"
                    value={consentForm}
                    onChange={function (e) {
                      setConsentFormMsg(e.target.files[0].name);
                      setConsentForm(e.target.files[0].name); //filename only
                    }}
                  />
                </div>
                <label htmlFor="appointmentLetter">APPOINTMENT LETTER</label>
                <div className="file-drop-area">
                  <span className="fake-btn">Choose file</span>
                  <span className="file-msg">{appointmentFileMsg}</span>
                  <input
                    type="file"
                    id="appointmentLetter"
                    value={appointmentLetter}
                    onChange={function (e) {
                      setAppointmentFileMsg(e.target.files[0].name);
                      setAppointmentLetter(e.target.files[0].name); //filename only
                    }}
                  />
                </div>
                <label htmlFor="feedbackForm">FEEDBACK FORM</label>
                <div className="file-drop-area">
                  <span className="fake-btn">Choose file</span>
                  <span className="file-msg">{feedbackFileMsg}</span>
                  <input
                    type="file"
                    id="feedbackForm"
                    value={feedbackForm}
                    onChange={function (e) {
                      setFeedbackFileMsg(e.target.files[0].name);
                      setFeedbackForm(e.target.files[0].name);
                    }}
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
                  value={feedbackComment}
                  onChange={(e) => {
                    setFeedbackComment(e.target.value);
                  }}
                  disabled
                />
              </div>
              <p className="container-title">PLACEMENT STATUS</p>
              <div className="container">
                {/* <label htmlFor="placementStatus">Placement Status</label> */}
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
                    value={remarkState}
                    onChange={(e) => setRemarkState(e.target.value)}
                    placeholder="Input message here..."
                    maxLength="50"
                  />

                  <button
                    type="submit"
                    disabled={!remarkState}
                    onClick={sendRemark}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button className="form-submit" onClick={submitForm}>
            Save & Submit
          </button>
        </form>

        <AppointmentLetterModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
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
