<template>
    <div class="home-list">
        <div class="list-prepart" v-for="(item, index) in home_list" :key="index">
            <h2>{{item.adName}}</h2>
            <ul>
                <router-link v-for="(child_item, child_index) in item.proArr" :key="child_index" :to="'/product/' + child_item.proid" tag="li">
                    <img :src="child_item.zimg" alt="">
                    <p class="intro">{{child_item.hothc}}</p>
                    <p class="title">{{child_item.proname}}</p>
                    <p class="price">￥{{child_item.price}}</p>
                </router-link>
            </ul>
            
            <div class="line"></div>
            <GoTop></GoTop>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    // 商品列表
    .home-list {
        padding: 0 10px;
        .list-prepart {
            margin-top: 10px;
            h2 {
                text-align: center;
                font-size: 18px;
                height: 40px;
                line-height: 40px;
                position: relative;
                &::before, &::after {
                            content: "";
                            width: 20px;
                            height: 40px;
                            background: url("https://m.dangao.com/Tpl/default/Public/images/new_title_ico.gif") no-repeat;
                            position: absolute;
                            top: 10px;
                            left: 120px;
                            background-size: 100%;
                        }
                        &::after {
                            top: 10px;
                            left: 250px;
                        }           
            }
            ul{
                &:after {
                    display: block;
                    content: "";
                    clear: both;
                }
                li {
                    text-align: center;
                    width: 50%;
                    float: left;
                    font-size: 14px;
                    img {
                        width: 96%;
                        vertical-align: middle;
                    }
                    .intro {
                        display: inline-block;
                        width: 92.6%;
                        height: 40px;
                        line-height: 40px;
                        padding-left: 6px;
                        color: #9F8A60;
                        background: #F1ECE2;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        text-align: left;
                    }
                    .title {
                        line-height: 30px;
                        padding-left: 6px;
                        width: 96%;
                        text-align: left;
                    }
                    .price {
                        color: #b4282d;
                        font-size: 16px;
                        line-height: 20px;
                        padding-left: 6px;
                        width: 96%;
                        text-align: left;
                        span {
                            padding: 2px 5px;
                            border: 1px solid #b4282d;
                            float: right;
                            font-size: 12px;
                            margin: 0 4px 2px 0;
                        }
                    }
                }
            }
            .line {
                width: 100%;
                height: 10px;
                margin: 20px -10px 0 0;
                background: #efefef;
            }
        }
    }
</style>
<script>
import GoTop from "./Gotop.vue";
export default {
    components: {
        GoTop
    },
    props: ["home_list"],
    methods: {
        /*addCar(product, e) {
            e.preventDefault();
            // 向store提交同步消息 提交数据
            this.$store.commit("addProduct", product)
            // if(this.$store.state.products.id === product.id) {
            // }
        }*/
    }
}
</script>