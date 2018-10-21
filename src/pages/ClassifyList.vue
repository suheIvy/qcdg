<template>
    <div class="classify-list">

        <ul class="fenlei">
            <li v-for="(item, index) in typeTitle" :key="index" @click="changeRoute(item.childtype, $event)">{{item.name}}</li>
        </ul>
        <a href="javascript:void(0)" class="goback" @click="goBack">返回</a>
        <ul class="little-type-list">
            <router-link v-for="(item, index) in little_type_list" :key="index" :to="'/product/' + item.proid" tag="li">
                <img :src="item.zimg" alt="">
                <p class="intro">{{item.hothc}}</p>
                <p class="title">{{item.proname}}</p>
                <p class="price">￥{{item.ydprice}}</p>
            </router-link>
        </ul>
        <GoTop></GoTop>

    </div>
</template>
<style lang="scss" scoped>
    .classify-list {
        position: relative;
        padding: 60px 10px;
        .fenlei {
            &:after {
                content: "";
                display: block;
                clear: both;
            }            
            li {
                float: left;
                padding: 6px 10px;
                margin-right: 10px;
                font-size: 16px;
                &:first-child {
                    @extend .active
                }
                &.active {
                    background: #b4282d;
                    color: #fff;
                    border-radius: 50%;
                }
                &.default {
                    background: none;
                    color: #000;
                }
            }
        }
        .goback {
            position: absolute;
            top: 66px;
            left: 350px;
            color: #777;
            padding: 2px 6px;
            font-size: 14px;
            border-radius: 4px;
            box-shadow: 0 0 6px #222
        }
        .little-type-list {
            margin-top: 40px;
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
                margin-bottom: 30px;
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
    }
</style>
<script>
import GoTop from "../components/Gotop.vue";
export default {
    components: {
        GoTop
    },
    data() {
        return {
            typeTitle: [],
            little_type_list: []
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        changeRoute(childtype, e) {
            // this.$route.replace(this.$route.query.typeKey, childtype)
            var type = this.$route.query.type;
            var typeKey = childtype;
            var pageNo = this.$route.query.pageNo;
            var pageSize = this.$route.query.pageSize;
            var key = this.$route.query.key;

            this.$router.push({
                name: "ClassifyList",
                query: {
                    type: type,
                    typeKey: childtype,
                    pageNo: pageNo,
                    pageSize: pageSize,
                    key: key
                }
            })

            // console.log("route", this.$route.query.typeKey)
            this.$http.get("http://localhost:8088/api/productApi/list?type="+type+"&typeKey="+typeKey+"&pageNo="+pageNo+"&pageSize="+pageSize)
            .then(({data}) => {
                this.little_type_list = data
            })

            let fenlei = document.querySelector(".fenlei");
            let lis = fenlei.getElementsByTagName("li");
            for(var i = 0; i < lis.length; i++) {
                lis[i].className = "";
            }
            lis[0].className="default";
            e.target.className = "active";
        }
    },
    created() {
        var type = this.$route.query.type;
        var typeKey = this.$route.query.typeKey;
        var pageNo = this.$route.query.pageNo;
        var pageSize = this.$route.query.pageSize;
        var key = this.$route.query.key;
        console.log("type",type, "typeKey", typeKey, "pageNo", pageNo, "pageSize", pageSize, "key", key);

        this.$http.get("/data/classify.json")
            .then(({data}) => {
                // console.log("静态", data[key].childType);
                this.typeTitle = data[key].childType
            })

        this.$http.get("http://localhost:8088/api/productApi/list?type="+type+"&typeKey="+typeKey+"&pageNo="+pageNo+"&pageSize="+pageSize)
        // this.$http.get("http://localhost:8088/api/productApi/list?type="+type+"&typeKey="+typeKey)
            .then(({data}) => {
                // console.log(data)
                this.little_type_list = data
            })
    },
    mounted() {
        //分页
        let pageNo = this.$route.query.pageNo;
        // console.log(pageNo)
        let me = this;
        window.addEventListener('scroll', function() {
            let scrollTop =  document.documentElement.scrollTop;//表示滚动的高度
            let currentTop = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度  //经过实践取出来的大多是视口大小
            
            let scrollHeight = document.documentElement.scrollHeight //滚动大小，指的是包含滚动内容的元素大小（元素内容的总高度）
            // console.log("scrollHeight",scrollHeight, "scrollTop",scrollTop, "currentTop",currentTop);
            if( currentTop + scrollTop >= scrollHeight) {
                console.log("aaa")
                var type = me.$route.query.type;
                var typeKey = me.$route.query.typeKey;
                var pageSize = me.$route.query.pageSize;
                var key = me.$route.query.key;
                pageNo++;
                // 请求分页数据
                setTimeout(qingqiu, 100)
                
                // 请求分页数据
                function qingqiu() {
                    console.log(123)
                    me.$http.get("http://localhost:8088/api/productApi/list?type="+type+"&typeKey="+typeKey+"&pageNo="+pageNo+"&pageSize="+pageSize)
                    .then(({data}) => {
                        me.little_type_list=me.little_type_list.concat(data)  
                    })
                }
            }

        })
    }
}
</script>