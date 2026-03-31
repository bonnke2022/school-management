const express = require("express");
const router = express.Router();

const {
  createAttendant,
  getAllAttendants,
} = require("../controllers/attendantController");

router.route("/").post(createAttendant).get(getAllAttendants);

module.exports = router;
