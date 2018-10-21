<template>
    <div class="product">
        <!-- <layer ref="layer"></layer> -->
        <Carousel :swiper_list="swiper_list"></Carousel>
        <div class="product-info">
            <div class="info">
                <h3 class="title">名称：{{product_info.title}}</h3>
                <p class="huodong">{{product_info.huodongTxt}}</p>
            </div>
            <div class="zhehou">
                <p class="discount">折后价</p>
                <p class="price">￥{{product_info.ydprice}}</p>
            </div>
        </div>
        <div class="product-line"></div>
        <!-- 选择尺寸 -->
        <div class="chosse-size">
            <h3>选择产品规格</h3>
            <!-- 购买选择尺寸弹出层 -->
            <ul id="changeSize">
                <li v-for="(item, index) in product_info.size" :key="index" @click="changeSize(item.ydprice, item.price, index)">{{item.short_title}}</li>
                <li @click="isShowSizeIntro">尺寸说明</li>
            </ul>
        </div>
        <!-- 尺寸说明 -->
        <div class="size-intro" v-show="showSizeIntro">
            <img src="https://m.dangao.com/Tpl/default/Public/images/cake_chicun.jpg" alt="">
        </div>
        <!-- 加入购车按钮 -->
        <div class="shopping-btn">
            <span class="add-shopping-car" @click="addProduct(product_info)">加入购物车</span>
            <span class="buy">立即购买</span>
        </div>
        <div class="product-line"></div>
        <!-- 商品参数 -->
       <!--  <div class="product-param" v-for>
           <h4>商品参数</h4>
           <p>原材料: {{ product_info.ycl }}</p>
           <p>蛋糕说：{{ product_info.dgs }}</p>
       </div> -->
        <!-- 详情 -->
        <div v-html="product_info.detail_html"></div>
        <!-- 评论 -->
        <div class="product-evaluate">
            <h2>最新评价</h2>
            <ul>
                <li v-for="(item, index) in evaluate" :key="index">
                    <img :src="item.proimg" alt="">
                    <div class="evaluate-content">
                        <p>
                            <span class="star"></span>
                            <span class="name">{{item.PWriter}}</span>
                        </p>
                        <p class="content">{{item.PContent}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <Gotop></Gotop>
    </div>
</template>
<style lang="scss" scoped>
.product {
    padding: 50px 0;

    .product-info {
        display: flex;
        padding: 10px;
        .info {
            flex: 1;
            .title {
                font-weight: normal;
                font-size: 16px;
                line-height: 30px;
            }
            .origin-price {
                font-size: 14px;
                text-decoration: line-through;
            }
            .huodong {
                color: #B4282D;
                font-size: 14px;
                line-height: 40px;
            }
        }
        .zhehou {
            width: 140px;
            text-align: center;
            border-left: 1px dashed #7f7f7f;
            color: #B4282D;
            p {
                font-size: 16px;
                line-height: 36px;
            }
            .price {
                font-size: 20px;
                font-weight: bold; 
            }
        }
    }
    .product-line {
        width: 100%;
        height: 10px;
        background: #efefef;
    }
    .chosse-size {
        padding: 10px;
        h3 {
            font-size: 16px;
            font-weight: normal;    
            line-height: 40px;
        }
        li {
            width: 22.4%;
            height: 30px;
            color: #666;
            font-size: 14px;
            line-height:30px;
            text-align: center;
            float: left;
            border: 1px solid #666;
            margin-right: 10px;
            margin-bottom: 10px;
            &:nth-child(4), 
            &:nth-child(8) {
                margin-right: 0;

            }
            &.size-active {
                color: red;
                border-color: red;
                background: url("https://m.dangao.com/Tpl/default/Public/2015images/chicun_onbg.png") no-repeat right bottom;
                background-size: 24%;
            }
        }
    }

    .size-intro {
        padding: 10px;
        // display: none;
        img {
            width: 100%;
        }
    }
    .shopping-btn {
        padding: 32px 10px 10px;
        span {
            display: inline-block;
            width: 49%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #fff;
        }
        .add-shopping-car {
            background: #FF9500;
            margin-right: 2%;
        }
        .buy {
            background: #F15352

        }
    }
    .product-param {
        padding: 10px;
        color: #666;
        line-height: 40px;
        border-bottom: 1px dashed #efefef;
        h4 {
            font-weight: normal;
            font-size: 16px;
            border-bottom: 1px dashed #efefef;

        }
        p {
            font-size: 14px;
            border-bottom: 1px dashed #efefef;
    
        }
    }
    .product-evaluate {
        padding: 10px;
        h2 {
            font-size: 18px;
            height: 40px;
            line-height: 40px;
            margin-bottom: 10px;
            border-bottom: 1px solid #efefef;
        }
        ul {
            padding-bottom: 100px;
            li {
                padding: 10px 0;
                border-bottom: 1px solid #efefef;
                display: flex;
                position: relative;
                img {
                    width: 60px;
                    height: 60px;
                    margin-right: 16px;
                }
                .evaluate-content {
                    p {
                        line-height: 30px;
                        font-size: 14px;
                        color: #777;
                        flex: 1;

                        &:after {
                            content: "";
                            display: block;
                            clear: both;
                        }
                        .star {
                            width: 100px;
                            height: 20px;
                            float: left;
                            background: url("https://m.dangao.com/Tpl/default/Public/images/xing.png") repeat-x center;
                            background-size: 20%;
                        }
                        .name {
                            position: absolute;
                            top: 10px;
                            right: 10px;
                        }
                    }
                    .content {
                        width: 94%;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                }
            }
        }
    }
}
</style>
<script>
import Carousel from "../components/Carousel.vue";
import Gotop from "../components/Gotop.vue";
import layer from "vue-layer";
export default {
    components: {
        Carousel,
        Gotop
    },
    data() {
        return {
            showSizeIntro: false,
            swiper_list: [],
            product_info: {
                title: "",
                origin_price: "",
                ydprice: "",
                huodongTxt: "",
                // ycl: "时令水果 奶油",
                // dgs: "一生只为你心动回旋， 真爱永不止息",
                size:[],
                detail_html: ``,
            },
            evaluate: []
        }
    },
    methods: {
        isShowSizeIntro() {
            this.showSizeIntro = !this.showSizeIntro;
        },
        changeSize(ydprice, price, index) {
            let changeSize = document.querySelector("#changeSize")
            let lis = changeSize.getElementsByTagName("li");
            this.product_info.ydprice = ydprice;
            // this.product_info.origin_price = parseInt(+price+price*0.4);
            for(var i = 0; i < lis.length; i++) {
                lis[i].className=""
            }
            lis[index].className = "size-active";
        },
        addProduct(product, pic) {
            let proid = this.$route.params.proid
            // console.log("aaa",proid)
            // 向store提交同步消息 提交数据
            // console.log(product);
            product.proid = proid
            product.pic = this.swiper_list[0];
            product.num = 1;

            if(this.$store.state.products.find(item => item.proid == product.proid)) {
                // 提示用户  
                this.$layer.open({
                    type: 0,
                    title: "温馨提示",
                    content: "该商品已经在购物车中啦~",
                    // area: 'auto',
                    // offset: 'auto',
                    // icon: -1,
                    // btn: '',
                    // time: 2,
                    // shade: true,
                    // yes: '',
                    // cancel: '',
                    // tips: [0,{}],//支持上右下左四个方向，通过1-4进行方向设定,可以设定tips: [1, '#c00']
                    // tipsMore: false,//是否允许多个tips
                    shadeClose: false,
                })
                // alert("已经加入过购物车");
                return;
            }
            // console.log("this", this.product)
            // this.
            this.$store.commit("addProduct", product)
        }
    },
    created() {
        let proid = this.$route.params.proid
        console.log("长度",proid.length)
        if(proid.length <= 5) {
            proid = 0+proid
        }
        // console.log(111, this.$route)
        console.log(111, proid)
        this.$http.get("http://localhost:8088/api/productApi/details?proid=" + proid)
            .then(({data}) => {
                console.log(data)
                let banner_img = JSON.parse(data.details[0].infoimags);
                this.swiper_list = banner_img;
                // console.log("detail_html", data.details[0].imageHtml)
                this.product_info.detail_html = data.details[0].imageHtml
                this.product_info.title = data.details[0].proname
                this.product_info.origin_price = +data.details[0].price+12
                this.product_info.ydprice = data.details[0].ydprice
                this.product_info.huodongTxt = data.details[0].huodongTxt
                this.product_info.size = data.buyOptions
                this.evaluate = data.pinglun
            })
        
    }

}
</script>