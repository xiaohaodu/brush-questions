const mysql = require("mysql2");

// const db = mysql.createPool({
//   host: "127.0.0.1",
//   user: "root",
//   password: "187139",
//   database: "mayuan",
// });

const db = mysql.createPool({
  host: "brush-question-mysql",
  user: "root",
  password: "187139",
  database: "brush-question",
});

module.exports = db;
