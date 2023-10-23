const db = require("../database");

exports.getBook = (req, res) => {
  const book = "select id,book,cover from book order by id asc";
  db.query(book, (err, result) => {
    if (err) {
      return res.my_send(err);
    }
    // console.log(result);
    return res.send({
      status: 0,
      message: "success",
      data: result,
    });
  });
};
