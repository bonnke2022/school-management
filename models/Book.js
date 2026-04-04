const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    isbn: {
      type: String,
      unique: true,
    },
    authors: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Author",
      },
    ],
    status: {
      type: String,
      enum: ["IN", "OUT"],
      default: "IN",
    },
    borrowedBy: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
    },
    issuedBy: {
      type: mongoose.Types.ObjectId,
      ref: "Attendant",
    },
    returnDate: {
      type: Date,
    },
    isOverdue: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Book", BookSchema);
