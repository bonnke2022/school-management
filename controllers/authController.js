const CustomError = require("../errors");
const Attendant = require("../models/Attendant");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse, createTokenUser } = require("../utils");

const register = async (req, res) => {
  const { name, password } = req.body;

  const attendantAlreadyExists = await Attendant.findOne({ name, password });
  if (attendantAlreadyExists) {
    throw new CustomError.BadRequestError("Attendant already exists");
  }

  const attendant = await Attendant.create({ name, password });
  const tokenUser = createTokenUser(attendant);
  attachCookiesToResponse({ res, attendant: tokenUser });
  res
    .status(StatusCodes.CREATED)
    .json({ attendant: tokenUser, msg: "Attendant Registered !!!!" });
};

const login = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    throw new CustomError.BadRequestError("Please provide name and password");
  }

  const attendant = await Attendant.findOne({ name });
  if (!attendant) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await attendant.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const tokenUser = createTokenUser(attendant);
  attachCookiesToResponse({ res, attendant: tokenUser });
  res.status(StatusCodes.OK).json({ attendant: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "Attendant logged out successfully" });
};

const getAllAttendants = async (req, res) => {
  const attendants = await Attendant.find({});
  res.status(StatusCodes.OK).json({ attendants, count: attendants.length });
};

module.exports = { register, login, logout, getAllAttendants };
