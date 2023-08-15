import mongoose from "mongoose";

const singleCloSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
});

const cloSchema = mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
    },
    clos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SingleClo",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const SingleClo = mongoose.model("SingleClo", singleCloSchema);
const CLOs = mongoose.model("Clos", cloSchema);
export { CLOs, SingleClo };
