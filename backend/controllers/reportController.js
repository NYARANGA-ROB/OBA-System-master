import asyncHandler from "express-async-handler";
import Course from "../models/Course.js";
import { Assessment } from "../models/Assessment.js";
import { CLOs } from "../models/CLO.js";
import Student from "../models/Student.js";
const generateReport = asyncHandler(async (req, res) => {
  const courseId = req.params.id;

  const course = await Course.findById(courseId).select(
    "courseId courseName program semester -_id"
  );
  const numberOfStudents = await Assessment.findOne({
    course: courseId,
  }).select("students");

  const clos = await CLOs.findOne({ course: courseId })
    .select("clos")
    .populate("clos", "description -_id");
  const studentsWithClos = await Student.find({ course: courseId })
    .select("marks -_id")
    .populate("marks.clo");
  res.json({
    course,
    numberOfStudents: numberOfStudents.students.length,
    clos: clos.clos,
    studentsWithClos,
  });
});

export { generateReport };
