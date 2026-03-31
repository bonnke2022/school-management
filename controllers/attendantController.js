const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createAttendant = async (req, res) => {
  res.send("create attendant");
};

const getAllAttendants = async (req, res) => {
  res.send("get all attendants");
};

module.exports = { createAttendant, getAllAttendants };
