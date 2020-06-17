import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import EventsManage from '../views/EventsManage/EventsManage.vue'
import CountMange from '../views/CountManage/CountMange.vue'
import RolesManage from '../views/homeSubs/PrivilegeManage/RolesManage.vue'
import FoodManage from '../views/FoodManage/FoodManage.vue'
import FoodTypeManage from '../views/FoodManage/FoodtypeManage.vue'
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
	meta:{
		 title: "首页", 
		 show: true
	},
	children:[
		{
			path:'/home/foodtypeManage',
			name:'FoodTypeManage',
			component:FoodTypeManage,
			meta:{
				title:"美食分类管理",
				show:true
			}
		},
		{ 
		  path: '/home/EventsManage',
		  name: 'EventsManage',
		  component: EventsManage,
		  meta:{
			 title: "活动管理", 
			 show: true
		  }
		},
  		{
  		  path: '/home/CountMange',
  		  name: 'CountMange',
  		  component: CountMange,
		  meta:{
			 title: "优惠券", 
			 show: true
		  }
  		},
		{
			path: '/home/rolesManage',
			name: 'RolesManage',
			component: RolesManage,
			meta:{
				 title: "角色管理", 
				 show: true
			}
		},
		{
			path:'/home/foodManage',
			name:'FoodManage',
			component:FoodManage,
			meta:{
				title:"美食信息管理",
				show:true
			}
		},



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