const express = require("express");
const app = express();
const port = 3000;
require("./config/mongoDB");
const errorMiddleware = require("./api/middlewares/errorMiddleware");
const bookRouter = require("./api/routes/bookRouter");

app.use(express.json());

app.use("/api/v1/books", bookRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
