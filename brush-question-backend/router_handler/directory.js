const db = require("../database");

exports.books = (req, res) => {
    const sql = 'select id,book,chapter from directory where book=? order by id asc';
    const book = req.query.book;
    db.query(sql, book, (err, result) => {
        if (err) {
            console.log(err);
            return res.my_send(err);
        }
        const _result = {};
        _result.id = 0;
        _result.book = book;
        _result.chapters = [];
        for (let i in result) {
            _result.chapters.push({ id: i, chapter: result[i].chapter });
        }
        return res.send({
            status: 0,
            message: 'success',
            data: _result
        });
    });
};