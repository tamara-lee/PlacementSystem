import React, { useState } from "react";
import NavigationBar from "../../../components/NavBarAdmin/NavBarAdmin";
import { Redirect } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect"; //use for mobile
import MenuItem from "@mui/material/MenuItem";
import TestData from "../../../mock data/test_data.json";
import Axios from "axios";

Axios.get("http://localhost:3001/placementrecord/student/acadyear", {}).then(
    (response) => {
      console.log(response);
    }
  );
  Axios.get("http://localhost:3001/placementrecord/student/placementyear", {}).then(
    (response) => {
      console.log(response);
    }
  );

function StudentRecords({ authorized }) {
  if (authorized === false) {
    console.log(authorized);
    return <Redirect to="/" />;
  }
  return (
    <>
      <div>
        <NavigationBar />
        <Container>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              marginTop: "20px",
            }}
          >
            {/* <Box>
              <InputLabel variant="standard" id="academicYear">
                Academic Year
              </InputLabel>
              <Select labelId="academicYear" id="select">
                <MenuItem value="10">Ten</MenuItem>
                <MenuItem value="20">Twenty</MenuItem>
              </Select>
            </Box> */}
          </Box>
        </Container>
      </div>
    </>
  );
}

export default StudentRecords;
