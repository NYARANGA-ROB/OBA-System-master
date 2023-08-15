import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { addCLOs, addPLOs } from "../../services/courseSevices";

const CustomModal = ({ open, setOpen, dialact }) => {
  const { id } = useParams();
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
  const [numberOfClos, setNumberOfClos] = useState(0);
  const [fields, setFields] = useState([]);
  const [clo, setClo] = useState([]);
  const updateFieldChanged = (index) => (e) => {
    let newArr = [...clo];
    newArr[index] = e.target.value;
    setClo(newArr);
  };
  const handleClick = () => {
    setFields([...Array(Number(numberOfClos)).keys()]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const arrToObj = clo.map((str, index) => {
      return { description: str };
    });

    if (dialact === "Clo") {
      const { data, status } = await addCLOs({ clos: arrToObj }, id);
    } else if (dialact === "Plo") {
      const { data, status } = await addPLOs({ plos: arrToObj }, id);
    }
  };
  return (
    <Modal
      open={open}
      onClose={() => setOpen(!open)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack sx={style} spacing={5}>
        <Stack direction={"row"} spacing={2}>
          <TextField
            label={`Number of ${dialact}s`}
            type="number"
            value={numberOfClos}
            fullWidth
            onChange={(e) => setNumberOfClos(e.target.value)}
            InputProps={{
              inputProps: {
                max: 100,
                min: 1,
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleClick}
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
        <Stack spacing={2}>
          {fields.map((data, i) => {
            return (
              <TextField
                onChange={updateFieldChanged(i)}
                key={i}
                label={`${dialact}${data + 1}`}
              />
            );
          })}

          <Stack direction={"row"} spacing={3}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              sx={{
                backgroundColor: "#1B0441",
                ":hover": {
                  backgroundColor: "#380975",
                },
              }}
            >
              Save {dialact}s
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              sx={{
                backgroundColor: "#1B0441",
                ":hover": {
                  backgroundColor: "#380975",
                },
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default CustomModal;
