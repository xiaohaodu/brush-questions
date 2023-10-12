const express = require("express");

const app = express();

const joi = require('joi');

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use('/apidoc', express.static('apidoc'));
app.use('/', express.static('apidoc'));
// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
    // status 默认值为 1，表示失败的情况
    // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
    res.my_send = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        });
    };
    next();
});

// 一定要在路由之前配置解析 Token 的中间件
const { expressjwt: jwt } = require('express-jwt');
const config = require('./config');

app.use(jwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({ path: /^\/(user|apidoc)/ }));

const userRouter = require('./router/user');

app.use('/user', userRouter);

const userinfoRouter = require('./router/userinfo');
app.use('/userinfo', userinfoRouter);

const passage = require('./router/passage');
app.use('/passages', passage);

const books = require('./router/directory');
app.use(books);

const book = require('./router/book');
app.use('/book', book);

const wrongQuestion = require('./router/wrongQuestion');
app.use(wrongQuestion);

// 定义错误级别的中间件
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.my_send(err);
    // 身份认证失败后的错误
    if (err.name === 'UnauthorizedError') return res.my_send('身份认证失败');
    // 未知的错误
    res.my_send(err);
});

app.listen(8090, () => {
    console.log('api server running at http://127.0.0.1:8090');
});