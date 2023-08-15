import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courses",
    required: true,
  },
  // marks: {
  //   type: Map,
  //   of: {
  //     clo: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "SingleClo",
  //       required: true,
  //     },
  //     marks: {
  //       type: Number,
  //     },
  //   },
  // },
  marks: [
    {
      clo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SingleClo",
        required: true,
      },
      marks: Number,
      dialect: String,
    },
  ],
});

const Student = mongoose.model("Students", studentSchema);

export default Student;
