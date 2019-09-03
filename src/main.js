import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import VueNumberInput from '@chenfengyuan/vue-number-input';
import 'vuetify/dist/vuetify.min.css';
import Login from './components/Login.vue';
import Products from "./components/Products.vue";
import ProductOrder from "./components/ProductOrder.vue";

Vue.component('Login', Login);
Vue.component('Products', Products);
Vue.component('ProductOrder', ProductOrder);
Vue.use(VueNumberInput);
var eventBus=new Vue();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  // VNumberSmarty,
  render: function (h) { return h(App) }
}).$mount('#app')
