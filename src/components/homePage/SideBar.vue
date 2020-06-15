<template>
	<div class="sideBar">
		<el-menu class="sidebar-el-menu" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" :router="true">
			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>美食信息管理</span>
				</template>
				<el-menu-item index="2">
					<span>美食管理</span>
				</el-menu-item>
				<el-menu-item index="1-2">
					<span>美食类别管理</span>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>活动管理</span>
				</template>

				<el-menu-item index="/home/EventsManage">
					<span>限时活动</span>
				</el-menu-item>
				<el-menu-item index="/home/CountMange">
					<span>优惠券</span>
				</el-menu-item>
			</el-submenu>
			<el-menu-item index="3">
				<i class="el-icon-document"></i>
				<span slot="title">系统安全维护</span>
			</el-menu-item>
			<el-menu-item index="4">
				<i class="el-icon-setting"></i>
				<span slot="title">订单管理</span>
			</el-menu-item>
			<el-submenu index="5">
				<template slot="title">
					<i class="el-icon-setting"></i>
					<span slot="title">角色和权限管理</span>
				</template>
				<el-menu-item index="/home/rolesManage">
					<span>角色管理</span>
				</el-menu-item>
				<el-menu-item index="5-2">
					<span>权限管理</span>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="6">
				<template slot="title">
					<i class="el-icon-edit"></i>
					<span slot="title">统计报表</span>
				</template>
				<el-menu-item index="/home/statisticsManage">
					<span>财务报表</span>
				</el-menu-item>
				<el-menu-item index="/home/flowManage">
					<span>流量统计</span>
				</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
	export default {
		methods: {
			itemSelectHandler(index, indexPath) {
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

}
<style scoped>
	.sidebar {
		display: block;
		position: absolute;
		left: 0;
		top: 70px;
		bottom: 0;
		overflow-y: scroll;
	}

	.sidebar::-webkit-scrollbar {
		width: 0;
	}

	.sidebar-el-menu:not(.el-menu--collapse) {
		width: 250px;
	}

	.sidebar>ul {
		height: 100%;
	}
</style>
