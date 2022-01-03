import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import NavBar from "../../../components/NavBar/NavBar";
import Navbar from "../../../components/NavBar/index";
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
      .then((response) => {
        if (response.data != "Logged In") {
          return history.push("/");
          // setLoginStatus(response.data.user[0].username);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // sample text
  const [studentName, setStudentName] = useState("John Doe");
  const [studentNumber, setStudentNumber] = useState("3031110000");
  const [studentCurriculum, setStudentCurriculum] = useState("BEng (CompSc)");
  const [msg1, setMsg1] = useState(
    "Job nature is not detailed enough. Please add more information."
  );
  const [msg2, setMsg2] = useState(
    "I have added more information. Is the current version ok?"
  );
  const [msg3, setMsg3] = useState("Looks good.");
  const [createTime, setCreateTime] = useState(Date().toLocaleString());

  // states
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const [showSupervisorText, setShowSupervisorText] = useState(false);

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

  const submitForm = () => {
    console.log("Submit button clicked!");
  };

  return (
    <>
      <Navbar />
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
                  placeholder="Microsoft"
                />
                <label htmlFor="jobTitle">JOB TITLE / POSITION</label>
                <input
                  className="input"
                  type="text"
                  id="jobTitle"
                  placeholder="Software Engineer Intern"
                />
                <label htmlFor="jobNature">JOB NATURE</label>
                <textarea
                  className="input"
                  type="text"
                  id="jobNature"
                  placeholder="The scope of the position is ..."
                />
                <div className="col">
                  <label htmlFor="startDate">START DATE</label>
                  <DatePicker
                    className="date-picker"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    id="startDate"
                  />
                  <label htmlFor="endDate">END DATE</label>
                  <DatePicker
                    className="date-picker"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    id="endDate"
                  />
                </div>
                <label htmlFor="location">WORKING LOCATION</label>
                <input
                  className="input"
                  type="text"
                  id="location"
                  placeholder="Hong Kong"
                />
                <label htmlFor="paymentType">PAYMENT TYPE</label>
                <select className="input" name="paymentType" id="paymentType">
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                </select>
                <label htmlFor="salary">SALARY (HKD)</label>
                <input
                  className="input"
                  type="number"
                  id="salary"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="column">
              <IconContext.Provider
                value={{ color: "green", className: "info-icon" }}
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
                  placeholder="Mr. Wong Man Yi"
                />
                <label htmlFor="supervisorPhone">TELEPHONE</label>
                <input
                  className="input"
                  type="tel"
                  id="supervisorPhone"
                  placeholder="12345678"
                />
                <label htmlFor="supervisorEmail">EMAIL</label>
                <input
                  className="input"
                  type="email"
                  id="supervisorEmail"
                  placeholder="wongmanyi@microsoft.com"
                />
              </div>
              <p className="container-title">DOCUMENTS & FEEDBACK COMMENT</p>
              <div className="container">
                <label htmlFor="appointmentLetter">APPOINTMENT LETTER</label>
                <div className="file-drop-area">
                  <span className="fake-btn">Choose file</span>
                  <span className="file-msg">{appointmentFileMsg}</span>
                  <input
                    type="file"
                    id="appointmentLetter"
                    onChange={function (e) {
                      setAppointmentFileMsg(e.target.files[0].name);
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
                    onChange={function (e) {
                      setFeedbackFileMsg(e.target.files[0].name);
                    }}
                  />
                </div>
                <label htmlFor="feedbackComment">FEEDBACK COMMENT</label>
                <input className="input" type="text" id="feedbackComment" />
              </div>
              <p className="container-title">PLACEMENT STATUS</p>
              <div className="container">
                {/* <label htmlFor="placementStatus">Placement Status</label> */}
                <select
                  className="input"
                  name="placementStatus"
                  id="placementStatus"
                >
                  <option value="approved">Approved</option>
                  <option value="incomplete">Incomplete</option>
                  <option value="waiting">Waiting</option>
                </select>
              </div>
              <p className="container-title">REMARKS</p>
              <div className="container">
                {/* <label htmlFor="remarks">Remarks</label> */}
                {/* <input
                  type="text"
                  id="remarks"
                  value="add chat box here"
                  readOnly
                /> */}
                {/* <main>
                  {remarks &&
                    remarks.map((rmrk) => (
                      <ChatMessage key={rmrk.id} remark={rmrk} />
                    ))}

                  <span ref={dummy}></span>
                </main> */}
                <div className="remark-container">
                  <RemarkMessage />
                  <div className="column">
                    <div className="remarks">
                      <input
                        value={remarkState}
                        onChange={(e) => setRemarkState(e.target.value)}
                        placeholder="Input message here..."
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

  // const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  // const messageClass = userId === auth.currentUser.userId ? "sent" : "received";
  const messageClass = "sent";
  return (
    <>
      <div className={`message ${messageClass}`}>
        <p>text</p>
      </div>
    </>
  );
}

export default MyPlacementRecord;
