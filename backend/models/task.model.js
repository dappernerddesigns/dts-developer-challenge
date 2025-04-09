const db = require("../db/connection");

exports.fetchTasks = async () => {
  const { rows } = await db.query(`SELECT * FROM tasks`);
  return rows;
};

exports.addTask = async ({ title, description, status, due }) => {
  const queryStr = `INSERT INTO tasks(title, description,status,due) VALUES( $1,$2,$3,$4) RETURNING *`;
  const { rows } = await db.query(queryStr, [title, description, status, due]);
  return rows[0];
};
