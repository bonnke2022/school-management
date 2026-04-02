const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
    },
    studentId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Student", StudentSchema);
