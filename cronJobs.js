//Overdue checks
const nodeCron = require("node-cron");
const Book = require("./models/Book");

// Schedule a job that runs everyday at midnight "0 0 * * *"
const overdueCheck = nodeCron.schedule("0 0 * * *", async () => {
  try {
    const books = await Book.find({
      status: "OUT",
      returnDate: { $lt: new Date() },
    });
    for (const book of books) {
      book.isOverdue = true;
      await book.save();
    }
    console.log(
      `Overdue check complete. ${books.length} books marked as overdue`,
    );
  } catch (error) {
    console.log("Overdue check failed", error);
  }
});

module.exports = overdueCheck;
