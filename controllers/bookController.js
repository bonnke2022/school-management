const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createBook = async (req, res) => {
  res.send("create bookk");
};

const getAllBooks = async (req, res) => {
  res.send("get all books");
};

const getSingleBook = async (req, res) => {
  res.send("get single book");
};

const updateBook = async (req, res) => {
  res.send("update book");
};

const deleteBook = async (req, res) => {
  res.send("delete book");
};

module.exports = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
