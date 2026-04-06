require("dotenv").config();
const express = require("express");
const app = express();

const connectDB = require("./db/connect");

//routes
const authorRouter = require("./routes/authorRoute");
const bookRouter = require("./routes/bookRoute");
const studentRouter = require("./routes/studentRoute");
const authRouter = require("./routes/authRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const overdueCheck = require("./cronJobs");
const cookieParser = require("cookie-parser");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cookieParser(process.env.JWT_SECRET));

const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

app.use(express.json());

app.use("/api/v1/authors", authorRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    overdueCheck.start();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
