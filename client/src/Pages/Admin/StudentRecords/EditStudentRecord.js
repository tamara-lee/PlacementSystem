import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import NavigationBar from "../../../components/NavBarAdmin/NavBarAdmin";
import { Redirect } from "react-router-dom";
import "./style.css";
import styled from "styled-components";
import Typography from "@mui/material/Typography";

const Container = styled.div`
  justify-content: center;
  margin: 1.2rem 3rem 2rem 3rem;
`;

function EditStudentRecord({ authorized }) {
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
  }, []);

  // sample text
  const [studentName, setStudentName] = useState("John Doe");
  const [studentNumber, setStudentNumber] = useState("3031110000");
  const [studentCurriculum, setStudentCurriculum] = useState("BEng (CompSc)");
  const [academicYear, setAcademicYear] = useState(2020);
  const [placementYear, setPlacementYear] = useState(2021);
  const [courseYear, setCourseYear] = useState(3);

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
      <NavigationBar />
      <Container>
        <form>
          <Typography
            style={{
              fontSize: "18px",
            }}
          >
            STUDENT RECORD
          </Typography>
          <div className="container">
            <label htmlFor="studentName">NAME</label>
            <input
              className="input"
              type="text"
              id="studentName"
              value={studentName}
            />
            <label htmlFor="studentNo">UNIVERSITY NUMBER</label>
            <input
              className="input"
              type="text"
              id="studentNo"
              value={studentNumber}
            />
            <label htmlFor="curriculum">CURRICULUM</label>
            <input
              className="input"
              type="text"
              id="curriculum"
              value={studentCurriculum}
            />
            <label htmlFor="academicYear">ACADEMIC YEAR</label>
            <input
              className="input"
              type="number"
              id="academicYear"
              value={academicYear}
            />
            <label htmlFor="placementYear">PLACEMENT YEAR</label>
            <input
              className="input"
              type="number"
              id="placementYear"
              value={placementYear}
            />
            <label htmlFor="courseYear">COURSE YEAR</label>
            <input
              className="input"
              type="number"
              id="courseYear"
              value={courseYear}
            />
          </div>
          <button className="form-submit" onClick={submitForm}>
            Save & Submit
          </button>
        </form>
      </Container>
    </>
  );
}

export default EditStudentRecord;
