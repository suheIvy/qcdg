<template>
    <!-- top滑块选项列表 -->
    <div class="swiper-container top-slider">
        <ul class="swiper-wrapper">
            <router-link class="swiper-slide " v-for="(item, index) in top_slider" :key="index" :to="item.url" tag="li" @click.native="changeStyle(item.id)"><a href="javascript:void(0)">{{item.title}}</a></router-link>
            
        </ul>
    </div>
</template>
<style scoped lang="scss">
    .top-slider {
        height: 40px;
        margin-top: 40px;
        ul {
            li {
                width: 25% !important;
                text-align: center;
                box-sizing: border-box;
                border-bottom: 3px solid transparent;
                &.router-link-active {
                    border-bottom-color: #b4282d;
                }
                &.router-link-active a {
                    color: #b4282d;
                }
                a {
                    font-size: 14px;
                    color: #000;
                    line-height: 40px;
                }

            }
        }
    }
    
</style>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
    data() {
        return {
            // 顶部分类
            top_slider: [],
            style: "active"
        }
    },
    created() {
        this.$http.get("/data/cake_home.json")
            .then(({data}) => { 
                this.top_slider = data.top_slider
            })
    },
    mounted() {
        new Swiper(".top-slider", {
            autoplay: false,
            // 每次展示4条
            slidesPerView : 4,
            // 分为两组   
            slidesPerGroup : 2,
            // 可以根据惯性滑动
            freeMode : true,
            // 点击过渡到中间
            slideToClickedSlide: true,
            observer: true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents: true//修改swiper的父元素时，自动初始化swiper
        })
    },
    methods: {
        changeStyle(id) {
            // console.log(id)
            // console.log(this)


        }
    }
}
</script>