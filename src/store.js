import Vue from 'vue';
import Vuex, { Store } from 'vuex';
// 安装vuex
Vue.use(Vuex);

// 创建store
export default new Store({
    state: {
        price: 0,
        products: [],
        user: false
        // num: 0
    },
    mutations: {
        // 添加商品
        addProduct(state, data) {
            // 判断如果product中有这个商品，就不能再添加了
            // 以proid为依据
            // console.log(data.ydprice)
            // console.log("222data", data);
            // console.log("111state", state)
            // console.log("proid", data.proid)
            // console.log(item.proid, data.proid, item.ydprice)
            
            // 价格转化成数字是NaN 不能添加
            if(Object.is(+data.ydprice, NaN)) {
                return;
            }
            state.price += +data.ydprice;

            if(state.products.find(item => item.proid == data.proid)) {
                // 提示用户  (改在product页面提示)
                return;
            }
            
            // 更改价格  存储数据
            state.products.push(data)

        },
        reduceNum(state, data) {
            // 减少价格
            state.price -= data.ydprice;
            if(data.num <= 0) {
                this.commit("deleteProduct", data)
            }
        },
        // 删除商品
        deleteProduct(state, data) {
            // console.log("delete")
             // 价格转化成数字是NaN，不能添加
            if (Object.is(+data.ydprice, NaN)) {
                // 是NaN，不能添加商品
                alert('该商品价格不存在');
                return;
            }
            // 减少价格
            state.price -= data.ydprice*data.num;
            // 获取数据索引值
            let index = state.products.findIndex(item => item.proid == data.proid);
            // 移除数据
            state.products.splice(index, 1)
            // console.log('delete', data)
        }
    },
    actions: {

    }
})
