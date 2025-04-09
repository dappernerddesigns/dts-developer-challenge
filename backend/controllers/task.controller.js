const { fetchTasks, addTask } = require("../models/task.model");

exports.getAllTasks = async (req, res) => {
  const tasks = await fetchTasks();

  res.status(200).send({ tasks });
};

exports.postTask = async (req, res, next) => {
  try {
    const task = await addTask(req.body);
    res.status(201).send({ task });
  } catch (err) {
    next(err);
  }
};
