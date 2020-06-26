import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  isLogin : false,
  },
  mutations: {
	  validUser(state){
		  state.isLogin = true;
	  }
  },
  getters:{
	  getUserState(state){
		  return state.isLogin;
	  }
  },
  actions: {
  },
  modules: {
  }
})
