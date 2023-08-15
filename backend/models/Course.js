import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    clo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clos",
    },
    plo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plos",
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("courses", courseSchema);

export default Course;
