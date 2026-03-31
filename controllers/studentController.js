const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createStudent = async (req, res) => {
  res.send("create student");
};

const getAllStudents = async (req, res) => {
  res.send("get all Students");
};

const getSingleStudent = async (req, res) => {
  res.send("get single student");
};

module.exports = { createStudent, getAllStudents, getSingleStudent };
