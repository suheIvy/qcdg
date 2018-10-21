var sqlMap = {
    product: {//产品的sql语句们
        insert:'insert into product_list(proid,ydprice,proname,hothc,zimg,litpic,hotword,type,typeKey) values(?,?,?,?,?,?,?,?,?)',
        selectByProid:"select * from product_list where proid = ? and typeKey = ?",
        selectByType:"select * from product_list where type = ?",
        selectById:"select * from product_list where id = ?",
        selectAll:"select * from product_list"
    },
    pinglun:{//评论的sql语句们
    	insert:"insert into product_pinglun(PWriter,PContent,pcate,proid,proimg) values(?,?,?,?,?)",
        selectByProid:"select * from product_pinglun where proid = ?"
    },
    buy_option:{//购买选项的sql语句们
    	insert:"insert into product_buy_options(proid,short_title,mvalue,mshow,mtext,price,ydprice) values(?,?,?,?,?,?,?)",
    	selectByProid:"select * from product_buy_options where proid = ?"
    },
    product_detail:{//产品祥情
    	insert:"insert into product_details(proid,proname,pcate,price,ydprice,hcArr,infoimags,litpic,huodongTxt,newbannerimg,imageHtml) values(?,?,?,?,?,?,?,?,?,?,?)",
    	selectByProid:"select * from product_details where proid = ?"
    },
    user: { // 用户
        insert: "insert into users(phoneNum,password) values(?,?)",
        selectByPhoneNum: "select * from users where phoneNum = ?"
    }
}
module.exports = sqlMap;
