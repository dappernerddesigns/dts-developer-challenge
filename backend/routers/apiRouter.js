const apiRouter = require("express").Router();
const taskRouter = require("./taskRouter");

apiRouter.get("/", (req, res) => {
  res.status(200).send({ ok: true });
});

apiRouter.use("/tasks", taskRouter);

module.exports = apiRouter;
