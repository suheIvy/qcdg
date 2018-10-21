/**此代码是提供给前端使用的接口*/
var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
var request = require('request');
var syncRequest = require('sync-request');

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
//获取产品列表
//根据 产品分类 和 产品子分类获取
router.get('/list', (req, res) => {
	var type = req.query.type;
	var typeKey = req.query.typeKey;
	if(isBlank(type) || isBlank(typeKey)){
    	jsonWrite(res, "请求参数为空");
		return;
	}
	var pageNo = req.query.pageNo;
	var pageSize = req.query.pageSize;
	if(isBlank(pageNo)||pageNo-0<=0){
		pageNo=1;
	}
	if(isBlank(pageSize) || pageSize > 20){
		pageSize=10;
	}
	pageNo = (pageNo-1)*pageSize;
	console.log(type, typeKey, pageNo, pageSize);
	var limit = " limit "+pageNo+","+pageSize;
	var where = "";
	if(typeKey != "all"){
        where = " and typeKey = '" + typeKey+"'";
	}
    conn.query($sql.product.selectByType + where + limit, [type], function(err, result) {
    	console.log(141241414124+$sql.product.selectByType + where + limit);
        // console.log("查询产品列表","查询出的数据个数",result.length,result);
    	jsonWrite(res, result);
    })
});
//获取产品祥情
//根据 产品id获取 proid
//1 先查询祥情
//2 查询购买选项
//3 查询评论
router.get('/details', (req, res) => {
	var proid = req.query.proid;
	if(isBlank(proid)){
    	jsonWrite(res, "请求参数为空");
		return;
	}
	var data = {};
	//1 查询祥情
	var selectDetail = function(){
		//根据proid产品Id查询产品祥情
	    conn.query($sql.product_detail.selectByProid, [proid], function(err, result) {
	    	data.details=result;
    		console.log("查询产品祥情","查询出的数据个数",result.length,result);
	    	//调用查询选项
	    	selectBuyOption();
	    })
	}
	//2 查询购买选项
	var selectBuyOption=function(){
		//根据proid产品Id查询产品祥情
	    conn.query($sql.buy_option.selectByProid, [proid], function(err, result) {
	    	data.buyOptions=result;
    		console.log("查询产品购买选项","查询出的数据个数",result.length,result);
	    	//调用查询评论
	    	selectPinLun();
	    })
	}
	//3 查询评论
	var selectPinLun = function(){
		//根据proid产品Id查询产品祥情
	    conn.query($sql.pinglun.selectByProid, [proid], function(err, result) {
	    	data.pinglun=result;
    		console.log("查询产品评论","查询出的数据个数",result.length,result);
	    	//最后评论查询完将查询数据返回
	    	jsonWrite(res, data);
	    })
	}
	//上面的查询函数准备好后开始调用 查询祥情函数
	selectDetail();
});


module.exports = router;