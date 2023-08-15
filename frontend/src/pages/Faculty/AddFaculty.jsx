import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { userRegister } from "../../services/userServices";
import { useNavigate } from "react-router-dom";

const AddFaculty = () => {
  const [facultyData, setFacultyData] = useState({
    fullName: "",
    insId: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status } = await userRegister(facultyData);
    if (status === 201) {
      navigate("/manageFaculty");
    }
  };
  const dispatchData = (type, value) => {
    setFacultyData((previous) => {
      return {
        ...previous,
        [type]: value,
      };
    });
  };
  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={2}
          style={{
            height: "100vh",
            display: "felx",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            fullWidth
            name="insId"
            label="INS ID"
            onChange={(e) => {
              dispatchData(e.target.attributes.name.value, e.target.value);
            }}
          />
          <TextField
            fullWidth
            name="fullName"
            label="Full Name"
            onChange={(e) => {
              dispatchData(e.target.attributes.name.value, e.target.value);
            }}
          />
          <TextField
            fullWidth
            name="password"
            label="Password"
            onChange={(e) => {
              dispatchData(e.target.attributes.name.value, e.target.value);
            }}
          />
          <Button
            variant="contained"
            type={"submit"}
            sx={{
              backgroundColor: "#1B0441",
              ":hover": {
                backgroundColor: "#380975",
              },
            }}
          >
            Add Faculty
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default AddFaculty;
