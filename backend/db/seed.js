const format = require("pg-format");
const db = require("./connection.js");

const seed = async (tasks) => {
  await db.query(`DROP TABLE IF EXISTS tasks`);
  await db.query(`CREATE TABLE tasks(
        id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW())`);

  const formattedComments = tasks.map(
    ({ task_title, description, status, due }) => [
      task_title,
      description,
      status,
      due,
    ]
  );

  const queryStr = format(
    `INSERT INTO tasks(title, description,status,created_at) VALUES %L`,
    formattedComments
  );
  await db.query(queryStr);
};

module.exports = seed;
