const express = require("express");
const router = express.Router();

const {
  createAuthor,
  getAllAuthors,
  getSingleAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");

router.route("/").post(createAuthor).get(getAllAuthors);
router
  .route("/:id")
  .get(getSingleAuthor)
  .patch(updateAuthor)
  .delete(deleteAuthor);

module.exports = router;
