<template>
    <div class="me">
        <div class="header">
            <img src="https://m.dangao.com/Tpl/default/Public/images/usercenter/usertouxiang.png" alt="">
            <span class="name">哎呀</span>
            <a href=""><img src="https://m.dangao.com/Tpl/default/Public/images/usercenter/edituser.png" alt=""></a>
            <div class="jfhb">
                <span class="jf">当前积分： <i>0</i></span>
                <span class="hb">虚拟货币： <i>0</i></span>
            </div>
        </div>
        <ul class="order-classify">
            <li v-for="(item, index) in order_classify" :key="index">
                <img :src="item.img" alt="">
                <p>{{item.text}}</p>
            </li>
        </ul>
        <ul class="set-anything">
            <li v-for="(item, index) in set_anything" :key="index">
                <img :src="item.img" alt="">
                <span>{{item.text}}</span>
            </li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
    .me {
        padding: 50px 0;
        background: #EDEDED;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        .header {
            height: 120px;
            padding: 10px 20px;
            background: url("https://m.dangao.com/Tpl/default/Public/images/usercenter/usercenter_top_bg.png");
            img {
                width: 70px;
                height: 70px;
                vertical-align: middle;

            }
            .name {
                display: inline-block;
                margin-left: 20px;
                color: #fff;
            }
            a {
                display: inline-block;
                width: 20px;
                height: 20px;
                margin-left: 10px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .jfhb {
                margin-top: 16px;
                span {
                    display: inline-block;
                    width: 40%;
                    line-height: 30px;
                    color: #fff;
                    border-radius: 15px;
                    text-align: center;
                    font-size: 14px;
                }
                i {
                    color: red;
                    font-style: normal;
                }
                .jf {
                    margin-right: 20%;
                    background: #F5BE01;
                }
                .hb {
                    background: #FF8448;
                }
            }
        }
        .order-classify {
            height: 90px;
            background: #fff;
            padding: 10px 0;
            border-bottom: 1px solid #aaa;
            li {
                float: left;
                width: 33.33%;
                text-align: center;
                border-right: 1px solid #ccc;
                box-sizing: border-box;
                padding: 10px 0;
                &:last-child {
                    border-right: none;
                }
                img {
                    width: 40px;
                    height: 40px;
                }
                p {
                    font-size: 16px;
                    line-height: 24px;
                    color: #777;
                }
            }
        }
        .set-anything {
            background: #fff;
            margin-top: 20px;
            border-top: 1px solid #aaa;
            border-bottom: 1px solid #aaa;

            li {
                img {
                    vertical-align: middle;
                    width: 40px;
                    height: 40px;
                }
                span {
                    display: inline-block;
                    width: 85%;
                    margin-left: 20px;
                    font-size: 14px;
                    font-weight: bold;
                    color: #666;
                    line-height: 60px;
                    border-bottom: 1px solid #ccc;
                    background: url("https://m.dangao.com/Tpl/default/Public/images/usercenter/userrightico.png") no-repeat right center;
                    background-size: 5%;
                }
                &:last-child span {
                    border-bottom: none;
                }
            }
        } 
    }
</style>
<script>
export default {
    data() {
        return {
            order_classify: [
                {text: "待付款订单", img: "https://m.dangao.com/Tpl/default/Public/images/usercenter/dfk.png"},
                {text: "已取消订单", img: "https://m.dangao.com/Tpl/default/Public/images/usercenter/wcdd.png"},
                {text: "全部订单", img: "https://m.dangao.com/Tpl/default/Public/images/usercenter/qbdd.png"}
            ],
            set_anything: [
                {text: "修改个人信息", img: "https://m.dangao.com/Tpl/default/Public/images/usercenter/editico.png"},
                {text: "收货地址管理", img: "https://m.dangao.com/Tpl/default/Public/images/usercenter/shouhuoico.png"},
                {text: "修改密码", img: "https://m.dangao.com/Tpl/default/Public/images/usercenter/passeditico.png"}
            ]
        }
    }
}
</script>