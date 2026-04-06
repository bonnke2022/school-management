const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      validate: {
        validator: validator.isStrongPassword,
        message:
          "Password must contain uppercase, lowercase, number and symbol",
      },
    },
  },
  { timestamps: true },
);

AttendantSchema.pre("save", function () {
  this.staffId = this._id;
});

AttendantSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AttendantSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Attendant", AttendantSchema);
