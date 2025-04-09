const taskRouter = require("express").Router();
const {
  getAllTasks,
  postTask,
  getTask,
} = require("../controllers/task.controller");

taskRouter.get("/", getAllTasks);
taskRouter.post("/", postTask);
taskRouter.get("/:id", getTask);
module.exports = taskRouter;
