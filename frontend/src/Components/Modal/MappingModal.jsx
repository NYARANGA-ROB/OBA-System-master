import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { cloToPloMapping, getClosAndPlos } from "../../services/courseSevices";
import { useParams } from "react-router-dom";

const MappingModal = ({ open, setOpen, reloadMappings }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
    borderRadius: "10px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const [clos, setClos] = useState([]);
  const [plos, setPlos] = useState([]);
  const { id } = useParams();
  const [clo, setClo] = useState([]);
  const updateFieldChanged = (index, dialact) => (e) => {
    let newArr = [...clo];
    let object = {};
    if (dialact === "clo") {
      object.clo = e.target.value;
    } else if (dialact === "plo") {
      object.plo = e.target.value;
    }
    newArr[index] = {
      ...clo[index],
      ...object,
    };
    setClo(newArr);
  };
  useEffect(() => {
    const fetchData = async () => {
      const { data, status } = await getClosAndPlos(id);

      if (status === 200) {
        setClos(data.clos[0].clos);
        setPlos(data.plos[0].plos);
      }
    };
    fetchData();
  }, []);
  const handleMapping = async (e) => {
    e.preventDefault();
    const { data, status } = await cloToPloMapping({ map: clo }, id);
    if (status === 200) {
      reloadMappings();
      setOpen(false);
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
        <Stack direction={"row"} spacing={3}>
          <Stack spacing={3} sx={{ width: "100%" }}>
            {clos.map((clo, i) => {
              return (
                <FormControl key={i} fullWidth>
                  <InputLabel>{`CLO ${i + 1}`}</InputLabel>
                  <Select
                    fullWidth
                    name={`clo`}
                    label={`CLO ${i}`}
                    onChange={updateFieldChanged(i, "clo")}
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
              );
            })}
          </Stack>
          <Stack spacing={3} sx={{ width: "100%" }}>
            {plos.map((plo, i) => {
              return (
                <FormControl key={i} fullWidth>
                  <InputLabel>{`PLO ${i + 1}`}</InputLabel>
                  <Select
                    // value={plo.description}
                    onChange={updateFieldChanged(i, "plo")}
                    fullWidth
                    name={`plo`}
                    label={`PLO ${i}`}
                  >
                    {plos.map((elem, i) => {
                      return (
                        <MenuItem key={i} value={elem._id}>
                          {elem.description}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            })}
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={3}>
          <Button
            onClick={handleMapping}
            variant="contained"
            sx={{
              backgroundColor: "#1B0441",
              ":hover": {
                backgroundColor: "#380975",
              },
            }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpen(!open)}
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
    </Modal>
  );
};

export default MappingModal;
