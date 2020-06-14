<template>
	<div class="sideBar">
		<el-menu
		  default-active=""
		  class="el-menu-vertical-demo"
		  @open="handleOpen"
		  @close="handleClose"
		  background-color="#324157"
		  text-color="#fff"
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
	</div>
</template>

<script>
	export default{
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
</style>
