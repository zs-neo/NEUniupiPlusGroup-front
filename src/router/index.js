import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import EventsManage from '../views/EventsManage/EventsManage.vue'
import CountManage from '../views/CountManage/CountManage.vue'
import RolesManage from '../views/homeSubs/PrivilegeManage/RolesManage.vue'

import FoodManage from '../views/FoodManage/FoodManage.vue'
import FoodTypeManage from '../views/FoodManage/FoodtypeManage.vue'

import PrivilegeManage from '../views/homeSubs/PrivilegeManage/PrivilegeManage.vue'
import StatisticsManage from '../views/StatisticsManage/StatisticsManage.vue'
import FlowManage from '../views/FlowManage/FlowManage.vue'
import MineCenter from '../views/homeSubs/MineCenter.vue'
import OrderManage from '../views/OrderManage/OrderManage.vue'
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

	// meta:{
	// 	 title: "首页", 
	// 	 show: false
	// },
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

		  path: '/home/eventsManage',
		  name: 'EventsManage',
		  component: EventsManage,
		  meta:{
			 title: "活动管理", 
			 show: true
		  }
		},
  		{

  		  path: '/home/countManage',
  		  name: 'CountManage',
  		  component: CountManage,
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



		{
			path: '/home/privilegeManage',
			name: 'PrivilegeManage',
			component: PrivilegeManage,
			meta:{
				 title: "权限管理", 
				 show: true
			}
		},
		{
			path: '/home/statisticsManage',
			name: 'statisticsManage',
			component: StatisticsManage,
			meta:{
				 title: "财务报表", 
				 show: true
			}
		},
		{
			path: '/home/flowManage',
			name: 'flowManage',
			component: FlowManage,
			meta:{
				 title: "流量统计", 
				 show: true
			}
		},
		{
			path: '/home/mineCenter',
			name: "MineCenter",
			component: MineCenter,
			meta:{
				title:"个人中心",
				show:true
			}
		},
		{
			path: '/home/orderManage',
			name: "OrderManage",
			component: OrderManage,
			meta:{
				title:"订单管理",
				show:true
			}
		}

	],
	redirect: '/home/mineCenter'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import store from '@/store';
router.beforeEach((to,from,next)=>{
	document.title = "秘制美食后台系统";
	//进入主页就拦截，判断是否登录
	if(to.path.startsWith("/home")){
		if(!sessionStorage.getItem("isLogin")){
			router.push("/");
			Vue.prototype.$message.error("请先登录");
		}else{
			next();
		}
	}else{
		next();
	}
	
})