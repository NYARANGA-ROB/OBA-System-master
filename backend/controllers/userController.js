import asyncHandler from "express-async-handler";
import Faculty from "../models/Faculty.js";
import Student from "../models/Student.js";
import { Assessment } from "../models/Assessment.js";

const userRegister = asyncHandler(async (req, res) => {
  const userData = req.body;
  const userExists = await Faculty.findOne({ insId: userData.insId });
  if (userExists) {
    res.status(400);
    throw new Error("User alredy existed");
  } else {
    const user = await Faculty.create({
      ...userData,
    });
    if (user) {
      res.status(201);
      res.json({
        fullName: user.fullName,
        insId: user.insId,
        isAdmin: user.isAdmin,
        userId: user._id,
      });
    } else {
      res.status(404);
      throw new Error("Invalid user");
    }
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { password, insId } = req.body;
  const user = await Faculty.findOne({ insId });
  if (user && (await user.matchPassword(password))) {
    res.json({
      fullName: user.fullName,
      insId: user.insId,
      isAdmin: user.isAdmin,
      userId: user._id,
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await Faculty.findOne({ insId: req.params.id }).select(
    "-password"
  );
  res.json(user).status(200);
});
const getAllFeculty = asyncHandler(async (req, res) => {
  const allFaculty = await Faculty.find({ isAdmin: false }).select(
    "-password insId fullName"
  );
  res.json(allFaculty);
});
const deleteFaculty = asyncHandler(async (req, res) => {
  const deleteUser = await Faculty.findByIdAndDelete(req.params.id);
  res.json(deleteUser);
});
const addStudent = asyncHandler(async (req, res) => {
  const studentData = req.body;
  const student = await Student.create({
    ...studentData,
    course: req.params.id,
  });
  if (student) {
    const assessment = await Assessment.findOneAndUpdate(
      {
        course: req.params.id,
      },
      {
        $push: {
          students: student._id,
        },
      },
      {
        new: true,
      }
    );
    console.log(assessment);
    if (assessment) res.json(assessment);
  }
});

const resetPasswordFaculty = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const user = await Faculty.findOne({ insId: req.params.id });

  if (user) {
    user.password = password;
    user.save();

    res.send("Password Updated").status(200);
  }
});

export {
  userLogin,
  userRegister,
  getAllFeculty,
  deleteFaculty,
  addStudent,
  getUserProfile,
  resetPasswordFaculty,
};
