import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { camelize } from "../../utils/halperFunctions";
import { addStudent } from "../../services/userServices";
import { useParams } from "react-router-dom";
import { getAllAssessmentsForMarksWithClo } from "../../services/courseSevices";

const AddStudentModal = ({ open, setOpen, reloadAssessments }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
    borderRadius: "5px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const [formData, setFormData] = useState({});
  const [marks, setMarks] = useState([]);
  const [data, setData] = useState([]);
  const { id } = useParams();

  const updateFieldChanged = (index, clo) => (e) => {
    let newArr = [...marks];
    let object = {};
    object.marks = e.target.value;
    object.dialect = e.target.attributes.name.value;
    object.clo = clo;

    newArr[index] = {
      ...marks[index],
      ...object,
    };
    setMarks(newArr);
  };
  const dispatchData = (type, value) => {
    setFormData((previous) => {
      return {
        ...previous,
        [type]: value,
      };
    });
  };
  const dispatchDataForMarks = (type, value, clo) => {
    setMarks((previous) => {
      return {
        ...previous,
        [type]: {
          marks: value,
          clo: clo,
        },
      };
    });
  };
  const handleAddStudent = async (e) => {
    e.preventDefault();
    console.log(formData, marks);
    const { data, status } = await addStudent(
      { ...formData, marks: marks },
      id
    );
    if (status === 200) {
      setOpen(false);
      reloadAssessments();
    }
  };

  console.log(data);
  const fetchAssessmentsWithClo = async () => {
    const { data, status } = await getAllAssessmentsForMarksWithClo(id);
    if (status === 200) {
      setData(data.assessments);
    }
  };

  useEffect(() => {
    fetchAssessmentsWithClo();
  }, []);
  return (
    <Modal
      open={open}
      onClose={() => setOpen(!open)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleAddStudent}>
        <Stack sx={style} spacing={2}>
          <TextField
            name={"studentId"}
            onChange={(e) => {
              dispatchData(e.target.attributes.name.value, e.target.value);
            }}
            label={"Student Id"}
          />
          <TextField
            name={"fullName"}
            onChange={(e) => {
              dispatchData(e.target.attributes.name.value, e.target.value);
            }}
            label={"Student Name"}
          />
          {data.map((assessment, i) => {
            return (
              <TextField
                name={`${camelize(assessment.assessmentType)}${
                  assessment.assessment
                }`}
                onChange={updateFieldChanged(i, assessment.clo)}
                InputProps={{
                  inputProps: {
                    max: assessment.fullMarks,
                    min: 0,
                  },
                }}
                type="number"
                label={`${assessment.assessment}(${assessment.assessmentType})`}
                key={i}
              />
            );
          })}
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#1B0441",
              ":hover": {
                backgroundColor: "#380975",
              },
            }}
          >
            Save Student
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddStudentModal;
