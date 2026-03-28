const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  bio: {
    type: String,
  },
  createdAt: {
    type: mongoose.Types.ObjectId,
  },
});

module.exports = mongoose.model("Author", authorSchema);
