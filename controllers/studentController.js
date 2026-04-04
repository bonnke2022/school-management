const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Student = require("../models/Student");

const createStudent = async (req, res) => {
  const { name, email } = req.body;

  const student = await Student.create({ name, email });
  res.status(StatusCodes.CREATED).json({ student });
};

const getAllStudents = async (req, res) => {
  const students = await Student.find({});
  res.status(StatusCodes.OK).json({ students, count: students.length });
};

const getSingleStudent = async (req, res) => {
  const { id: studentId } = req.params;
  const student = await Student.findById(studentId);
  if (!student) {
    throw new CustomError.NotFoundError(`No student with id ${studentId}`);
  }
  res.status(StatusCodes.OK).json({ student });
};

module.exports = { createStudent, getAllStudents, getSingleStudent };
