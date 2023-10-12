const mysql = require('mysql2');

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'brush_question',
    password: 'Dn7nKsdSPEeEwZxe',
    database: 'brush_question'
});

// const db = mysql.createPool({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '187139',
//     database: 'mayuan'
// });

module.exports = db;