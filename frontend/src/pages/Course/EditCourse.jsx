import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addNewCourse,
  editCourseById,
  getCourseById,
} from "../../services/courseSevices";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const EditCourse = ({ match }) => {
  const [courseData, setCourseData] = useState({
    courseId: "",
    courseName: "",
    program: "",
    semester: 1,
  });
  const { id } = useParams();

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
    const { status } = await editCourseById(courseData, id);
    if (status === 200) {
      navigate("/courses");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, status } = await getCourseById(id);
      if (status === 200) {
        setCourseData(data);
      }
    };
    fetchData();
  }, []);

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
            value={courseData.courseId}
            onChange={(e) => {
              dispatchData(e.target.attributes.name.value, e.target.value);
            }}
          />
          <TextField
            fullWidth
            name="courseName"
            value={courseData.courseName}
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


          {/* <TextField
            fullWidth
            name="program"
            value={courseData.program}
            label="Program"
            onChange={(e) => {
              dispatchData(e.target.attributes.name.value, e.target.value);
            }}
          /> */}


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
            variant="contained"
            type={"submit"}
            sx={{
              backgroundColor: "#1B0441",
              ":hover": {
                backgroundColor: "#380975",
              },
            }}
          >
            Update course
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default EditCourse;
