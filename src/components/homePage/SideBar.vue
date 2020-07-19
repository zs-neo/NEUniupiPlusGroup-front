<template>
	<div class="sideBar">

		<transition name="el-zoom-in-center">
			<el-menu :collapse="collapse" @open="handleOpen" @close="handleClose" :style='style' class="sidebar-el-menu"
			 background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" :router="true" :unique-opened=true>
				<el-submenu index="1">

					<template slot="title">

						<i class="el-icon-fork-spoon"></i>
						<span>美食信息管理</span>
					</template>


					<el-menu-item index='/home/foodManage'>
						<span>美食信息管理</span>
					</el-menu-item>
					<el-menu-item index='/home/foodtypeManage'>
						<span>美食分类管理</span>
					</el-menu-item>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-document"></i>
						<span>活动管理</span>
					</template>

					<el-menu-item index="/home/eventsManage">
						<span>限时活动</span>
					</el-menu-item>
					<el-menu-item index="/home/couponMange">
						<span>优惠券</span>
					</el-menu-item>
				</el-submenu>
				<el-menu-item index="3">
					<i class="el-icon-lock"></i>
					<span slot="title">系统安全维护</span>
				</el-menu-item>
				<el-menu-item index="4">
					<i class="el-icon-goods"></i>
					<span slot="title">订单管理</span>
				</el-menu-item>
				<el-submenu index="5">
					<template slot="title">
						<i class="el-icon-user"></i>
						<span slot="title">角色和权限管理</span>
					</template>
					<el-menu-item index="/home/rolesManage">
						<span>角色管理</span>
					</el-menu-item>
					<el-menu-item index="/home/privilegeManage">
						<span>权限管理</span>
					</el-menu-item>
				</el-submenu>
				<el-submenu index="6">
					<template slot="title">
						<i class="el-icon-files"></i>
						<span slot="title">商家信息</span>
					</template>
					<el-menu-item index="/home/shopManage">
						<span>信息管理</span>
					</el-menu-item>
				</el-submenu>
				<el-submenu index="7">
					<template slot="title">
						<i class="el-icon-files"></i>
						<span slot="title">统计报表</span>
					</template>
					<el-menu-item index="/home/statisticsManage">
						<span>财务报表</span>
					</el-menu-item>
					<el-menu-item index="/home/flowManage">
						<span>流量统计</span>
					</el-menu-item>
				</el-submenu>
				<el-submenu index="8">
					<template slot="title">
						<i class="el-icon-files"></i>
						<span slot="title">在线客服</span>
					</template>
					<el-menu-item index="/home/chatManage">
						<span>在线客服</span>
					</el-menu-item>
				</el-submenu>
			</el-menu>
		</transition>
	</div>
</template>

<script>

	import bus from '../../Bus.js';
	export default{
		data(){
			return{
				collapse: false,
				style:'',
			};
			
		},
		created() {
			bus.$on('collapse', msg => {
			    this.collapse = msg;
				if(msg){
					this.style = 'transition-delay: 0.2s;border: none;width : inherent';
				}else{
					this.style = 'transition-delay: 0.2s;border: none; width : 260px';
				}
			})
		},
		methods:{
			itemSelectHandler(index,indexPath){
			      console.log(index);
			      console.log(indexPath);
			  },
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>
<style scoped>
 .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
