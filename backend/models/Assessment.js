import mongoose from "mongoose";
const singleAssessmentSchema = mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courses",
    required: true,
  },
  assessment: {
    type: String,
    required: true,
  },
  assessmentType: {
    type: String,
    required: true,
  },
  fullMarks: {
    type: Number,
    required: true,
  },
  weightage: {
    type: Number,
    required: true,
  },
  clo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SingleClo",
    required: true,
  },
});

const assessmentSchema = mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courses",
    required: true,
  },
  assessments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SingleAssessment",
      required: true,
    },
  ],

  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
    },
  ],
});

const SingleAssessment = mongoose.model(
  "SingleAssessment",
  singleAssessmentSchema
);
const Assessment = mongoose.model("Assessment", assessmentSchema);
export { Assessment, SingleAssessment };
