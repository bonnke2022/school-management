require("dotenv").config();
const express = require("express");
const app = express();

const connectDB = require("./db/connect");

//routes
const authorRouter = require("./routes/authorRoute");
const bookRouter = require("./routes/bookRoute");
const studentRouter = require("./routes/studentRoute");
const attendantRouter = require("./routes/attendantRoute");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

app.use(express.json());

app.use("/api/v1/authors", authorRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/attendants", attendantRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
