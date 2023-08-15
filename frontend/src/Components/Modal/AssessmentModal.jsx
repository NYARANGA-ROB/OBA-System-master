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
import { addNewAssessment, getClosAndPlos } from "../../services/courseSevices";
import { useParams } from "react-router-dom";
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

const AssessmentModal = ({ open, setOpen, reloadAssessments }) => {
  const [clos, setClos] = useState([]);
  const [formData, setFormData] = useState({
    assessment: "",
    assessmentType: "",
    fullMarks: 0,
    weightage: 0,
    clo: "",
  });
  const dispatchData = (type, value) => {
    setFormData((previous) => {
      return {
        ...previous,
        [type]: value,
      };
    });
  };
  const { id } = useParams();
  const fetchCLOs = async () => {
    const { data, status } = await getClosAndPlos(id);
    if (status === 200) {
      setClos(data?.clos[0].clos);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const { data, status } = await addNewAssessment(formData, id);
    if (status === 200) {
      reloadAssessments();
      setOpen(false);
    }
  };
  useEffect(() => {
    fetchCLOs();
  }, []);
  return (
    <Modal
      open={open}
      onClose={() => setOpen(!open)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack sx={style} spacing={3} component={"form"} onSubmit={handleSubmit}>
        <TextField
          label="Assessment"
          name="assessment"
          onChange={(e) => {
            dispatchData(e.target.attributes.name.value, e.target.value);
          }}
        />
        <TextField
          name="assessmentType"
          label="Assessment Type"
          onChange={(e) => {
            dispatchData(e.target.attributes.name.value, e.target.value);
          }}
        />
        <TextField
          name="fullMarks"
          label="Full marks"
          type={"number"}
          InputProps={{
            inputProps: {
              max: 100,
              min: 0,
            },
          }}
          onChange={(e) => {
            dispatchData(
              e.target.attributes.name.value,
              Number(e.target.value)
            );
          }}
        />
        <TextField
          name="weightage"
          label="Weightage %"
          InputProps={{
            inputProps: {
              max: 100,
              min: 0,
            },
          }}
          type={"number"}
          onChange={(e) => {
            dispatchData(
              e.target.attributes.name.value,
              Number(e.target.value)
            );
          }}
        />
        <FormControl fullWidth>
          <InputLabel>{`CLO`}</InputLabel>
          <Select
            fullWidth
            name="clo"
            label="CLO"
            value={formData.clo}
            onChange={(e) => {
              dispatchData(e.target.name, e.target.value);
            }}
          >
            {clos.map((elem, i) => {
              return (
                <MenuItem key={i} value={elem._id}>
                  {elem.description}
                </MenuItem>
              );
            })}
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
          Add
        </Button>
      </Stack>
    </Modal>
  );
};

export default AssessmentModal;
