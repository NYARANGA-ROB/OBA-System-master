import mongoose from "mongoose";

const mapSchema = mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
      required: true,
    },

    map: [
      {
        clo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SingleClo",
          required: true,
        },
        plo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SinglePlo",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Maps = mongoose.model("maps", mapSchema);
export default Maps;
