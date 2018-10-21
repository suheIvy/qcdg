<template>
    <div class="shoppingcar">
        <div class="kongcar" v-show="!this.$store.state.products.length">
            <img src="https://m.dangao.com/Tpl/default/Public/images/cart_kong.png" alt="">
            <p>购物车还是空的，去挑几件中意的商品吧</p>
            <div class="btn"><a href="#/">开始购物</a></div>
        </div>
        <div class="shopping-product" v-show="this.$store.state.products.length">
            <ul class="product-list">
                <li v-for="(item, index) in this.$store.state.products" :key="index" v-show="item.num">
                    <img :src="item.pic" alt="">
                    <div class="content"> 
                        <p class="name">名称：{{item.title}}</p>
                        <p class="num">数量：<span @click="reduceNum(item)">-</span><i>{{item.num}}</i><span @click="addNum(item)">+</span></p>
                        <p class="size" v-if="item.size.length">尺寸：{{item.size[0].mtext}}</p>
                        <p class="price">价格：{{item.ydprice}}元</p>
                    </div>
                    <div class="delete" @click="deleteProduct(item)">删除商品</div>
                </li>
            </ul>
            <div class="pay-price">应付总额：<i>{{this.$store.state.price}}元</i><span></span></div>
            <div class="btns">
                <span class="continue"><a href="#/">继续购物</a></span>
                <span class="next" @click="jiesuan"><a href="jsvascript:void(0)">下一步</a></span>
            </div>
        </div>        
        
    </div>
</template>
<style lang="scss" scoped>
    .shoppingcar {
        padding: 50px 10px;
        .kongcar {
            padding-top: 50px;
            text-align: center;
            img {

            }
            p {
                font-weight: bold;
                font-size: 14px;
                line-height: 100px;
            }
            .btn a {
                display: inline-block;
                width: 100%;
                background: #FD4B4B;
                line-height: 40px;
                color: #fff;
            }
        }
        .shopping-product {
            .product-list {
                border-top: 1px solid #ccc;
                li {
                    padding: 10px 0;
                    border-bottom: 1px solid #ccc;
                    display: flex;
                    img {
                        width: 80px;
                        height: 80px;
                        border: 1px solid red;
                        margin-right: 10px;
                    }
                    .content {
                        flex: 1;
                        font-size: 14px;
                        line-height: 20px;
                        .num {
                            i {
                                color: red;
                                font-style: normal;
                                padding: 0 10px;
                            }
                            span{
                                display: inline-block;
                                width: 20px;
                                height: 20px;
                                text-align: center;
                                line-height: 20px;
                                border: 1px solid #eee;
                                color: #666;
                            }
                        }
                    }
                    .delete {
                        width: 80px;
                        height: 26px;
                        line-height: 26px;
                        color: #fff;
                        text-align: center;
                        font-size: 14px;
                        background: #FD4B4B;
                        border-radius: 4px;
                        margin-top: 26px;
                    }
                }
            }
            .pay-price {
                line-height: 30px;
                background: #ECEBE6;
                text-align: right;
                margin-top: 10px;
                padding: 0 10px;
                i {
                    font-style: normal;
                    font-size: 14px;
                    color: red;
                    font-weight: bold;
                }
            }
            .btns {
                margin-top: 30px;
                span a {
                    width: 49%;
                    text-align: center;
                    display: inline-block;
                    line-height: 40px;
                    color: #fff;
                    border-radius: 4px;
                }
                .continue a {
                    margin-right: 2%;
                    background: #6CB248;
                }
                .next a {
                    background: #FD4B4B;
                }
            }
        }
    }
</style>
<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        deleteProduct(item) {
            let productArr = this.$store.state.products;
            // let index = state.products.findIndex(item => item.proid == data.proid);
            console.log(222, productArr, item);
            this.$store.commit("deleteProduct", item);

        },
        addNum(item) {
            item.num++;
            this.$store.commit("addProduct", item);

        }, 
        reduceNum(item) {
            item.num--;
            this.$store.commit("reduceNum", item);
        },
        jiesuan() {
            // 判断是否登录， 未登录跳到个人， 登录。。。
        }
    },
    created() {
        console.log(111, this.$store.state.products);
    }
}
</script>