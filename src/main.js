import Vue from 'vue'
import App from './App.vue'
<<<<<<< HEAD
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
=======

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
>>>>>>> eb9e565cdac24fdf44e32594b7cee0ca6556c5aa
}).$mount('#app')
