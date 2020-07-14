<template>
	
		<el-dialog  :close-on-click-modal="false"  :visible.sync="addPrivilegeVisible">
			<template slot="title">
				<el-card shadow="hover" style="box-shadow:-2px -2px 6px lightblue inset;">
				 <div class='titleStyle'>权限更新</div>    
				 </el-card>
			</template>  
			<el-card shadow="hover" style="margin-top: -30px;">
				<el-form :inline="true" status-icon :model="updatePrivilegeInfo" label-width="80px" ref="addPrivilegeForm" style="text-align: left;">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="updatePrivilegeInfo.admin.username" disabled auto-complete="off"></el-input>
					</el-form-item>
					&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
					<el-form-item label="姓名" prop="realName" >	
						<el-input v-model="updatePrivilegeInfo.admin.realname" disabled auto-complete="off"></el-input>
					</el-form-item>	
				</el-form>
			</el-card>
		
				<div class="updatePrivilegeArea">
					<div class="showRolesArea">
						<div>角色权限</div>
						<div class="showRolesContent">
							<el-tree 
							:data="roles" 
							:props="propsConfig" 
							accordion
							@node-click="handleNodeClick">	
							</el-tree>
						</div>
					</div>
					<!-- <div class="showPrivilgesArea">
						<div>权限</div>
						<div class="showPrivilegessContent"></div>
					</div> -->
					<div class="chooseArea">
						<div>选择</div>
						<div class="chooseContent">
							<el-tag
							  style="width: 185px;"
							  v-for="privilege in choosePrivileges"
							  :key="privilege.pid"
							  closable
							  @close="handleDeleteChose(privilege)"
							  type="info">
							  {{privilege.rname}}
							</el-tag>
						</div>
					</div>
				</div>
	
			<!-- <el-form-item label="角色" prop="privilege">	
						<el-select v-model="addPrivilege.privilege" placeholder="请选择" clearable>
						<el-option  v-for="privilege in privilegeOptions"   :key="privilege.value"  :label="privilege.name"  :value="privilege.value" ></el-option>
						</el-select>
					</el-form-item> -->
			<div slot="footer" class="dialog-footer" align="center">
				<el-card shadow="hover" style="margin-top: -30px;">
					<el-button @click="cancleAddPrivilege" style="margin-right: 200px;">取消</el-button>
					<el-button type="primary" @click="updatePrivilegeSubmit" >提交</el-button>
				</el-card>
			</div>	
			
		</el-dialog>
	
</template>

<script>
	import { Loading } from 'element-ui';
	import Vue from 'vue';
	export default{
		props:{
			//privilegeOptions:{},
			updatePrivilege:{},
		},
		data(){
			return{
				updatePrivilegeInfo:{},
				addPrivilegeVisible:true,
				addPrivilege:{
					userName:'',
					realName:'',
					privilege:''
				},
				//用户信息，包括用户名，真实姓名等信息，用于证实用户名输入无误
				userInfo:[],

				addPrivilegeLoading:false,
				roles:[
					// {name:"菜单管理员",privileges:[{name:"菜品管理",},{name:"类别管理"}]},
					// {name:"菜单管理员",privileges:[{name:"菜品管理",},{name:"类别管理"}]},
					// {name:"菜单管理员",privileges:[{name:"菜品管理",},{name:"类别管理"}]},
					// {name:"菜单管理员",privileges:[{name:"菜品管理",},{name:"类别管理"}]},
					// {name:"菜单管理员",privileges:[{name:"菜品管理",},{name:"类别管理"}]},
				],
				choosePrivileges:[],
				propsConfig:{
					children: 'xtbl',
					label: 'rname'
				}
			};
		},
		created(){
			//序列化和反序列化用户信息，避免引用传递
			var obj = JSON.stringify(this.updatePrivilege);
			this.updatePrivilegeInfo = JSON.parse(obj);
			this.searchRolesWithDetails();
			this.selectAdminPrivileges();
			
		},
		
		methods:{
			//查找已有的权限
			selectAdminPrivileges(){
				let params=['', this.updatePrivilegeInfo.admin.id,'',''];
				let loadingInstance = Loading.service({text: '加载中'});
				Vue.axios.post(`http://localhost:8081/ap/searchByVar`,params).then(rs=>{
					  //this.privilegeInfo = rs.data;
					  
					  console.log(rs.data);
					  for(let i = 0;i<rs.data.length;i++){
						  this.choosePrivileges.push({
							  pid: rs.data[i].privilege.pid,
							  rname: rs.data[i].privilege.pname
						  });
					  }
				});	
				loadingInstance.close();  
			},
			searchRolesWithDetails(){
				let loadingInstance = Loading.service({text: '加载中'});
				Vue.axios.get(`http://localhost:8081/ap/getRolesWithDetails`).then(rs=>{
					this.roles = rs.data;
					console.log(this.roles);
					loadingInstance.close();
					this.handlerRoles();
				});
			},
			
			//处理roles
			handlerRoles(){
				let loadingInstance = Loading.service({text: '加载中'});
				let roles = this.roles;
				for(let j = 0;j<roles.length;j++){
					let rolesdetails = roles[j].roledetails;
					let privileges = [];
					for(let i=0;i<rolesdetails.length;i++){
						privileges.push({
							pid: rolesdetails[i].privilege.pid,
							rname: rolesdetails[i].privilege.pname
						});
					}
					roles[j].xtbl = privileges
					console.log(privileges);
				}
				console.log(roles);
				this.roles = roles;
				loadingInstance.close();
			},
			cancleAddPrivilege(){
				this.$emit("F_SHOW_UPDATEPRIVILEGE", false);
			},
			//选择权限
			handleNodeClick(data) {
				if(!data.xtbl){//判断是否为叶子节点
					if(this.choosePrivileges.indexOf(data)==-1&&!this.checkPrivilegeRepeat(data)){//判断是否已经存在了
						this.choosePrivileges.push(data);
						console.log(data);
					}
				}
			  },
			  
			  //判断该权限是否已经存在了
			  checkPrivilegeRepeat(data){
				for(let i=0;i<this.choosePrivileges.length;i++){
					if(this.choosePrivileges[i].rname===data.rname){
						console.log(this.choosePrivileges[i]);
						console.log(data);
						return true;
					}
				}  
				return false;
			  },
			  
			  
			//删除选择框中的权限
			handleDeleteChose(privilege){
				console.log(privilege);
				this.choosePrivileges.pop(privilege);
			},

			//更新权限
			updatePrivilegeSubmit:function(){
				
				for(let i=0;i<this.choosePrivileges.length;i++){
					this.choosePrivileges[i].adminid = this.updatePrivilegeInfo.adminid;
					this.choosePrivileges[i].privilegeid = this.choosePrivileges[i].pid;
				}
				console.log(this.choosePrivileges);
				this.$confirm("确认提交吗？", "提示", {}).then(() => {
				  let loadingInstance = Loading.service({text: '加载中'});	
				  
				  if(this.choosePrivileges.length==0){
					  Vue.axios.get(`http://localhost:8081/ap/deleteByAdmin/this.updatePrivilegeInfo.adminid`).then(rs=>{
					  	this.$message({
					  		message:"更新成功, 重新登录后生效",
					  		type:'success'
					  	});
					  	this.$emit("F_SHOW_UPDATEPRIVILEGE", false,1);
					  });	
				  }else{
					  Vue.axios.post(`http://localhost:8081/ap/updatePrivilegeSet`, this.choosePrivileges).then(rs=>{
						
						this.$message({
							message:"更新成功",
							type:'success'
						});
						this.$emit("F_SHOW_UPDATEPRIVILEGE", false,1);
					});	
				  }
						
					
					loadingInstance.close();
				}).catch(()=>{
				  this.$message({
					   type: 'info',
					   message: '已取消'
				   });  
				});
				
				 
			},
		}
	}
</script>


<!-- TODO 调整title -->



<style scoped>
	.el-tree{
		background-color: transparent;
		color: grey;
	}

/* 	.el-tree-node__content .el-tree-node__label{
		font-size: ;
	} */
	.el-dialog__headerbtn{
		display: none;
	}
	ui li{
		list-style-type:none;
	}
	.titleStyle{
		text-align: center;
		color: lightskyblue;
		font-family:'Courier New';
		font-size: 25px;
		height: fit-content
	}
	.updatePrivilegeArea{
		height: 230px;
		border-radius: 8px;
		border: lightgray solid 1px;
		margin-top: 5px;
		
	}
	.updatePrivilegeArea:hover{
		background-color: #FFF1F0;
	}
	.showRolesArea{
		height: inherit;
		width: 260px;
		margin-right: 50px;
		display: inline-block;
	}
	.showRolesContent{
		height: 200px;
		margin-top: 5px;

		margin-right: 5px;
		margin-bottom: 5px;
		border-left: lightpink solid 3px;
		border-bottom: lightpink solid 1px;
		border-top: lightpink solid 1px;
		overflow: auto;
		
	}

	.chooseArea{
		height: inherit;
		width: 230px;
		display: inline-block;
		margin-left: 20px;
	}
	.chooseContent{
		height: 200px;
		margin-top: 5px;
		margin-right: 5px;
		margin-bottom: 5px;
		border-left: lightblue solid 3px;
		border-bottom: lightblue solid 1px;
		border-top: lightblue solid 1px;
		overflow: auto;
	}
	
	
	/* .showPrivilgesArea{
		height: inherit;
		width: 160px;
		margin-right: 5px;
		display: inline-block;
		background-color: lightblue;
	}
	.showPrivilegessContent{
		height: 200px;
		margin-top: 5px;
		margin-left: 2px ;
		margin-right: 2px;
		border-radius: 8px;
		box-shadow:-1px -1px 2px lightgreen inset;
		overflow: auto;
	} */
</style>
