import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import ProductDetail from "./components/products/ProductDetail";
import OrderFinish from "./components/order/OrderFinish";
import Home from './components/Home'
import MyPage from './components/mypage/MyPage.vue';
import MyPageNew from "./components/mypage/MyPageNew";
import Survey from "./components/serviceCenter/Survey";
import ProductPage from "./components/products/ProductPage";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/mypage',
            name: 'mypage',
            component: MyPage
        },
        {
            path: '/mypageNew',
            name: 'mypageNew',
            component: MyPageNew
        },
        {
            path: '/products',
            name: 'products',
            component: ProductPage,
        },
        {
            path: '/orderfinish',
            name: 'orderfinish',
            component: OrderFinish,
        },
        {
            path: '/surveys',
            name: 'surveys',
            component: Survey,
        },
        {
            path: '/products/:name',
            name: 'productsDetail',
            component: ProductDetail,
        }
    ]
})

