import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueNumberInput from '@chenfengyuan/vue-number-input';
import VueTheMask from 'vue-the-mask'

import ProductRecommend from "./components/marketing/ProductRecommend.vue";
import ProductAds from "./components/marketing/ProductAds";

import Home from "./components/Home";
import ProductList from "./components/products/ProductList.vue";
import ProductOrder from "./components/products/ProductDetail.vue";
import ProductSimple from "./components/products/ProductSimple.vue";
import ProductAdd from "./components/products/ProductAdd";
import ProductDelete from "./components/products/ProductDelete";
import Product from "./components/products/Product";
import ProductPage from "./components/products/ProductPage";

import Login from './components/oauth/Login.vue';
import GSignInButton from 'vue-google-signin-button'
import FBSignInButton from 'vue-facebook-signin-button'

import axios from 'axios'
import OrderListCQRS from './components/order/OrderListCQRS';
import OrderListMashup from "./components/order/OrderListMashup";
import OrderFinish from "./components/order/OrderFinish";
import Order from './components/order/Order'
import UserInfo from './components/mypage/UserInfo'
import DeliveryStatus from './components/delivery/DeliveryStatus';

import Survey from "./components/serviceCenter/Survey";
import SurveyForm from "./components/serviceCenter/SurveyForm";
import BlackListUserInfo from "./components/mypage/BlackListUserInfo";

Vue.prototype.$http = axios;
Vue.prototype.$EventBus = new Vue();

Vue.use(VueNumberInput);
Vue.use(VueTheMask);

Vue.use(GSignInButton)
Vue.use(FBSignInButton)

if (process.env.NODE_ENV == "development") {
    window.API_HOST = "http://localhost:8088";
} else {
    window.API_HOST = process.env.VUE_APP_API_HOST
}
Vue.component('Home',Home)
Vue.component('Login', Login);
Vue.component('ProductPage', ProductPage)
Vue.component('ProductList', ProductList);
Vue.component('ProductOrder', ProductOrder);
Vue.component('ProductRecommend', ProductRecommend);
Vue.component('OrderListCQRS', OrderListCQRS);
Vue.component('OrderListMashup',OrderListMashup);
Vue.component('OrderFinish', OrderFinish);
Vue.component('Order', Order)
Vue.component('Survey', Survey);
Vue.component('SurveyForm', SurveyForm);
Vue.component('UserInfo', UserInfo)
Vue.component('DeliveryStatus', DeliveryStatus)
Vue.component('Product', Product)
Vue.component('ProductSimple', ProductSimple)
Vue.component('ProductAdd', ProductAdd)
Vue.component('ProductDelete', ProductDelete)
Vue.component('BlackListUserInfo', BlackListUserInfo)
Vue.component('ProductAds',ProductAds);

//
// const gOption = {
//     clientId: 'CLIENT_ID.apps.googleusercontent.com',
//     scope: 'profile email',
//     prompt: 'select_account'
// }
// Vue.use(GoogleLogin, gOption)

Vue.config.productionTip = false

Vue.prototype.$getComponents = function (componentName) {
    let component = null;
    let parent = this.$parent;
    while (parent && !component) {
        if (parent.$options.name === componentName) {
            component = parent
        }
        parent = parent.$parent
    }
    return component
},

    new Vue({
        router,
        store,
        vuetify,
        render: function (h) {
            return h(App)
        },
    }).$mount('#app')
