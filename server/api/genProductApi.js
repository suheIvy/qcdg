/**此js代码是抓取数据 生成数据用的接口*/
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

//获取产品列表数据
router.get('/gen/productList', (req, res) => {
    var type = req.query.type;
    var typeKey = req.query.typeKey;
    console.log(type, typeKey);
    var insertSql = $sql.product.insert;
    var selectByProidSql = $sql.product.selectByProid;
    console.log(insertSql);
    console.log(selectByProidSql);
    // request('http://www.baidu.com', function (error, response, body) {
    //   console.log('error:', error); // Print the error if one occurred
    //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //   console.log('body:', body); // Print the HTML for the Google homepage.
    // });
    if(type && typeKey && type != "" && typeKey != ""){
        var forFunc = function(i){
            console.log("正在下载第",i,"页数据。");
            var formData = {
                jsonstr:'{"pagecount":20,"page":'+ i +',"pcate":"'+ type +'","pkey":"'+ typeKey +'","order":1}'
            };
            request.post({url:'http://dgapi.dangao.com/List/class_list', form: formData}, function(error, response, body){
              //console.log('error:', error);
              //console.log('statusCode:', response && response.statusCode);
              //console.log('body:', body);
              if(body != null && body != "null"){
                  var statusCode = response && response.statusCode;
                  console.log('error:', error," statusCode:",statusCode);
                  if((error == null || error == "null") && statusCode == 200){
                    var data = JSON.parse(body);
                    if(data){
                        console.log('查询出的数据条数:', data.length);
                        var saveFunc = function(data,dataKey){
                            var d = data[dataKey];
                            console.log("要保存的数据:", d);
                            if(d){
                                conn.query(selectByProidSql, [d.proid,typeKey], function(err, result) {
                                    if(result.length == 0){
                                        conn.query(insertSql, [d.proid,d.ydprice,d.proname,d.hothc,d.zimg,d.litpic,d.hotword,type,typeKey], function(err, result) {
                                            console.log("导入数据第",dataKey+1,"条数据。 "," error:"+err, "insertRows: "+result.affectedRows);
                                            saveFunc(data, dataKey+1);
                                        })
                                    }else{
                                        saveFunc(data, dataKey+1);
                                    }
                                })
                            }
                        }
                        saveFunc(data,0);
                    }
                  }
                  if(i<100){
                    forFunc(i+1);
                  }
              }else{
                console.log("结束，没有数据");
              }
            })
        }
        forFunc(0);
        jsonWrite(res, true);
    }else{
        jsonWrite(res, "参数type和key为空 type是列表大分类，typeKey是列表小分类 type=&typeKey=");
    }
});

router.get('/gen/productPinglun', (req, res) => {
    var forFunc = function(i){
        var insertSql = $sql.pinglun.insert;
        console.log("正在下载第",i,"页数据。");
        request.get({url:'http://dgapi.dangao.com/index.php/Product/getpinglun?jsonstr='+'{"p":'+i+',"pcount":20}'}, function(error, response, body){
            //console.log('error:', error);
            //console.log('statusCode:', response && response.statusCode);
            if(body != null && body != "null"){
                var statusCode = response && response.statusCode;
                console.log('error:', error," statusCode:",statusCode);
                if((error == null || error == "null") && statusCode == 200){
                    var data = JSON.parse(body);
                    var count = data.count;
                    data = data.data;
                    var saveFunc = function(data,dataKey){
                        var d = data[dataKey];
                        if(d){//当前页还有值继续插入
                            console.log(d.PWriter,d.PContent,d.pcate,d.proid,d.proimg);
                            conn.query(insertSql, [d.PWriter,d.PContent,d.pcate,d.proid,d.proimg], function(err, result) {
                                console.log("导入数据第",dataKey+1,"条数据。 "," error:"+err, "insertRows: "+result.affectedRows);
                                saveFunc(data, dataKey+1);//递归循环插入
                            })
                        }else{
                            if(i<=1000){//查询下一页
                                forFunc(i+1);
                            }
                        }
                    }
                    saveFunc(data,0);
                }
            }
        })
    }
    forFunc(0);
    jsonWrite(res, true);
});

router.get('/gen/productDetail', (req, res) => {
    var selectAllSql = $sql.product.selectAll;
    console.log(selectAllSql);
    var buyOptionInsertSql = $sql.buy_option.insert;
    console.log(buyOptionInsertSql);
    var productDetailInserSql = $sql.product_detail.insert;
    console.log(productDetailInserSql);
    conn.query(selectAllSql, [], function(err, result) {
        console.log(err,result.length);
        if(result.length > 0){
            //准备获取详情的，图片，购买选项，图片内容
            var forFunc = function(data,dataKey){
                let d=data[dataKey];
                if(d){
                    let proid=d.proid;
                    //console.log(proid,d);
                    var buyFunc=function(){
                        /***获取产品的购买选项，解析后并保存 begin***/
                        conn.query($sql.buy_option.selectByProid, [proid], function(err, result) {
                            if(result.length == 0){
                                let requestChiCun = syncRequest("GET",'http://dgapi.dangao.com/Product/getChiCun?jsonstr='+'{"proid":"'+proid+'"}');
                                let chiCunBody = requestChiCun.getBody().toString();
                                console.log("getChiCun",proid,chiCunBody);
                                if(chiCunBody){
                                    let dataBody = JSON.parse(chiCunBody);
                                    let saveFunc = function(data,key){
                                        let d=data[key];
                                        if(d){
                                            conn.query(buyOptionInsertSql, [proid,d.short_title,d.value,d.show,d.text,d.price,d.ydprice], function(err, result) {
                                                console.log("保存购买选项",key,err,result);
                                                saveFunc(data,key+1);
                                            })
                                        }else{
                                            detailFunc();
                                        }
                                    }
                                    if(dataBody!=null&&dataBody!="null"){
                                        saveFunc(dataBody,0);
                                    }else{
                                        detailFunc();
                                    }
                                }else{
                                    detailFunc();
                                }
                            }else{
                                detailFunc();
                            }
                        })
                        /***获取产品的购买选项，解析后并保存 end***/
                    }
                    var detailFunc=function(){
                        /***获取产品的产品详情，解析后并保存 begin***/
                        conn.query($sql.product_detail.selectByProid, [proid], function(err, result) {
                            if(result.length == 0){
                                let htmlImage = syncRequest("GET",'http://dgapi.dangao.com/index.php/Product/getProImg/proid/' + proid);
                                let htmlImageBody = htmlImage.getBody().toString();
                                htmlImageBody = htmlImageBody.slice(htmlImageBody.indexOf("<style>"), htmlImageBody.indexOf("</html>"));
                                let requestProductDetail = syncRequest("GET",'http://dgapi.dangao.com/index.php/Product?jsonstr='+'{"proid":"'+proid+'"}');
                                let productDetailBody = requestProductDetail.getBody().toString();
                                console.log("Product",proid,productDetailBody);
                                if(productDetailBody){
                                    let d = JSON.parse(productDetailBody);
                                    if(d){
                                        conn.query(productDetailInserSql, [d.proid,d.proname,d.pcate,d.price,d.ydprice,JSON.stringify(d.hcArr),JSON.stringify(d.infoimgs),d.litpic,d.huodongTxt,d.newbannerimg,htmlImageBody], function(err, result) {
                                            console.log("保存产品祥情",err,result);
                                            forFunc(data,dataKey+1);
                                        })
                                    }else{
                                        forFunc(data,dataKey+1);
                                    }
                                }else{
                                    forFunc(data,dataKey+1);
                                }
                            }else{
                                forFunc(data,dataKey+1);
                            }
                        })
                        /***获取产品的产品详情，解析后并保存 end***/
                    }
                    buyFunc();
                    //console.log(2222222222222222);
                    
                }else{
                    console.log("运行结束");
                }
            }
            forFunc(result,0);
        }
    })
    jsonWrite(res, true);
});

module.exports = router;