import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { deleteCourseById, getAllCourses } from "../../services/courseSevices";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { ToastContainer, toast } from "react-toastify";
const Course = () => {
  const [courses, setCourses] = useState([]);

  const fetchData = async () => {
    const { data, status } = await getAllCourses();
    if (status === 200) {
      setCourses(data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const { data, status } = await deleteCourseById(id);
    if (status === 200) {
      toast("Course Deleted");
      fetchData();
    }
  };
  return (
    <div>
      <ToastContainer />
      <Button
        variant="contained"
        component={Link}
        to="/createCourse"
        sx={{
          backgroundColor: "#1B0441",
          ":hover": {
            backgroundColor: "#380975",
          },
          margin: "1.5rem 0",
        }}
      >
        Add course
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Course Id</TableCell>
              <TableCell align="center">Course Name</TableCell>
              <TableCell align="center">Program</TableCell>
              <TableCell align="center">Semester</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell align="center">{course.courseId}</TableCell>
                <TableCell align="center">{course.courseName}</TableCell>
                <TableCell align="center">{course.program}</TableCell>
                <TableCell align="center">{course.semester}</TableCell>
                <TableCell align="center">
                  <Button component={Link} to={`/editCourse/${course._id}`}>
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleDelete(course._id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button component={Link} to={`/courseDetails/${course._id}`}>
                    <SettingsApplicationsIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Course;
