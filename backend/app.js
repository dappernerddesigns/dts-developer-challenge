const express = require("express");
const app = express();
const apiRouter = require("./routers/apiRouter");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errors/errorHandlers");
app.use(express.json());
app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);
module.exports = app;
