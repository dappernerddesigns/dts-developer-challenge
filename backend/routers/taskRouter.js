const taskRouter = require("express").Router();
const { getAllTasks, postTask } = require("../controllers/task.controller");

taskRouter.get("/", getAllTasks);
taskRouter.post("/", postTask);
module.exports = taskRouter;
