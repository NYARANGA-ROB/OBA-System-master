import express from "express";
import {
  addStudent,
  deleteFaculty,
  getAllFeculty,
  getUserProfile,
  resetPasswordFaculty,
  userLogin,
  userRegister,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegister);
router.get("/getAllFeculty", getAllFeculty);
router.delete("/deleteFaculty/:id", deleteFaculty);
router.post("/addStudent/:id", addStudent);
router.get("/getUserProfile/:id", getUserProfile);
router.post("/resetPasswordFaculty/:id", resetPasswordFaculty);

export default router;
