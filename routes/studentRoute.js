const express = require("express");
const router = express.Router();

const {
  createStudent,
  getAllStudents,
  getSingleStudent,
} = require("../controllers/studentController");

router.route("/").post(createStudent).get(getAllStudents);
router.route("/:id").get(getSingleStudent);

module.exports = router;
