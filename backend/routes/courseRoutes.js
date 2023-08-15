import express from "express";
import {
  addCLOs,
  addNewAssessment,
  addNewCourse,
  addPLOs,
  cloToPloMapping,
  deleteCourseById,
  editCourseById,
  getAllAssessments,
  getAllAssessmentsForMarks,
  getAllAssessmentsForMarksWithClo,
  getAllCourses,
  getClosAndPlos,
  getCourseById,
  getMappingByCourse,
  getStudentClo,
} from "../controllers/CourseController.js";
const router = express.Router();

router.post("/addNewCourse", addNewCourse);
router.get("/getAllCourses", getAllCourses);
router.delete("/deleteCourseById/:id", deleteCourseById);
router.get("/getCourseById/:id", getCourseById);
router.put("/editCourseById/:id", editCourseById);
router.post("/addCLOs/:id", addCLOs);
router.post("/addPLOs/:id", addPLOs);
router.post("/cloToPloMapping/:id", cloToPloMapping);
router.get("/getMappingByCourse/:id", getMappingByCourse);
router.get("/getClosAndPlos/:id", getClosAndPlos);
router.post("/addNewAssessment/:id", addNewAssessment);
router.get("/getAllAssessments/:id", getAllAssessments);
router.get("/getAllAssessmentsForMarks/:id", getAllAssessmentsForMarks);
router.get(
  "/getAllAssessmentsForMarksWithClo/:id",
  getAllAssessmentsForMarksWithClo
);
router.get("/getStudentClo/:id", getStudentClo);
export default router;
