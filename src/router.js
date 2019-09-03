import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD
import Home from './views/Home.vue'
import Login from './components/Login.vue'
import Products from "./components/Products";
=======
import Home from './components/Home'
import MyPage from './components/MyPage.vue'
>>>>>>> 54ddf6d4e3ba948056d72f4d3391444c2a6428f7

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
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: function () {
                return import(/* webpackChunkName: "about" */ './views/About.vue')
            }
        },
        {
            path:'/products',
            name: 'products',
            component: Products
        }
    ]
})
