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

exports.fetchTask = async (id) => {
  const { rows } = await db.query(`SELECT * FROM tasks WHERE id=$1`, [id]);
  if (rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Task Not Found" });
  }
  return rows[0];
};
