import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 验证码插件
import SIdentify from './components/Yzm.vue'
Vue.use(SIdentify)
// 引入layer
import layer from "vue-layer";
Vue.prototype.$layer = layer(Vue);
// 安装axios
import axios from 'axios';
// 非vue家族插件安装在prototype上
Vue.prototype.$http = axios; 

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    var user = store.state.user
    if(user) {
        next();
        return;
    }
    if (to.path.indexOf("Me") != -1 ) {
        next({ path: '/login' })
    } else {
        next()
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
