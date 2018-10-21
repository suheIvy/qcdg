<template>
    <div class="swiper-container banner">
            <ul class="swiper-wrapper">
                <li class="swiper-slide" v-for="(item, index) in swiper_list" :key="index">
                    <img :src="item" alt="">
                </li>
            </ul>
        </div>
</template>
<style lang="scss" scoped>
    .banner {
        ul {
            li {
                width: 100%;
                img {
                    width: 100%;
                }
            }
        }
    }
</style>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
    props: ["swiper_list"],
    mounted() {
        new Swiper(".banner", {
            autoplay: {
                // 用户操作swiper后自动重启autoplay
                disableOnInteraction: false,
            },
            // 轮播速度
            speed: 1600,
            observer: true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents: true,//修改swiper的父元素时，自动初始化swiper
            // 循环
            loop: true
        })
    }
}
</script>