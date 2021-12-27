import React, { useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import Navbar from "../../../components/NavBar/index";
import { Redirect } from "react-router-dom";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { AppointmentLetterModal } from "../../../components/Modal/AppointmentLetterModal";

const Container = styled.div`
  justify-content: center;
  margin: 1.2rem 3rem 2rem 3rem;
`;

function MyPlacementRecord({ authorized }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [appointmentFileMsg, setAppointmentFileMsg] = useState(
    "or drag and drop file here"
  );
  const [feedbackFileMsg, setFeedbackFileMsg] = useState(
    "or drag and drop file here"
  );

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
                  placeholder="John Doe"
                />
                <label htmlFor="studentNo">UNIVERSITY NUMBER</label>
                <input
                  className="input"
                  type="text"
                  id="studentNo"
                  placeholder="3030001111"
                />
                <label htmlFor="curriculum">Curriculum</label>
                <input
                  className="input"
                  type="text"
                  id="curriculum"
                  placeholder="BEng (CompSc)"
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
                <label htmlFor="salary">SALARY</label>
                <input
                  className="input"
                  type="number"
                  id="salary"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="column">
              <p className="container-title">SUPERVISOR INFORMATION</p>
              <div className="container">
                <label htmlFor="supervisorName">NAME</label>
                <input
                  className="input"
                  type="text"
                  id="supervisorName"
                  placeholder="Mr. Wong"
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
                  placeholder="wong@microsoft.com"
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
                <label htmlFor="placementStatus">Placement Status</label>
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
                <label htmlFor="remarks">Remarks</label>
                <input
                  type="text"
                  id="remarks"
                  value="add chat box here"
                  readOnly
                />
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

export default MyPlacementRecord;
