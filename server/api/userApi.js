/**此代码是提供给前端使用的接口*/
var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
var request = require('request');
var syncRequest = require('sync-request');
// var bodyParser = require('body-parser');

// var app = express();

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
var isBlank = function(value){
    return value == undefined || value == "" || value == null || value == "null";
}
// 注册
router.post('/regist', (req, res) => {
    var data = {
        phoneNum: req.body.phoneNum,
        password: req.body.password
    }
    conn.query($sql.user.selectByPhoneNum, [data.phoneNum], function(err, result) {
        // console.log(err,result);
        if(err) {
            jsonWrite(res, {
                code: 1,
                msg: "查询失败"
            })
            return;
        }
        if(result.length == 0) {
            // 插入数据库
            conn.query($sql.user.insert, [data.phoneNum, data.password], function(err, result) {
                jsonWrite(res, {
                    code: 0,
                    msg: "注册成功"
                })
            })
        } else {
            jsonWrite(res, {
                code: 2,
                msg: "该用户名已存在"
            })
        }
    })
});
// 登录
router.post('/login', (req, res) => {
    var data = {
        phoneNum: req.body.phoneNum,
        password: req.body.password
    }
    conn.query($sql.user.selectByPhoneNum, [data.phoneNum], function(err, result) {

        // 读取数据失败
        if(err) {
            jsonWrite(res, {
                code: 1,
                msg: "查询失败"
            })
            return;
        }
        if(result.length) {
            // console.log("phoneNum",result[0].phoneNum)
            if(data.phoneNum === result[0].phoneNum) {
                if(data.password === result[0].password) {
                    jsonWrite(res, {
                        code: 0,
                        msg: "登陆成功"
                    })
                    return;
                } else {
                    jsonWrite(res, {
                        code: 2,
                        msg: "密码错误"
                    })
                    return;
                }
            }
            jsonWrite(res, {
                code: 4,
                msg: "登陆失败, 请重新登录"
            })

        } else {
            jsonWrite(res, {
                code: 3,
                msg: "用户名不存在"
            })
            console.log("用户名不存在")
            return;
        }

    })
   
});


module.exports = router;