import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllAssessmentsForMarks } from "../../services/courseSevices";
import { Link, useParams } from "react-router-dom";
import { AddStudentModal } from "../../Components/Modal";
import { camelize } from "../../utils/halperFunctions";
const Marks = () => {
  const [assessments, setAssessments] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  
  const [addStudentModal, setAddStudentModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  const { id } = useParams();
  const fetchAssessments = async () => {
    const { data, status } = await getAllAssessmentsForMarks(id);
    if (status === 200) {
      // console.log(data);
      setStudentData(data.students);
      setStudentCount(studentCount+1);
      setAssessments(data.assessments);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);
  const assessmentType = assessments.map((ass) => {
    return ass.assessmentType;
  });
  const assessmentList = assessments.map((ass) => {
    return ass.assessment;
  });
  const fullMarks = assessments.map((ass) => {
    return ass.fullMarks;
  });
  const weightage = assessments.map((ass) => {
    return ass.weightage;
  });

  const cml = assessmentType.map((ass) => {
    return camelize(ass);
  });

  // console.log([...new Set(cml)], assessmentList);
  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <Stack
      spacing={5}
      sx={{
        marginTop: "1rem",
      }}
    >
      <AddStudentModal
        open={addStudentModal}
        setOpen={setAddStudentModal}
        data={assessments}
        reloadAssessments={fetchAssessments}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell variant="head" align="center">
                Assessment type
              </TableCell>
              {assessmentType.map((ass, i) => (
                <TableCell key={i} align="center">
                  {ass}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell variant="head" align="center">
                Assessments
              </TableCell>
              {assessmentList.map((ass, i) => (
                <TableCell key={i} align="center">
                  {ass}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell variant="head" align="center">
                Full marks
              </TableCell>
              {fullMarks.map((ass, i) => (
                <TableCell key={i} align="center">
                  {ass}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell variant="head" align="center">
                weightage
              </TableCell>
              {weightage.map((ass, i) => (
                <TableCell key={i} align="center">
                  {ass}%
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        // onClick={handleClick}
        onClick={() => setAddStudentModal(!addStudentModal)}
        sx={{
          maxWidth: "fit-content",
          backgroundColor: "#1B0441",
          ":hover": {
            backgroundColor: "#380975",
          },
          textTransform: "none",
        }}
      >
        Add Student
      </Button>
      <Button
        variant="contained"
        component={Link}
        to={`/report/${id}`}
        // onClick={handleClick}
        sx={{
          maxWidth: "fit-content",
          backgroundColor: "#1B0441",
          ":hover": {
            backgroundColor: "#380975",
          },
          textTransform: "none",
        }}
      >
        Generate Report
      </Button>
      {studentData.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Student ID</TableCell>
                <TableCell align="center">Student name</TableCell>
                {studentData[0].marks.map((elm, i) => {
                  return (
                    <TableCell align="center" key={i}>
                      {elm.dialect}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {studentData.map((student, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell align="center">{student.studentId}</TableCell>
                    <TableCell align="center">{student.fullName}</TableCell>
                    {Object.keys(student.marks).map((mark, j) => {
                      return (
                        <TableCell align="center" key={j}>
                          {student.marks[mark].marks}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Stack>
  );
};

export default Marks;
