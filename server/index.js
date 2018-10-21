// node 后端服务器
//const demoApi = require('./api/demoApi');
const genProductApi = require('./api/genProductApi');
const productApi = require('./api/productApi');
const userApi = require('./api/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "*");//测试时使用*号允许跨哉
    if (req.method == 'OPTIONS') {
        /*让options请求快速返回*/
        res.sendStatus(200);
    } else {
        next();
    }
});
// 后端api路由
//app.use('/api/demo', demoApi);
// 后端api路由
app.use('/api/gen/product', genProductApi);
app.use('/api/productApi', productApi);
app.use('/api/userApi', userApi);

// 监听端口
app.listen(8088);
console.log('success listen at port:8088......');