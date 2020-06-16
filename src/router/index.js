import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import EventsManage from '../views/EventsManage/EventsManage.vue'
import CountMange from '../views/CountManage/CountMange.vue'
import RolesManage from '../views/homeSubs/PrivilegeManage/RolesManage.vue'
import PrivilegeManage from '../views/homeSubs/PrivilegeManage/PrivilegeManage.vue'
import StatisticsManage from '../views/StatisticsManage/StatisticsManage.vue'
import FlowManage from '../views/FlowManage/FlowManage.vue'Vue.use(VueRouter)

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