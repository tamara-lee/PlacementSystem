import React, { useState } from "react";
import Axios from "axios";

function TestFileUpload() {
  const [selectedFile1, setSelectedFile1] = useState();
  const [isSelected1, setIsSelected1] = useState(false);
  const [selectedFile2, setSelectedFile2] = useState();
  const [isSelected2, setIsSelected2] = useState(false);
  const [selectedFile3, setSelectedFile3] = useState();
  const [isSelected3, setIsSelected3] = useState(false);
  Axios.defaults.withCredentials = true;

  const changeHandler1 = (event) => {
    setSelectedFile1(event.target.files[0]);
    setIsSelected1(true);
  };

  const changeHandler2 = (event) => {
    setSelectedFile2(event.target.files[0]);
    setIsSelected2(true);
  };

  const changeHandler3 = (event) => {
    setSelectedFile3(event.target.files[0]);
    setIsSelected3(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();

    if (selectedFile1) {
      formData.append("appointment", selectedFile1, selectedFile1.name);
    }
    if (selectedFile2) {
      formData.append("consent", selectedFile2, selectedFile2.name);
    }
    if (selectedFile3) {
      formData.append("feedback", selectedFile3, selectedFile3.name);
    }

    Axios.post("http://localhost:3001/placementrecord/testpage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => console.log(res))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <input type="file" name="appointment" onChange={changeHandler1} />
      {isSelected1 ? (
        <div>
          <p>Filename: {selectedFile1.name}</p>
          <p>Filetype: {selectedFile1.type}</p>
          <p>Size in bytes: {selectedFile1.size}</p>
          <p>
            lastModifiedDate:{" "}
            {selectedFile1.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <input type="file" name="consent" onChange={changeHandler2} />
      {isSelected2 ? (
        <div>
          <p>Filename: {selectedFile2.name}</p>
          <p>Filetype: {selectedFile2.type}</p>
          <p>Size in bytes: {selectedFile2.size}</p>
          <p>
            lastModifiedDate:{" "}
            {selectedFile2.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <input type="file" name="feedback" onChange={changeHandler3} />
      {isSelected3 ? (
        <div>
          <p>Filename: {selectedFile3.name}</p>
          <p>Filetype: {selectedFile3.type}</p>
          <p>Size in bytes: {selectedFile3.size}</p>
          <p>
            lastModifiedDate:{" "}
            {selectedFile3.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  );
}
export default TestFileUpload;
