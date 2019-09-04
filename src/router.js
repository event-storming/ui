import Vue from 'vue'
import Router from 'vue-router'
import Products from "./components/products/Products";
import ProductDetail from "./components/products/ProductDetail";
import Home from './components/Home'
import MyPage from './components/mypage/MyPage.vue';

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/mypage',
            name: 'mypage',
            component: MyPage
        },
        {
            path:'/products',
            name: 'products',
            component: Products ,
        },
        {
            path:'/products/:name',
            name: 'productsDetail',
            component: ProductDetail ,
            // children:[
            //     {   path: 'TV', component: { template: 'ProductDetail' }
            //     },
            // ]
        }
    ]
})

