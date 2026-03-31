const express = require("express");
const router = express.Router();

const {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

router.route("/").post(createBook).get(getAllBooks);
router.route("/:id").get(getSingleBook).patch(updateBook).delete(deleteBook);

module.exports = router;
