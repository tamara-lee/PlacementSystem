import React from "react";
import NavBar from "../../../components/NavBar/NavBar";
import Navbar from "../../../components/NavBar/index";
import { Redirect } from "react-router-dom";
import "./style.css";

function MyPlacementRecord({ authorized }) {
  // if (authorized === false) {
  //   console.log(authorized);
  //   return <Redirect to="/" />;
  // }
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="column">
            <form>
              <p>
                <label for="studentNo">Student No.</label>
                <input type="text" id="studentNo" />
              </p>
              <p>
                <label for="studentName">Student Name</label>
                <input type="text" id="studentName" />
              </p>
              <p>
                <label for="curriculum">Curriculum</label>
                <input type="text" id="curriculum" />
              </p>
              <p>
                <label for="companyName">Company Name</label>
                <input type="text" id="companyName" />
              </p>
              <p>
                <label for="jobTitle">Job Title / Position</label>
                <input type="text" id="jobTitle" />
              </p>
              <p>
                <label for="jobNature">Job Nature</label>
                <input type="text" id="jobNature" />
              </p>
              <p>
                <label for="startDate">Start Date</label>
                <input type="date" id="startDate" />
              </p>
              <p>
                <label for="endDate">End Date</label>
                <input type="date" id="endDate" />
              </p>
              <p>
                <label for="location">Working Location</label>
                <input type="text" id="location" />
              </p>
              <p>
                <label for="paymentType">Payment Type</label>
                <select name="paymentType" id="paymentType">
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                </select>
              </p>
            </form>
          </div>
          <div className="column">
            <form>
              <p>
                <label for="salary">Salary</label>
                <input type="text" id="salary" />
              </p>
              <p>
                <label for="supervisorName">Supevisor Name</label>
                <input type="text" id="supervisorName" />
              </p>
              <p>
                <label for="supervisorPhone">Supervisor Telephone</label>
                <input type="tel" id="supervisorPhone" />
              </p>
              <p>
                <label for="supervisorEmail">Supervisor Email</label>
                <input type="email" id="supervisorEmail" />
              </p>
              <p>
                <label for="appointmentLetter">Appointment Letter</label>
                <button id="appointmentLetter">Upload</button>
              </p>
              <p>
                <label for="feedbackForm">Feedback Form</label>
                <button id="feedbackForm">Upload</button>
              </p>
              <p>
                <label for="feedbackComment">Feedback Comment</label>
                <input type="text" id="feedbackComment" />
              </p>
              <p>
                <label for="placementStatus">Placement Status</label>
                <select name="placementStatus" id="placementStatus">
                  <option value="approved">Approved</option>
                  <option value="incomplete">Incomplete</option>
                  <option value="waiting">Waiting</option>
                </select>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPlacementRecord;
