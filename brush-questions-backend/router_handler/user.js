const db = require('../database/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * @api {post} /user/register 注册
 * @apiGroup users
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 * @apiParam {String} password_again 重复密码
 * */
exports.register = (req, res) => {
    const userinfo = req.body;
    const defaultAvater = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjc5ODMzNjAwNjU4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDE2MzggMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEyMDk2IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjMxOS45MjE4NzUiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNMTMwMy43MzMgODYwLjA0N2gtOTgwLjg1OWMtMzkuNTUxIDAtNzEuMTkyLTMxLjY0MS03MS4xOTItNzEuMTkydi01NTMuNzExYzAtMzkuNTUxIDMxLjY0MS03MS4xOTIgNzEuMTkyLTcxLjE5Mmg5ODAuODU5YzM5LjU1MSAwIDcxLjE5MiAzMS42NDEgNzEuMTkyIDcxLjE5MnY1NTMuNzExYzAgMzkuNTUxLTMxLjY0MSA3MS4xOTItNzEuMTkyIDcxLjE5MnpNMTMzNS4zNzQgMjM1LjE0NGMwLTIzLjczMS0xNS44Mi0zOS41NTEtMzkuNTUxLTM5LjU1MWgtOTcyLjk1Yy0xNS44MiAwLTMxLjY0MSAxNS44Mi0zMS42NDEgMzkuNTUxdjU1My43MTFjMCAyMy43MzEgMTUuODIgMzkuNTUxIDMxLjY0MSAzOS41NTFoOTgwLjg1OWMyMy43MzEgMCAzOS41NTEtMTUuODIgMzkuNTUxLTM5LjU1MS03LjkxMSAwLTcuOTExLTU1My43MTEtNy45MTEtNTUzLjcxMXpNMTIzMi41NDIgNzE3LjY2NGMtNjMuMjgxLTU1LjM3Mi0xMTAuNzQyLTEyNi41NjMtMTI2LjU2My0yMDUuNjY0LTcuOTExIDc5LjEwMi01NS4zNzIgMTU4LjIwMy0xMjYuNTYzIDIxMy41NzUtNy45MTEtNy45MTEtMTUuODItMjMuNzMxLTIzLjczMS0zMS42NDEgODcuMDEyLTYzLjI4MSAxMzQuNDczLTE3NC4wMjMgMTM0LjQ3My0yODQuNzY2di0xMTAuNzQyaDMxLjY0MXYxMTAuNzQyYzE1LjgyIDEzNC40NzMgNjMuMjgxIDIyMS40ODQgMTQyLjM4MyAyNjguOTQ1LTE1LjgyIDE1LjgyLTIzLjczMSAyMy43MzEtMzEuNjQxIDM5LjU1MXpNOTA4LjIyNiA2NzguMTE0bC0zMS42NDEtMjMuNzMxYzE1LjgyLTcuOTExIDE1LjgyLTIzLjczMSAxNS44Mi0zOS41NTF2LTE0Mi4zODNoLTU1LjM3MnYtMzEuNjQxaDg3LjAxMnYxNzQuMDIzYzIzLjczMS0xNS44MiA0Ny40NjEtMzkuNTUxIDc5LjEwMi02My4yODEgMCA3LjkxMSAwIDIzLjczMSA3LjkxMSAzMS42NDEtMzEuNjQxIDIzLjczMS01NS4zNzIgNDcuNDYxLTg3LjAxMiA3MS4xOTItNy45MTEgNy45MTEtMTUuODIgMTUuODItMTUuODIgMjMuNzMxek04NzYuNTg1IDMzMC4wNjZsMjMuNzMxLTIzLjczMWMyMy43MzEgMzEuNjQxIDQ3LjQ2MSA1NS4zNzIgNzEuMTkyIDc5LjEwMmwtMzEuNjQxIDIzLjczMWMtMTUuODItMzEuNjQxLTM5LjU1MS01NS4zNzItNjMuMjgxLTc5LjEwMnpNNzk3LjQ4MyA3MTcuNjY0Yy00Ny40NjEtNTUuMzcyLTc5LjEwMi0xMTguNjUzLTg3LjAxMi0xODkuODQ0LTE1LjgyIDcxLjE5Mi00Ny40NjEgMTQyLjM4My05NC45MjIgMTk3Ljc1NC03LjkxMS03LjkxMS0xNS44Mi0yMy43MzEtMjMuNzMxLTMxLjY0MSA2My4yODEtNjMuMjgxIDk0LjkyMi0xNTguMjAzIDk0LjkyMi0yNDUuMjE1aC02My4yODF2LTMxLjY0MWg2My4yODF2LTExOC42NTNoMzEuNjQxdjExOC42NTNoOTQuOTIydjMxLjY0MWgtOTQuOTIyYzcuOTExIDg3LjAxMiA0Ny40NjEgMTc0LjAyMyAxMDIuODMyIDIzNy4zMDUtNy45MTEgNy45MTEtMTUuODIgMjMuNzMxLTIzLjczMSAzMS42NDF6TTczNC4yMDIgMzQ1Ljg4NmwxNS44Mi0yMy43MzFjMjMuNzMxIDE1LjgyIDM5LjU1MSAzMS42NDEgNTUuMzcyIDQ3LjQ2MWwtMjMuNzMxIDIzLjczMS00Ny40NjEtNDcuNDYxek00MDkuODg1IDU4My4xOTJjMzEuNjQxIDAgNjMuMjgxIDAgOTQuOTIyLTcuOTExdi0zMS42NDFoLTg3LjAxMnYtMjMuNzMxaDg3LjAxMnYtMzkuNTUxaC01NS4zNzJ2Ny45MTFoLTIzLjczMXYtMTY2LjExNGgxODkuODQ0djE3NC4wMjNoLTMxLjY0MXYtMTUuODJoLTU1LjM3MnYzOS41NTFoNzkuMTAydjIzLjczMWgtNzkuMTAydjM5LjU1MWMzMS42NDEgMCA2My4yODEgMCA4Ny4wMTItNy45MTF2MjMuNzMxYy02My4yODEgMC0xMzQuNDczIDcuOTExLTE5Ny43NTQgMTUuODJsLTcuOTExLTMxLjY0MXpNNTA0LjgwNyAzNDUuODg2aC01NS4zNzJ2MTEwLjc0Mmg1NS4zNzJ2LTExMC43NDJ6TTUyOC41MzggNDU2LjYyOGg1NS4zNzJ2LTExMC43NDJoLTU1LjM3MnYxMTAuNzQyek01MzYuNDQ4IDQzMi44OThjNy45MTEtMjMuNzMxIDE1LjgyLTM5LjU1MSAxNS44Mi02My4yODFsMjMuNzMxIDcuOTExYzAgMjMuNzMxLTcuOTExIDM5LjU1MS0xNS44MiA2My4yODFsLTIzLjczMS03LjkxMXpNNDk2Ljg5NyA0MzIuODk4aC0yMy43MzFjLTcuOTExLTE1LjgyLTcuOTExLTM5LjU1MS0xNS44Mi01NS4zNzJsMjMuNzMxLTcuOTExYzAgMjMuNzMxIDcuOTExIDQ3LjQ2MSAxNS44MiA2My4yODF6TTQ1Ny4zNDYgNjM4LjU2M2MtNy45MTEgMjMuNzMxLTE1LjgyIDU1LjM3Mi0zMS42NDEgNzkuMTAybC0yMy43MzEtMTUuODJjMTUuODItMjMuNzMxIDIzLjczMS00Ny40NjEgMzEuNjQxLTcxLjE5MmwyMy43MzEgNy45MTF6TTUxMi43MTggNjkzLjkzNGwtMjMuNzMxIDcuOTExYy03LjkxMS0yMy43MzEtMTUuODItMzkuNTUxLTE1LjgyLTYzLjI4MWwyMy43MzEtNy45MTFjMCAyMy43MzEgNy45MTEgNDcuNDYxIDE1LjgyIDYzLjI4MXpNNjE1LjU1IDY0Ni40NzNsLTE1LjgyIDE1LjgyYy03LjkxMS0xNS44Mi0yMy43MzEtMzEuNjQxLTMxLjY0MS00Ny40NjFsMjMuNzMxLTE1LjgyIDIzLjczMSA0Ny40NjF6TTU2OC4wODggNjc4LjExNGwtMjMuNzMxIDcuOTExYy03LjkxMS0xNS44Mi0xNS44Mi0zOS41NTEtMjMuNzMxLTU1LjM3MmwyMy43MzEtNy45MTFjNy45MTEgMTUuODIgMTUuODIgMzEuNjQxIDIzLjczMSA1NS4zNzJ6IiBmaWxsPSIiIHAtaWQ9IjEyMDk3Ij48L3BhdGg+PC9zdmc+';
    if (!userinfo.username || !userinfo.password) {
        return res.my_send('用户名或密码不合法!');
    }

    const sqlStr = 'select * from users where username=?';
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) {
            return res.my_send(err, 0);
        }

        if (results.length > 0) {
            return res.my_send('用户名被占用，请更换其他用户名!');
        }
        userinfo.password = bcrypt.hashSync(userinfo.password, 10);

        const sql = 'insert into users set ?';

        db.query(sql, { username: userinfo.username, password: userinfo.password, user_pic: defaultAvater }, (err, results) => {
            if (err) {
                return res.my_send(err);
            }
            if (results.affectedRows !== 1) {
                return res.my_send('注册用户失败，请稍后再试！');
            }

        });
        return res.send('注册成功');
    });
};
/**
 * @api {post} /user/login 登录
 * @apiGroup users
 * @apiParam {String} username 用户名
 * @apiParam {String} password  密码
 * */
exports.login = (req, res) => {
    // 接收表单的数据
    const userinfo = req.body;
    // 定义 SQL 语句
    const sql = `select * from users where username=?`;
    // 执行 SQL 语句，根据用户名查询用户的信息
    db.query(sql, userinfo.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.my_send(err);
        // 执行 SQL 语句成功，但是获取到的数据条数不等于 1
        if (results.length !== 1) return res.my_send('登录失败！');

        // TODO：判断密码是否正确
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password);
        // console.log(userinfo.password)
        // console.log(results[0].password)
        // console.log(results[0].id)
        if (!compareResult) return res.my_send('密码错误！');

        // TODO：在服务器端生成 Token 的字符串
        const user = { ...results[0], password: '', user_pic: '' };
        // 对用户的信息进行加密，生成 Token 字符串
        // const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        const tokenStr = jwt.sign(user, config.jwtSecretKey);
        // 调用 res.send() 将 Token 响应给客户端
        res.send({
            status: 0,
            id: results[0].id,
            message: '登录成功！',
            token: 'Bearer ' + tokenStr,
        });
    });
};