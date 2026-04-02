const mongoose = require("mongoose");

const AttendantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    staffId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Attendant", AttendantSchema);
