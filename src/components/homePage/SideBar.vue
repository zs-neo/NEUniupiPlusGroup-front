<template>

	<div class="sideBar" v-if="staff">

		<transition name="el-zoom-in-center" >
			<el-menu
			  :collapse="collapse"
			  @open="handleOpen"
			  @close="handleClose"
			  :style='style'
			  class="sidebar-el-menu"  
			  background-color="#324157"
			  text-color="#bfcbd9" 
			  active-text-color="#20a0ff"  
			  :router="true"
			  :unique-opened=true>
	
			  
			  <el-submenu index="1" v-if='check("美食管理")||check("美食类别管理")'>

				<template slot="title">

				  <i class="el-icon-fork-spoon"></i>
				  <span>美食信息管理</span>
				</template>
				  
				

				  <el-menu-item index='/home/foodManage' v-if='check("美食管理")'>
					  <span>美食管理</span>
				  </el-menu-item>
				  <el-menu-item index='/home/foodtypeManage' v-if='check("美食类别管理")'>
					  <span>美食类别管理</span>
				  </el-menu-item>
			   </el-submenu>
	
				   <el-submenu index="2" v-if='check("限时活动")||check("优惠管理")'>
					<template slot="title">
					  <i class="el-icon-document"></i>
					  <span>活动管理</span>
					</template>
					
	
					  <el-menu-item index="/home/EventsManage" v-if='check("限时活动")'>
						  <span>限时活动</span>
					  </el-menu-item>
		
					  <el-menu-item index="/home/countManage" v-if='check("优惠管理")'>
						  <span>优惠管理</span>
					  </el-menu-item>
				   </el-submenu>

			  <el-menu-item index="3" v-if='check("系统安全维护")'>
				<i class="el-icon-lock"></i>
				<span slot="title">系统安全维护</span>
			  </el-menu-item>
	
			  <el-menu-item index="/home/orderManage" v-if='check("订单管理")'>
				<i class="el-icon-goods"></i>
				<span slot="title">订单管理</span>
			  </el-menu-item>
		
			  <el-submenu index="5" v-if='check("角色管理")||check("权限管理")'>
				<template slot="title">
					<i class="el-icon-user"></i>
					<span slot="title">角色和权限管理</span>
				</template>

				<el-menu-item v-if='check("角色管理")' index="/home/rolesManage">
					<span>角色管理</span>
				</el-menu-item>

				<el-menu-item index="/home/privilegeManage" v-if='check("权限管理")'>
					<span>权限管理</span>
				</el-menu-item>
			  </el-submenu>
	
			  <el-submenu index="6" v-if='check("流量统计")||check("财务报表")'>
				<template slot="title">
					<i class="el-icon-files"></i>
					<span slot="title">统计报表</span>
				</template>

				<el-menu-item v-if='check("财务报表")' index="/home/statisticsManage">
					<span>财务报表</span>
				</el-menu-item>
	
				<el-menu-item v-if='check("流量统计")' index="/home/flowManage">
					<span>流量统计</span>
				</el-menu-item>
			</el-submenu>
			</el-menu>
		</transition>
	</div>
</template>

<script>

	import bus from '../../Bus.js';
	import AdminService from '../../views/homeSubs/AdminService.js';
	export default{
		data(){
			
			return{
				privileges:[],
				collapse: false,
				style:'',
				staff: true,
				
			};
			
		},
		created() {
			AdminService.getLoginAdmin(rs=>{
				let parr = [];
				if(rs.aps.length==0){
					this.staff = false;
				}
				for (let i = 0;i < rs.aps.length;i++) {
					let  adminPrivilege = rs.aps[i];
					console.log(adminPrivilege);
					parr.push(adminPrivilege.privilege.pname);
				}
				this.privileges = parr;
				console.log(this.privileges);
			}),
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
			check(pname){
				console.log(this.privileges);
				for( let privilege of this.privileges){
					console.log(privilege);
					if(privilege==pname){
						return true;
					}
				}
				return false;
			},
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
