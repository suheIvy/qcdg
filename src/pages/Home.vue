<template>
	<div class="cake-home">
		<Topslider></Topslider>
		<!-- 轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图啊		<!-- 轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图啊 -->
 -->
		<Carousel :swiper_list="swiper_list"></Carousel>
		<!-- 特点介绍 -->
		<div class="home-intro">
			<span>七彩蛋糕官网</span>
			<span>品牌蛋糕定制</span>
			<span>最快1小时送达</span>
		</div>
		<!-- 小图标列表 -->
		<ul class="home-icon-list">
			<router-link v-for="item in icon_list" :key="item.id" :to="item.url" tag="li">
				<img :src="item.img" alt="">
				<span>{{item.title}}</span>
			</router-link>
		</ul>
		<!-- 联系方式 -->
		<div class="contact-info">
			<div v-for="(item, index) in contact_info" :key="index">
				<img :src="item.img" alt="">
				<a href="https:\/\/static.meiqia.com\/dist\/standalone.html?eid=14916">{{item.text}}</a>
			</div>
		</div>
		<!-- 首页大项列表 -->
		<CardList :home_list="home_list"></CardList>
		
	</div>
</template>

<script>
import Swiper from "swiper";// 轮播组件
import "swiper/dist/css/swiper.min.css";  // 轮播组件样式
import Topslider from "../components/Swiper.vue";  // 顶部导航
import CardList from "../components/CardList.vue";  // 主内容区域列表
import Carousel from "../components/Carousel.vue";  // banner轮播图


export default {
	components: {
		Topslider,
		CardList,
		Carousel
	},
	data() {
		return {
			swiper_list: [],
			icon_list: [],
        	contact_info: [
        		{text: "400-658-1177", img: "https://m.dangao.com/Tpl/default/Public/images/home_phone.png"},
        		{text: "微信客服", img: "https://m.dangao.com/Tpl/default/Public/images/home_wx.png"},
        		{text: "139010678", img: "https://m.dangao.com/Tpl/default/Public/images/home_wx.png"},
        		{text: "在线客服", img: "https://m.dangao.com/Tpl/default/Public/images/home_zx.png"}
        	],
        	home_list: []
		}
	},
	created() {
		// console.log(this.$route)
		this.$http.get("/data/cake_home.json")
			.then(({data}) => { 
				// console.log(this)
				this.swiper_list = data.swiper_list
				this.icon_list = data.icon_list
				this.home_list = data.home_list
			})
	},
	mounted() {
	}
}
</script>

<style scoped lang="scss">
.cake-home {
	
	// 特点介绍
	.home-intro {
		height: 40px;
		line-height: 40px;
		padding: 0 12px;
		border-bottom: 10px solid #efefef;
		span {
			display: inline-block;
			width: 33.33%;
			font-size: 14px;
			text-align: center;
			background: url("https://m.dangao.com/Tpl/default/Public/images/ico/ok_ico.png") no-repeat left center;
			background-size: 10%;
		}
	}
	// 小图标列表
	.home-icon-list {
		padding-top: 10px;
		li {
			float: left;
			width: 25%;
			text-align: center;
			margin-top: 10px;
			img {
				width: 50%;
			}
			span {
				display: block;
				line-height: 30px;
				font-size: 14px;
			}
		}
	}
	// 联系方式
	.contact-info {
		margin-top: 10px;
		border-bottom: 10px silid #efefef;
		div {
			display: inline-block;
			width: 43%;
			height: 40px;
			line-height: 40px;
			margin: 4px 2%;
			background: #666;
			padding-left: 10px;
			img {
				width: 24px;
				vertical-align: middle;
			}
			a {
				color: #fff;
				&:firstChild {
					href: "#"
				}
			}
		}
	}
	
}
</style>
