const db = require('../database');
const qs = require('qs');

exports.postWrongQuestion = (req, res) => {
    const data = qs.parse(req.body);
    let values = [];
    for (const key in data) {
        values.push([parseInt(data[key].user_id), parseInt(data[key].id), data[key].book, data[key].chapter, data[key].question_type, data[key].question, data[key].select[0], data[key].select[1], data[key].select[2] ? data[key].select[2] : '', data[key].select[3] ? data[key].select[3] : '', data[key].select[4] ? data[key].select[4] : '', data[key].isSelect]);
    }
    if (values.length <= 0) {
        return;
    }
    const sql = "replace into wrongquestion(user_id,question_id,book,chapter,question_type,question,selectA,selectB,selectC,selectD,selectE,isSelect) values ?";
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.log(err);
            return res.my_send(err);
        }
        return res.send({
            status: 0,
            message: 'success',
            data: values
        });
    });
};

exports.deleteWrongQuestion = (req, res) => {
    const data = qs.parse(req.body);
    const values = { question_id: [], user_id: [] };
    for (const key in data) {
        values.question_id.push(data[key].question_id);
        values.user_id.push(data[key].user_id);
    }
    if (values.length <= 0) {
        return;
    }
    const sql = `delete from wrongquestion where user_id in (${values.user_id}) and question_id in (${values.question_id})`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.my_send(err);
        }
        return res.send({
            status: 0,
            message: 'success',
            data: values
        });
    });
};

exports.getWrongQuestion = (req, res) => {
    const sql = 'select * from wrongquestion where user_id=? and book=? and chapter=? order by user_id,question_id asc';
    const book = req.query.book;
    const user_id = req.query.id;
    const chapter = req.query.chapter;
    // console.log(chapter)
    // console.log(book, user_id, chapter);
    db.query(sql, [user_id, book, chapter], (err, result) => {
        if (err) {
            console.log(err);
            return res.my_send(err);
        }
        for (const i in result) {
            result[i].select = [];
            if (result[i].selectA !== '' && result[i].selectA !== null) {
                result[i].select.push(result[i].selectA);
            }
            if (result[i].selectB !== '' && result[i].selectB !== null) {
                result[i].select.push(result[i].selectB);
            }
            if (result[i].selectC !== '' && result[i].selectC !== null) {
                result[i].select.push(result[i].selectC);
            }
            if (result[i].selectD !== '' && result[i].selectD !== null) {
                result[i].select.push(result[i].selectD);
            }
            if (result[i].selectE !== '' && result[i].selectE !== null) {
                result[i].select.push(result[i].selectE);
            }
            delete result[i].selectA;
            delete result[i].selectB;
            delete result[i].selectC;
            delete result[i].selectD;
            delete result[i].selectE;
        }
        return res.send({
            status: 0,
            length: result.length,
            message: 'success',
            data: result
        });
    });
};