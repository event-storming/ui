import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueNumberInput from '@chenfengyuan/vue-number-input';
import VueTheMask from 'vue-the-mask'

import Products from "./components/products/Products.vue";
import ProductList from "./components/products/ProductList.vue";
import ProductOrder from "./components/products/ProductDetail.vue";
import ProductRecommend from "./components/products/ProductRecommend.vue";
import ProductSimple from "./components/products/ProductSimple.vue";
import Login from './components/oauth/Login.vue';
import axios from 'axios'
import OrderList from './components/order/OrderList';
import OrderFinish from "./components/order/OrderFinish";
import UserInfo from './components/mypage/UserInfo'
import DeliveryStatus from './components/delivery/DeliveryStatus';
import OrderPage from './components/order/OrderPage'
import Survey from "./components/marketing/Survey";
import SurveyForm from "./components/marketing/SurveyForm";
import ProductRepository from "./components/products/ProductRepository";
import ProductDelete from "./components/products/ProductDelete";
import Product from "./components/products/Product";

Vue.prototype.$http = axios;
Vue.use(VueNumberInput);
Vue.use(VueTheMask);
Vue.prototype.$EventBus = new Vue();

if( process.env.NODE_ENV == "development" ){
    window.API_HOST = "http://localhost:8088";
}else{
    window.API_HOST = process.env.VUE_APP_API_HOST
}
Vue.component('Login', Login);
Vue.component('Products', Products);
Vue.component('ProductList', ProductList);
Vue.component('ProductOrder', ProductOrder);
Vue.component('ProductRecommend',ProductRecommend);
Vue.component('OrderList', OrderList);
Vue.component('OrderFinish',OrderFinish);
Vue.component('OrderPage', OrderPage)
Vue.component('Survey',Survey);
Vue.component('SurveyForm',SurveyForm);
<<<<<<< HEAD
Vue.component('UserInfo', UserInfo);
Vue.component('DeliveryStatus', DeliveryStatus);
Vue.component('ProductSimple', ProductSimple);
Vue.component('ProductRepository',ProductRepository);
Vue.component('ProductDelete',ProductDelete);
=======
Vue.component('UserInfo', UserInfo)
Vue.component('DeliveryStatus', DeliveryStatus)
Vue.component('Product',Product)
Vue.component('ProductSimple', ProductSimple)
Vue.component('ProductRepository',ProductRepository)
Vue.component('ProductDelete',ProductDelete)
>>>>>>> a8d0ff06c77a4b51b4c896c8333775d3ca27446f

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
  render: function (h) { return h(App) },
}).$mount('#app')
