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
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useParams } from "react-router-dom";
import { deleteFaculty, getAllFeculty } from "../../services/userServices";
import { ToastContainer } from "react-toastify";

const ManageFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const fetchAllFeculty = async () => {
    const { data, status } = await getAllFeculty();
    if (status === 200) {
      setFaculty(data);
    }
  };
  const handleDelete = async (id) => {
    const { data, status } = await deleteFaculty(id);
    if (status === 200) {
      fetchAllFeculty();
    }
  };
  useEffect(() => {
    fetchAllFeculty();
  }, []);
  return (
    <div>
      <ToastContainer />
      <Button
        variant="contained"
        component={Link}
        to="/addFaculty"
        sx={{
          backgroundColor: "#1B0441",
          ":hover": {
            backgroundColor: "#380975",
          },
          margin: "1.5rem 0",
        }}
      >
        Add Faculty
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">INS Id</TableCell>
              <TableCell align="center">Full Name</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faculty.map((elem) => (
              <TableRow key={elem._id}>
                <TableCell align="center">{elem.insId}</TableCell>
                <TableCell align="center">{elem.fullName}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleDelete(elem._id)}>
                    <DeleteIcon />
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

export default ManageFaculty;
