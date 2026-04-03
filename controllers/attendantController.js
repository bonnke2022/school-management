const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Attendant = require("../models/Attendant");

const createAttendant = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new CustomError.BadRequestError("Please provide a name");
  }

  const attendant = await Attendant.create({ name });
  res
    .status(StatusCodes.CREATED)
    .json({ attendant, msg: "Attendant created successfully" });
};

const getAllAttendants = async (req, res) => {
  const attendants = await Attendant.find({});
  res.status(StatusCodes.OK).json({ attendants, count: attendants.length });
};

module.exports = { createAttendant, getAllAttendants };
