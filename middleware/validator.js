const { body, validationResult } = require("express-validator");
const CustomError = require("../errors");

const validateStudent = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError.BadRequestError(errors.array()[0].msg);
    }
    next();
  },
];

const validateAuthor = [
  body("name").notEmpty().withMessage("name is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError.BadRequestError(errors.array()[0].msg);
    }
    next();
  },
];

const validateAttendant = [
  body("name").notEmpty().withMessage("name is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError.BadRequestError(errors.array()[0].msg);
    }
    next();
  },
];

const validateBook = [
  body("title").notEmpty().withMessage("title is required"),
  body("isbn").notEmpty().withMessage("isbn is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError.BadRequestError(errors.array()[0].msg);
    }
    next();
  },
];

const validateBorrowBook = [
  body("studentId").notEmpty().withMessage("studentId is required"),
  body("attendantId").notEmpty().withMessage("attendant is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError.BadRequestError(errors.array()[0].msg);
    }
    next();
  },
];

module.exports = {
  validateStudent,
  validateAuthor,
  validateAttendant,
  validateBook,
  validateBorrowBook,
};
