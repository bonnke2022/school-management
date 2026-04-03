const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Book = require("../models/Book");
const Student = require("../models/Student");
const Attendant = require("../models/Attendant");
const Author = require("../models/Author");

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
  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // filtering
  const queryObject = {};
  // search by title
  if (req.query.title) {
    queryObject.title = { $regex: req.query.title, $options: "i" };
  }
  // search by author name
  if (req.query.author) {
    const authors = await Author.find({
      name: { $regex: req.query.author, $options: "i" },
    });
    const authorIds = authors.map((author) => author._id);
    queryObject.authors = { $in: authorIds };
  }

  const totalBooks = await Book.countDocuments(queryObject);

  const books = await Book.find(queryObject)
    .populate("authors")
    .populate("borrowedBy")
    .populate("issuedBy")
    .sort({ title: 1 })
    .skip(skip)
    .limit(limit);

  const totalPages = Math.ceil(totalBooks / limit);
  res.status(StatusCodes.OK).json({
    books,
    count: books.length,
    currentPage: page,
    totalPages,
    totalBooks,
  });
};

const getSingleBook = async (req, res) => {
  const { id: bookId } = req.params;
  const book = await Book.findById(bookId)
    .populate("authors")
    .populate("borrowedBy")
    .populate("issuedBy");
  if (!book) {
    throw new CustomError.NotFoundError(`No book with id: ${bookId}`);
  }
  res.status(StatusCodes.OK).json({ book });
};

const updateBook = async (req, res) => {
  const { id: bookId } = req.params;
  const { title, isbn, authors } = req.body;
  const book = await Book.findOne({ _id: bookId })
    .populate("authors")
    .populate("borrowedBy")
    .populate("issuedBy");
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
  const book = await Book.findById(bookId);
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

  const student = await Student.findById(studentId);
  if (!student) {
    throw new CustomError.NotFoundError(`No student with id: ${studentId}`);
  }
  const attendant = await Attendant.findById(attendantId);
  if (!attendant) {
    throw new CustomError.NotFoundError(`No attendant with id: ${attendantId}`);
  }

  book.borrowedBy = student._id;
  book.issuedBy = attendant._id;
  book.status = "OUT";
  book.returnDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
  await book.save();
  await book.populate(["authors", "borrowedBy", "issuedBy"]);
  res.status(StatusCodes.OK).json({ msg: "Book has been given out" });
};

const returnBook = async (req, res) => {
  const { id: bookId } = req.params;
  const book = await Book.findById(bookId);
  if (book.status === "IN") {
    throw new CustomError.NotFoundError(
      `No book with id: ${bookId} is currently borrowed`,
    );
  }
  book.borrowedBy = null;
  book.issuedBy = null;
  book.returnDate = null;
  book.status = "IN";
  await book.save();
  await book.populate(["authors", "borrowedBy", "issuedBy"]);
  res.status(StatusCodes.OK).json({ msg: "Book has been returned" });
};

module.exports = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
};
