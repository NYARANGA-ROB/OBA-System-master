import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

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
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import {
  getAllAssessments,
  getAllCourses,
  getCourseById,
  getMappingByCourse,
} from "../../services/courseSevices";
import {
  AssessmentModal,
  CustomModal,
  MappingModal,
} from "../../Components/Modal";

const CourseDetails = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [cloModal, setCloModal] = useState(false);
  const [ploModal, setPloModal] = useState(false);
  const [mappingModal, setMappingModal] = useState(false);
  const [mappings, setMappings] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [assessmentModal, setAssessmentModal] = useState(false);
  const fetchData = async () => {
    const { data, status } = await getCourseById(id);
    if (status === 200) {
      setCourses([data]);
    }
  };
  const fetchMapping = async () => {
    const { data, status } = await getMappingByCourse(id);
    if (status === 200) {
      setMappings(data.map.map);
    }
  };
  const fetchAssessments = async () => {
    const { data, status } = await getAllAssessments(id);
    if (status === 200) {
      setAssessments(data.assessments);
    }
  };
  useEffect(() => {
    fetchData();
    fetchMapping();
    fetchAssessments();
  }, []);
  return (
    <div>
      <CustomModal open={cloModal} setOpen={setCloModal} dialact={"Clo"} />
      <CustomModal open={ploModal} setOpen={setPloModal} dialact={"Plo"} />
      <MappingModal
        open={mappingModal}
        setOpen={setMappingModal}
        reloadMappings={fetchMapping}
      />
      <AssessmentModal
        open={assessmentModal}
        setOpen={setAssessmentModal}
        reloadAssessments={fetchAssessments}
      />
      <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Course Id</TableCell>
              <TableCell align="center">Course Name</TableCell>
              <TableCell align="center">Program</TableCell>
              <TableCell align="center">Semester</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, i) => (
              <TableRow key={i}>
                <TableCell align="center">{course.courseId}</TableCell>
                <TableCell align="center">{course.courseName}</TableCell>
                <TableCell align="center">{course.program}</TableCell>
                <TableCell align="center">{course.semester}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="course-details-buttons-wrapper">
        <Button
          variant="contained"
          onClick={() => setCloModal(!cloModal)}
          sx={{
            backgroundColor: "#1B0441",
            ":hover": {
              backgroundColor: "#380975",
            },
            textTransform: "none",
          }}
        >
          Add CLOs
        </Button>
        <Button
          variant="contained"
          onClick={() => setPloModal(!ploModal)}
          sx={{
            backgroundColor: "#1B0441",
            ":hover": {
              backgroundColor: "#380975",
            },
            textTransform: "none",
          }}
        >
          Add PLOs
        </Button>
        <Button
          variant="contained"
          onClick={() => setMappingModal(!mappingModal)}
          sx={{
            backgroundColor: "#1B0441",
            ":hover": {
              backgroundColor: "#380975",
            },
            textTransform: "none",
          }}
        >
          Create CLOs to PLOs mapping
        </Button >
        {mappings.length > 0 ? (
          <Button
            variant="contained"
            onClick={() => setAssessmentModal(!assessmentModal)}
            sx={{
              backgroundColor: "#1B0441",
              ":hover": {
                backgroundColor: "#380975",
              },
              textTransform: "none",
            }}
          >
            Add assessment
          </Button>
        ) : null}
      </div>

      <Stack direction={"column"} spacing={3}>
        {mappings.length > 0 ? (
          <div>
            <Typography variant="h5" fontWeight={800} padding={"1rem 0"}>
              Clo to Plo mapping
            </Typography>
            {mappings.map((map, i) => {
              return (
                <Stack
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    padding: "1rem",
                    borderRadius: "7px",
                    marginBottom: "1rem",
                  }}
                  spacing={3}
                  key={i}
                  direction={"row"}
                >
                  <Typography fontWeight={600}>
                    {`CLO${i + 1}: ${map.clo.description}`}
                  </Typography>
                  <Typography fontWeight={600}>
                    {`PLO${i + 1}: ${map.plo.description}`}
                  </Typography>
                </Stack>
              );
            })}
          </div>
        ) : null}
        {assessments.length > 0 ? (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" fontWeight={800}>
                Assessment to CLO mapping
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to={`/marksEntry/${id}`}
                sx={{
                  backgroundColor: "#1B0441",
                  ":hover": {
                    backgroundColor: "#380975",
                  },
                  textTransform: "none",
                }}
              >
                Student to Assessment
              </Button>
            </div>
            <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">No</TableCell>
                    <TableCell align="center">Assessment type</TableCell>
                    <TableCell align="center">Assessment</TableCell>
                    <TableCell align="center">Full marks</TableCell>
                    <TableCell align="center">Weightage%</TableCell>
                    <TableCell align="center">Attatched CLO</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assessments.map((assessment, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{i + 1}</TableCell>
                      <TableCell align="center">
                        {assessment.assessmentType}
                      </TableCell>
                      <TableCell align="center">
                        {assessment.assessment}
                      </TableCell>
                      <TableCell align="center">
                        {assessment.fullMarks}
                      </TableCell>
                      <TableCell align="center">
                        {assessment.weightage}
                      </TableCell>
                      <TableCell align="center">
                        {assessment.clo.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : null}
      </Stack>
    </div>
  );
};

export default CourseDetails;
