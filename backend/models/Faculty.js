import mongoose from "mongoose";
import bcrypt from "bcrypt";
const facultySchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    insId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
facultySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

facultySchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Faculty = mongoose.model("faculty", facultySchema);
export default Faculty;
