import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueNumberInput from '@chenfengyuan/vue-number-input';

import Products from "./components/products/Products.vue";
import ProductOrder from "./components/products/ProductOrder.vue";
import Login from './components/oauth/Login.vue';
import axios from 'axios'
import OrderList from './components/order/OrderList';
import UserInfo from './components/mypage/UserInfo'
import DeliveryStatus from './components/delivery/DeliveryStatus'


Vue.prototype.$http = axios;
Vue.use(VueNumberInput);

if( process.env.NODE_ENV == "development" ){
    window.API_HOST = "http://localhost:8088";
}else{
    window.API_HOST = process.env.VUE_APP_API_HOST
}
Vue.component('Login', Login);
Vue.component('Products', Products);
Vue.component('ProductOrder', ProductOrder);
Vue.component('OrderList', OrderList);
Vue.component('UserInfo', UserInfo)
Vue.component('DeliveryStatus', DeliveryStatus)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
