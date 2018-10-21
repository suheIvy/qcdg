import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";
import List from "./pages/List.vue";
import Product from "./pages/Product.vue";
import Classify from "./pages/Classify.vue";
import ClassifyList from "./pages/ClassifyList.vue";
import Login from "./pages/Login.vue";
import Regist from "./pages/Regist.vue";
import Xieyi from "./pages/Xieyi.vue";
import Me from "./pages/Me.vue";
import Shoppingcar from "./pages/Shoppingcar.vue";

Vue.use(Router)

// let Me = { template: "<h1>me page</h1>" }

export default new Router({
  	routes: [
        { path: '/classify/list', component: Classify },  // 大分类页面（9项）
    	{ path: '/classify/list-part/', name: "ClassifyList",  component: ClassifyList },  // 小分类列表页（9项中每一项列表）
        { path: '/shoppingcar', name: 'Shoppingcar', component: Shoppingcar }, //购物车 
        { path: '/me', name: 'Me', component: Me },  // 我的
        { path: '/product/:proid', name: 'Product', component: Product },
        { path: '/login', name: 'Login', component: Login },
        { path: '/regist', name: 'Regist', component: Regist },
    	{ path: '/xieyi', name: 'Xieyi', component: Xieyi },
    	{ path: '*', name: 'home', component: Home },
  	]
})

