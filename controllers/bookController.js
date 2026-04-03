const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Book = require("../models/Book");
const Student = require("../models/Student");
const Attendant = require("../models/Attendant");

const createBook = async (req, res) => {
  const { title, isbn, authors } = req.body;
  if (!title || !isbn) {
    throw new CustomError.BadRequestError("Please provide a title and isbn");
  }
  const book = await Book.create({
    title,
    isbn,
    authors,
  });
  res.status(StatusCodes.CREATED).json({ book });
};

const getAllBooks = async (req, res) => {
  const books = await Book.find({}).populate("authors");
  res.status(StatusCodes.OK).json({ books, count: books.length });
};

const getSingleBook = async (req, res) => {
  const { id: bookId } = req.params;
  const book = await Book.findById(bookId).populate("authors");
  if (!book) {
    throw new CustomError.NotFoundError(`No book with id: ${bookId}`);
  }
  res.status(StatusCodes.OK).json({ book });
};

const updateBook = async (req, res) => {
  const { id: bookId } = req.params;
  const { title, isbn, authors } = req.body;
  const book = await Book.findOne({ _id: bookId }).populate("authors");
  if (!book) {
    throw new CustomError.NotFoundError(`No book with id: ${bookId}`);
  }
  if (title) book.title = title;
  if (isbn) book.isbn = isbn;
  if (authors) book.authors = authors;
  await book.save();
  res.status(StatusCodes.OK).json({ book });
};

const deleteBook = async (req, res) => {
  const { id: bookId } = req.params;
  const book = await Book.findOneAndDelete(bookId);
  if (!book) {
    throw new CustomError.NotFoundError(`No book with id: ${bookId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Success!!! Book removed." });
};

const borrowBook = async (req, res) => {
  const { id: bookId } = req.params;
  const book = await Book.findById({ _id: bookId });
  if (!book) {
    throw new CustomError.NotFoundError(`No book with id: ${bookId}`);
  }

  // book status
  if (book.status === "OUT") {
    throw new CustomError.BadRequestError("Book is not available");
  }

  const { studentId, attendantId } = req.body;
  if (!studentId || !attendantId) {
    throw new CustomError.BadRequestError(
      "Please provide studentId and attendantId",
    );
  }

  const student = await Student.findById({ studentId });
  if (!studentId) {
    throw new CustomError.NotFoundError(`No student with id: ${studentId}`);
  }
  const attendant = await Attendant.findById({ attendantId });
  if (!attendantId) {
    throw new CustomError.NotFoundError(`No attendant with id: ${attendantId}`);
  }

  book.borrowedBy = student._id;
  book.issuedBy = attendant._id;
  book.status = "OUT";
  book.returnDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
  await book.save();
  res.status(StatusCodes.OK).json({ msg: "Book has been given out" });
};

module.exports = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  borrowBook,
};
