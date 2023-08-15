import mongoose from "mongoose";

const singlePloSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
});

const ploSchema = mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
    },
    plos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SinglePlo",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const SinglePlo = mongoose.model("SinglePlo", singlePloSchema);
const PLOs = mongoose.model("Plos", ploSchema);
export { PLOs, SinglePlo };
