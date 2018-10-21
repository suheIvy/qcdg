<template>
	<div id="app">
    	<div class="cake-header">
    		<h1 class="logo">
    			<img src="https://m.dangao.com/Tpl/default/Public/images/toplogo.png" alt="logo">
    		</h1>
            <div class="cake-search">
                <input type="text" placeholder="鲜奶蛋糕">
            </div>
            <span class="online-btn">在线咨询</span>
    	</div>
        <div class="contact">
            <a href="https:\/\/static.meiqia.com\/dist\/standalone.html?eid=14916"><img src="https://m.dangao.com/Tpl/default/Public/images/xf_kf.png" alt=""></a>
        </div>
        <div class="footerbar">
            <ul id="footerbar-list">
                <router-link v-for="(item, index) in footerbar" :key="index" tag="li" :to="item.url" @click.native="changeImg(item.id)">
                    <img :src="item.img" alt="">
                    <span>{{item.text}}</span>
                </router-link>
                <li class="shoppingcar-num" v-if="this.$store.state.products.length">{{this.$store.state.products.length}}</li>
            </ul>
        </div>
       
    	<!-- 路由渲染位置 -->
    	<router-view/>
  	</div>
</template>

<style lang="scss">
body, ul, h1, h2, h3, h4, h5, h6, input, p, img {
    margin: 0;
    padding: 0
}
a {
    text-decoration: none;
}
li {
    list-style: none;
}
.cake-header {
    position: fixed;
    width: 100%;
    height: 30px;
    display: flex;
    padding: 10px;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 10;
    .logo {
        width: 76px;
        margin-right: 10px;
        line-height: 30px;
        img {
            width: 76px;
        }
    }
    .cake-search {
        width: 50%;
        input {
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-indent: 2em;
            background: #efefef url("https://m.dangao.com/Tpl/default/Public/images/so.png") no-repeat 6px;
            background-size: 10%;
            outline: none;
            border: none;
            border-radius: 6px;
        };
        
    }
    .online-btn {
        margin-left: 10px;
        width: 60px;
        height: 18px;
        text-align: center;
        line-height: 18px;
        font-size: 12px;
        padding: 6px 10px;
        border-radius: 4px;
        color: #fff;
        background: yellowgreen; 
    }
}
.footerbar {
    position: fixed;
    width: 100%;
    height: 40px;
    bottom: 0;
    left: 0;
    background: #fff;
    padding: 10px;
    z-index: 10;
    ul {
        display: flex;
        line-height: 40px;
        width: 100%;
        position: relative;
        li {
            width: 23%;
            text-align: center;
            &.router-link-active {
                backgrond: url("https://m.dangao.com/Tpl/default/Public/images/footer/home-hl.png")
            }
            img {
                width: 28px;
                height: 22px; 
            }
            span {
                display: block;
                font-size: 14px;
                line-height: 14px;
                margin-top:-10px;
            }
        }
        .shoppingcar-num {
            position: absolute;
            top: 2%;
            left: 58%;
            width: 1.2rem;
            height: 1.3rem;
            background: red;
            color: #fff;
            border-radius: 50%;
            line-height: 1.4rem;
            font-size: 14px;
        }
    }
    
}
.contact {
    position: fixed;
    bottom: 9rem;
    right: 1rem;
    width: 3rem;
    height: 3rem;
    z-index: 10;
    img {
        width: 100%;
    }
}
</style>
<script>
export default {
	data() {
        return {
            // shoppingcar_num: this.$store.state.products.length,
            footerbar: [
                {id: 0, img: "https://m.dangao.com/Tpl/default/Public/images/footer/home.png", activeImg: "https://m.dangao.com/Tpl/default/Public/images/footer/home-hl.png", "text": "首页", "url": "/"},
                {id: 1, img: "https://m.dangao.com/Tpl/default/Public/images/footer/cate.png", activeImg: "https://m.dangao.com/Tpl/default/Public/images/footer/cate-hl.png", "text": "分类", "url": "/classify/list"},
                {id: 2, img: "https://m.dangao.com/Tpl/default/Public/images/footer/bag.png", activeImg: "https://m.dangao.com/Tpl/default/Public/images/footer/bag-hl.png", "text": "购物车", "url": "/shoppingcar"},
                {id: 3, img: "https://m.dangao.com/Tpl/default/Public/images/footer/mine.png", activeImg: "https://m.dangao.com/Tpl/default/Public/images/footer/mine-hl.png", "text": "个人", "url": "/Me"}
            ]
        }
    },
    methods: {
        changeImg(id) {
            // console.log(id);
            let footerbar_list = document.getElementById("footerbar-list");
            let imgs = footerbar_list.getElementsByTagName("img");
            for(var i = 0; i < imgs.length; i++) {
                imgs[i].src = this.footerbar[i].img;
            }
            imgs[id].src = this.footerbar[id].activeImg;
            // console.log("aaa",this.$route.path)
            
            
        }
    },
    mounted() {
        let footerbar_list = document.getElementById("footerbar-list");
        let imgs = footerbar_list.getElementsByTagName("img");
        for(var i = 0; i < this.footerbar.length; i++) {
            if(this.footerbar[i].url === this.$route.path) {
                imgs[i].src = this.footerbar[i].activeImg;
            }
        }
    }
}
</script>
