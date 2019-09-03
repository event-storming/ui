import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import VueNumberInput from '@chenfengyuan/vue-number-input';
import 'vuetify/dist/vuetify.min.css';
<<<<<<< HEAD
import Login from './components/Login.vue';
import Products from "./components/Products.vue";
import ProductOrder from "./components/ProductOrder.vue";
=======
import Login from './components/oauth/Login.vue';
import axios from 'axios'
import OrderList from './components/order/OrderList';
import UserInfo from './components/mypage/UserInfo'
>>>>>>> 54ddf6d4e3ba948056d72f4d3391444c2a6428f7

Vue.prototype.$http = axios;

if( process.env.NODE_ENV == "development" ){
    window.API_HOST = "http://localhost:8088";
}else{
    window.API_HOST = process.env.VUE_APP_API_HOST
}
Vue.component('Login', Login);
<<<<<<< HEAD
Vue.component('Products', Products);
Vue.component('ProductOrder', ProductOrder);
Vue.use(VueNumberInput);
var eventBus=new Vue();
=======
Vue.component('OrderList', OrderList);
Vue.component('UserInfo', UserInfo)
>>>>>>> 54ddf6d4e3ba948056d72f4d3391444c2a6428f7

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  // VNumberSmarty,
  render: function (h) { return h(App) }
}).$mount('#app')
