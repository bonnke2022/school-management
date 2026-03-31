const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  isbn: {
    type: String,
    unique: true,
  },
  authors: {
    type: [mongoose.Types.ObjectId],
    ref: "Author",
    required: true,
  },
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
  createdAt: {
    type: mongoose.Types.ObjectId,
  },
});

module.exports = mongoose.model("Book", BookSchema);
