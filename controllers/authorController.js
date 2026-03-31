const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createAuthor = async (req, res) => {
  res.send("Create Author");
};

const getAllAuthors = async (req, res) => {
  res.send("Get All Authors");
};

const getSingleAuthor = async (req, res) => {
  res.send("Get Single Author");
};

const updateAuthor = async (req, res) => {
  res.send("Update Author");
};

const deleteAuthor = async (req, res) => {
  res.send("Delete Author");
};

module.exports = {
  createAuthor,
  getAllAuthors,
  getSingleAuthor,
  updateAuthor,
  deleteAuthor,
};
