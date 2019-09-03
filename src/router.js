import Vue from 'vue'
import Router from 'vue-router'
import Products from "./components/products/Products";
import Home from './components/Home'
import MyPage from './components/MyPage.vue';

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
        // {
        //     path: '/about',
        //     name: 'about',
        //     // route level code-splitting
        //     // this generates a separate chunk (about.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: function () {
        //         return import(/* webpackChunkName: "about" */ './views/About.vue')
        //     }
        // },
        {
            path:'/products',
            name: 'products',
            component: Products
        }
    ]
})
