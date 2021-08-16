import Vue from 'vue';
import ElementUI from 'element-ui';
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

import router from "./routes";
import store from "./store"

import api from "./api/index.js";
Vue.prototype.$api = api;

import App from './App.vue';
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

