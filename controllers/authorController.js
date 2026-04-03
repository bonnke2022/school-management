const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Author = require("../models/Author");

const createAuthor = async (req, res) => {
  const { name, bio } = req.body;
  if (!name) {
    throw new CustomError.BadRequestError("Name is required!!");
  }
  const author = await Author.create({ name, bio });
  res
    .status(StatusCodes.CREATED)
    .json({ author, msg: "Author created successfully" });
};

const getAllAuthors = async (req, res) => {
  const authors = await Author.find({});
  res.status(StatusCodes.OK).json({ authors, count: authors.length });
};

const getSingleAuthor = async (req, res) => {
  const { id: authorId } = req.params;
  const author = await Author.findById(authorId);
  if (!author) {
    throw new CustomError.NotFoundError(`No author with id: ${authorId}`);
  }
  res.status(StatusCodes.OK).json({ author });
};

const updateAuthor = async (req, res) => {
  const { id: authorId } = req.params;
  const { name, bio } = req.body;
  const author = await Author.findOne({ _id: authorId });

  if (!author) {
    throw new CustomError.NotFoundError(`No author with id: ${authorId}`);
  }
  author.name = name;
  author.bio = bio;
  await author.save();
  res.status(StatusCodes.OK).json({ author });
};

const deleteAuthor = async (req, res) => {
  const { id: authorId } = req.params;
  const author = await Author.findOneAndDelete({ _id: authorId });
  if (!author) {
    throw new CustomError.NotFoundError(`No author with id: ${authorId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Success!!! Author removed." });
};

module.exports = {
  createAuthor,
  getAllAuthors,
  getSingleAuthor,
  updateAuthor,
  deleteAuthor,
};
