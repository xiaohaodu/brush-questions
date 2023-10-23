const db = require("../database/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

// exports.getPassage = (req,res) =>{
//     const sql = 'select * from questionbank where book=? and chapter=? order by id asc'
//     const page = req.query.page
//     const book =req.query.book
//     const chapter=req.query.chapter
//     console.log(chapter)
//     // console.log(page)
//     db.query(sql,[book,chapter],(err,results)=>{
//         if(err){
//             return res.my_send(err)
//         }
//         let result=[]
//         if(page != null){
//             for (let i=0;i<10;i++){
//                 result.push(results[page*10+i])
//             }
//         }else {
//             for (let i=0;i<10;i++){
//                 result.push(results[i])
//             }
//         }
//         return res.send({
//             status: 0,
//             length:results.length,
//             message:'success',
//             data: result
//         })
//     })
// }
//限制10个数据的写法

exports.getPassage = (req, res) => {
  const sql =
    "select * from questionbank where book=? and chapter=? order by id asc";
  const book = req.query.book;
  const chapter = req.query.chapter;
  if (chapter == "undefined") {
    return res.send({
      status: 1,
      message: "error，缺少参数",
    });
  }
  db.query(sql, [book, chapter], (err, result) => {
    if (err) {
      return res.my_send(err);
    }
    for (const i in result) {
      result[i].select = [];
      if (result[i].selectA !== "" && result[i].selectA !== null) {
        result[i].select.push(result[i].selectA);
      }
      if (result[i].selectB !== "" && result[i].selectB !== null) {
        result[i].select.push(result[i].selectB);
      }
      if (result[i].selectC !== "" && result[i].selectC !== null) {
        result[i].select.push(result[i].selectC);
      }
      if (result[i].selectD !== "" && result[i].selectD !== null) {
        result[i].select.push(result[i].selectD);
      }
      if (result[i].selectE !== "" && result[i].selectE !== null) {
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
      message: "success",
      data: result,
    });
  });
};
