<template>
	<div class="sideBar">
		<transition name="el-zoom-in-center" >
			<el-menu
			  :collapse="collapse"
			  default-active=""
			  class="el-menu-vertical-demo"
			  @open="handleOpen"
			  @close="handleClose"
			  background-color="#324157"
			  text-color="#fff"
			  :style="style"
			  :unique-opened=true
			  active-text-color="#20a0ff">
			  <el-submenu index="1">
				<template slot="title">
				  <i class="el-icon-fork-spoon"></i>
				  <span>美食信息管理</span>
				</template>
				
				  <el-menu-item index="1-1">
					  <span>美食管理</span>
				  </el-menu-item>
				  <el-menu-item index="1-2">
					  <span>美食类别管理</span>
				  </el-menu-item>
			  </el-submenu>
			  <el-menu-item index="2">
				<i class="el-icon-document"></i>
				<span slot="title">活动运维</span>
			  </el-menu-item>
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
				<el-menu-item index="5-1">
					<span>角色管理</span>
				</el-menu-item>
				<el-menu-item index="5-2">
					<span>权限管理</span>
				</el-menu-item>
			  </el-submenu>
			  <el-menu-item index="6">
				<i class="el-icon-files"></i>
				<span slot="title">统计报表</span>
			  </el-menu-item>
			</el-menu>
		</transition>
	</div>
</template>

<script>
	import bus from '@/Bus.js';
	export default{
		data(){
			return{
				collapse: false,
				style: 'transition-delay: 0.2s;border: none; width : 260px',
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
<style>
	transition: all .15s ease
</style>
