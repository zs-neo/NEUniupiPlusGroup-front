import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import echarts from 'echarts'
import { Loading } from 'element-ui';
var loadingInstance;	
axios.interceptors.request.use(function(request){
	console.log("我在main.js中loading......")
	 loadingInstance = Loading.service({text: '加载中'});
	 return request;
	});
	//错误收不到response
axios.interceptors.response.use(function (response) {
	loadingInstance.close();
	console.log("我是main.js中的前端过滤器，axios回来了，close loading......");
	if(undefined == response.data.isLogin || response.data.isLogin){
		return response;
	}else{
		Vue.prototype.$message.error("会话超时，请重新登录...")
		sessionStorage.clear();
		router.push("/");
	}
    
	
}, err => {
	console.log("我在main.js中发现错误，close loading......");
	loadingInstance.close();
	return Promise.reject(err);
});
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.$echarts = echarts 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
