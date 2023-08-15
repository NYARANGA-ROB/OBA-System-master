import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { addNewCourse } from "../../services/courseSevices";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CourseMaker = () => {
  const [courseData, setCourseData] = useState({
    courseId: "",
    courseName: "",
    program: "",
    semester: 1,
  });
  const navigate = useNavigate();

  const dispatchData = (type, value) => {
    setCourseData((previous) => {
      return {
        ...previous,
        [type]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, status } = await addNewCourse(courseData);
    if (status === 200) {
      toast("Course added successfully");
      navigate("/courses");
    }
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
            name="courseId"
            label="Course-ID"
            onChange={(e) => {
              dispatchData(e.target.attributes.name.value, e.target.value);
            }}
          />
          <TextField
            fullWidth
            name="courseName"
            label="Course-Name"
            onChange={(e) => {
              dispatchData(e.target.attributes.name.value, e.target.value);
            }}
          />



<FormControl fullWidth>
            <InputLabel>Program</InputLabel>
            <Select
              fullWidth
              value={courseData.program}
              name="program"
              label="program"
              onChange={(e) => {
                dispatchData(e.target.name, e.target.value);
              }}
            >
              <MenuItem value="BS-CS">BS-CS</MenuItem>
              <MenuItem value="BBA">BBA</MenuItem>
              <MenuItem value="BS-EE">BS-EE</MenuItem>
              <MenuItem value="BS-Math">BS-Math</MenuItem>
              <MenuItem value="BS-Media">BS-Media</MenuItem>
              <MenuItem value="BS-Pysical Education">BS-Pysical Education</MenuItem>
              <MenuItem value="BS Education">BS Education</MenuItem>
              <MenuItem value="BS-AF">BS-AF</MenuItem>
              <MenuItem value="BS-CSC">BS-CSC</MenuItem>

            </Select>

          </FormControl>

{/* 
          <TextField
            fullWidth
            name="program"
            label="Program"
            onChange={(e) => {
              dispatchData(e.target.attributes.name.value, e.target.value);
            }}
          />
 */}

          <FormControl fullWidth>
            <InputLabel>Semester</InputLabel>
            <Select
              fullWidth
              value={courseData.semester}
              name="semester"
              label="Semester"
              onChange={(e) => {
                dispatchData(e.target.name, e.target.value);
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>

            </Select>

          </FormControl>
          <Button

          // onClick={()=> toast("Course Added")}
            variant="contained"
            type={"submit"}
            sx={{
              backgroundColor: "#1B0441",
              ":hover": {
                backgroundColor: "#380975",
              },
            }}
          >
            Add course
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default CourseMaker;
