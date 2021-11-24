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
  display: flex;
  justify-content: center;
`;

function MyPlacementRecord({ authorized }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

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
        <form className="form-table">
          <div className="row">
            <div className="column">
              <p className="table-row">
                <label htmlFor="studentNo">Student No.</label>
                <input type="text" id="studentNo" />
              </p>
              <p className="table-row">
                <label htmlFor="studentName">Student Name</label>
                <input type="text" id="studentName" />
              </p>
              <p className="table-row">
                <label htmlFor="curriculum">Curriculum</label>
                <input type="text" id="curriculum" />
              </p>
              <p className="table-row">
                <label htmlFor="companyName">Company Name</label>
                <input type="text" id="companyName" />
              </p>
              <p className="table-row">
                <label htmlFor="jobTitle">Job Title / Position</label>
                <input type="text" id="jobTitle" />
              </p>
              <p className="table-row">
                <label htmlFor="jobNature">Job Nature</label>
                <input type="text" id="jobNature" />
              </p>
              <div className="table-row">
                <label htmlFor="startDate">Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  id="startDate"
                />
              </div>
              <div className="table-row">
                <label htmlFor="endDate">End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  id="endDate"
                />
              </div>
              <p className="table-row">
                <label htmlFor="location">Working Location</label>
                <input type="text" id="location" />
              </p>
              <p className="table-row">
                <label htmlFor="paymentType">Payment Type</label>
                <select name="paymentType" id="paymentType">
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                </select>
              </p>
            </div>
            <div className="column">
              <p className="table-row">
                <label htmlFor="salary">Salary</label>
                <input type="text" id="salary" />
              </p>
              <p className="table-row">
                <label htmlFor="supervisorName">Supevisor Name</label>
                <input type="text" id="supervisorName" />
              </p>
              <p className="table-row">
                <label htmlFor="supervisorPhone">Supervisor Telephone</label>
                <input type="tel" id="supervisorPhone" />
              </p>
              <p className="table-row">
                <label htmlFor="supervisorEmail">Supervisor Email</label>
                <input type="email" id="supervisorEmail" />
              </p>
              <p className="table-row">
                <label htmlFor="appointmentLetter">Appointment Letter</label>
                {/* <button
                  type="button"
                  id="appointmentLetter"
                  onClick={openModal}
                >
                  <span>Upload</span>
                </button> */}
                <input type="file" id="appointmentLetter" />
              </p>
              <p className="table-row">
                <label htmlFor="feedbackForm">Feedback Form</label>
                {/* <button type="button" id="feedbackForm" onClick={openModal}>
                  <span>Upload</span>
                </button> */}
                <input type="file" id="feedbackForm" />
              </p>
              <p className="table-row">
                <label htmlFor="feedbackComment">Feedback Comment</label>
                <input type="text" id="feedbackComment" />
              </p>
              <p className="table-row">
                <label htmlFor="placementStatus">Placement Status</label>
                <select name="placementStatus" id="placementStatus">
                  <option value="approved">Approved</option>
                  <option value="incomplete">Incomplete</option>
                  <option value="waiting">Waiting</option>
                </select>
              </p>
              <p className="table-row">
                <label htmlFor="remarks">Remarks</label>
                <input
                  type="text"
                  id="remarks"
                  value="add chat box here"
                  readOnly
                />
              </p>
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
