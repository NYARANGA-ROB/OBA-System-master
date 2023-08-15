import { CLOs, SingleClo } from "../models/CLO.js";
import Course from "../models/Course.js";
import asyncHandler from "express-async-handler";
import { PLOs, SinglePlo } from "../models/PLO.js";
import Maps from "../models/Mapping.js";
import { Assessment, SingleAssessment } from "../models/Assessment.js";
import Student from "../models/Student.js";

const addNewCourse = asyncHandler(async (req, res) => {
  const courseData = req.body;
  const course = await Course.create(courseData);

  if (course) {
    console.log(course);
    res.json(course).status(200);
  } else {
    throw new Error("Something Went wrong");
  }
});

const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({});
  if (courses.length === 0) throw new Error("No courses found");
  res.json(courses).status(200);
});

const deleteCourseById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await Course.findByIdAndDelete(id);
  if (!response) throw new Error("Course Not Found");
  res.json({ message: "Course Deleted" }).status(200);
});

const getCourseById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) throw new Error("Course Not Found");
  res
    .json({
      courseId: course.courseId,
      courseName: course.courseName,
      program: course.program,
      semester: course.semester,
    })
    .status(200);
});
const editCourseById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { courseId, courseName, program, semester } = req.body;
  const course = await Course.findById(id);
  if (course) {
    course.courseId = courseId;
    course.courseName = courseName;
    course.program = program;
    course.semester = semester;

    const updatedCourse = await course.save();

    res.json(updatedCourse).status(200);
  } else {
    throw new Error("Course Not Found");
  }
});

const addCLOs = asyncHandler(async (req, res) => {
  const { clos } = req.body;
  const response = await SingleClo.create(clos);
  if (!response) throw new Error("Something went wrong");

  const ids = response.map((id) => {
    return id._id;
  });
  const addingClos = await CLOs.create({
    course: req.params.id,
    clos: ids,
  });
  const updateCourse = await Course.findById(req.params.id);

  if (updateCourse) {
    updateCourse.clo = addingClos._id;
    updateCourse.save();
  }
  res.json({ response, updateCourse }).status(200);
});
const addPLOs = asyncHandler(async (req, res) => {
  const { plos } = req.body;
  const response = await SinglePlo.create(plos);
  if (!response) throw new Error("Something went wrong");

  const ids = response.map((id) => {
    return id._id;
  });
  const addingPlos = await PLOs.create({
    course: req.params.id,
    plos: ids,
  });
  const updateCourse = await Course.findById(req.params.id);

  if (updateCourse) {
    updateCourse.plo = addingPlos._id;
    updateCourse.save();
  }
  res.json({ response, updateCourse }).status(200);
});

const cloToPloMapping = asyncHandler(async (req, res) => {
  const { map } = req.body;

  const response = await Maps.create({
    course: req.params.id,
    map,
  });

  if (!response) throw new Error("Could not map");
  res.json(response).status(200);
});
const getMappingByCourse = asyncHandler(async (req, res) => {
  const map = await Maps.findOne({ course: req.params.id }).populate(
    "map.clo map.plo"
  );
  if (!map) {
    res.status(404);
    throw new Error("No mappings found");
  }
  res
    .json({
      courseId: map.course,
      map: map,
    })
    .status(200);
});

const getClosAndPlos = asyncHandler(async (req, res) => {
  const clos = await CLOs.find({ course: req.params.id }).populate("clos");
  const plos = await PLOs.find({ course: req.params.id }).populate("plos");

  res.json({ clos, plos }).status(200);
});

const addNewAssessment = asyncHandler(async (req, res) => {
  const assessment = req.body;
  const newAssessment = await SingleAssessment.create({
    ...assessment,
    course: req.params.id,
  });
  if (!newAssessment) throw new Error("Something went wrong");

  const allAssessments = await Assessment.findOneAndUpdate(
    {
      course: req.params.id,
    },
    {
      $push: {
        assessments: newAssessment._id,
      },
    },
    {
      upsert: true,
      new: true,
    }
  );

  res.json(allAssessments).status(200);
});

const getAllAssessments = asyncHandler(async (req, res) => {
  const allAssessments = await Assessment.findOne({
    course: req.params.id,
  }).populate({
    path: "assessments",
    populate: {
      path: "clo",
      model: "SingleClo",
    },
  });
  if (allAssessments.length === 0) throw new Error("No assessments found");
  res.json(allAssessments).status(200);
});

const getAllAssessmentsForMarks = asyncHandler(async (req, res) => {
  const allAssessments = await Assessment.findOne({
    course: req.params.id,
  })
    .populate({
      path: "assessments",
      select: "assessment assessmentType fullMarks weightage -_id",
    })
    .populate("students");
  if (!allAssessments) throw new Error("No assessments found");
  res.json(allAssessments).status(200);
});

const getAllAssessmentsForMarksWithClo = asyncHandler(async (req, res) => {
  const allAssessments = await Assessment.findOne({
    course: req.params.id,
  })
    .populate({
      path: "assessments",
      select: "assessment assessmentType clo fullMarks weightage -_id",
    })
    .populate("students");
  if (!allAssessments) throw new Error("No assessments found");
  res.json(allAssessments).status(200);
});

const getStudentClo = asyncHandler(async (req, res) => {
  const response = await Student.find({ course: req.params.id }).populate(
    "marks.$*.clo"
  );
  res.json(response);
});

export {
  addNewCourse,
  getAllCourses,
  deleteCourseById,
  getCourseById,
  editCourseById,
  addCLOs,
  addPLOs,
  cloToPloMapping,
  getMappingByCourse,
  getClosAndPlos,
  addNewAssessment,
  getAllAssessments,
  getAllAssessmentsForMarks,
  getAllAssessmentsForMarksWithClo,
  getStudentClo,
};
