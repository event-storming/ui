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
<<<<<<< HEAD

=======
>>>>>>> 40b486ea56ad914e7f8978d84ef7c7456b40d1fa
import Login from './components/oauth/Login.vue';
import axios from 'axios'
import OrderList from './components/order/OrderList';
import UserInfo from './components/mypage/UserInfo'
import DeliveryStatus from './components/delivery/DeliveryStatus';
import OrderPage from './components/order/OrderPage'



Vue.prototype.$http = axios;
Vue.use(VueNumberInput);
Vue.use(VueTheMask)

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
Vue.component('UserInfo', UserInfo)
Vue.component('DeliveryStatus', DeliveryStatus)
Vue.component('OrderPage', OrderPage)
Vue.component('ProductSimple', ProductSimple)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) },

}).$mount('#app')
