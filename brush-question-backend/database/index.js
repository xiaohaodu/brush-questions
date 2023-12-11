const mysql = require("mysql2");

const DBBuilder = () => {
  if (process.env.NODE_ENV === "production") {
    return mysql.createPool({
      host: "brush-question-mysql",
      user: "root",
      password: "187139",
      database: "brush-question",
    });
  } else {
    return mysql.createPool({
      host: "127.0.0.1",
      user: "root",
      password: "187139",
      database: "mayuan",
    });
  }
};
const db = DBBuilder();
module.exports = db;
