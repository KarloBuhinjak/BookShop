const express = require("express");
const app = express();
const port = 3000;
require("./config/mongoDB");
const errorMiddleware = require("./api/middlewares/errorMiddleware");
const bookRouter = require("./api/routes/bookRouter");
const userRouter = require("./api/routes/userRouter");
const verifyToken = require("./api/middlewares/verifyToken");
const verifyAdmin = require("./api/middlewares/verifyAdmin");

app.use(express.json());

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

app.use(loggingMiddleware);

app.use("/api/v1/books", verifyToken, verifyAdmin, bookRouter);
app.use("/api/v1/user", userRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
