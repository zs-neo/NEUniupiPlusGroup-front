import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import EventsManage from '../views/EventsManage/EventsManage.vue'
import CountMange from '../views/CountManage/CountMange.vue'
import EventsManage from '../views/homeSubs/EventsManage/EventsManage.vue'
import RolesManage from '../views/homeSubs/PrivilegeManage/RolesManage.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
	
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
	children:[
		{ 
		  path: '/home/EventsManage',
		  name: 'EventsManage',
		  component: EventsManage,
  },
  {
  		  path: '/home/CountMange',
  		  name: 'CountMange',
  		  component: CountMange,
  },
		},
		{
			path: '/home/rolesManage',
			name: 'RolesManage',
			component: RolesManage
		}
	],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to,from,next)=>{
	document.title = "秘制美食后台系统";
	next();
})