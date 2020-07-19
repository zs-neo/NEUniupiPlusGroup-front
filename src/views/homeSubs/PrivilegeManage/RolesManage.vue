<template>
	<div class="privilegeManage">
		
		<div class="searchTab">
			<div class="searchContent">
				<el-form :inline="true" :model="formSearch" class="demo-form-inline">
				  <el-form-item label="角色">
				    <el-select v-model="formSearch.roleid" placeholder="请选择检索的角色" clearable>
				      <el-option v-for="role in this.roles" :key="role.rid" :label="role.rname" :value="role.rid" ></el-option>		  
				    </el-select>
				  </el-form-item>
				  <el-form-item label="创建时间">
				      <el-date-picker
				          v-model="formSearch.createtime"
				          type="daterange"
						  value-format="yyyy-MM-dd"
				          range-separator="至"
				          start-placeholder="开始日期"
				          end-placeholder="结束日期">
				      </el-date-picker>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="onSearch">查询</el-button>
				  </el-form-item>
				</el-form>
			</div>
			
		</div>
		<div class="funcTab">
			<div class="funcContent">
				<el-button size="medium" round type="primary" @click="handleAddUser">新增用户</el-button>
				<!-- <el-button size="medium" round type="info" @click="handleAddRole">添加角色</el-button> -->
				<el-button size="medium" round type="danger" @click="handlerMultiDelete">批量删除</el-button>
			</div>
			
		</div>
		<div class="tableContent">
			<AddUserDialog v-if="addUserVisible" :userNameSet="this.userNameSet" :roles="this.roles" :depts="this.depts" @F_SHOW_ADDUSER="controlAddUserDialog"></AddUserDialog>
			<AddRoleDialog v-if="addRoleVisible" :userNameSet="this.roles" :roleOptions="this.roles" @F_SHOW_ADDROLE="controlAddRoleDialog"></AddRoleDialog>
			<UpdateUserDialog v-if="updateUserVisible" :updateUser="updateUserInfo" :depts="this.depts" :roles="this.roles" @F_SHOW_UPDATEUSER="controlUpdateUserDialog"></UpdateUserDialog>
			<el-table :data="roleInfo" max-height=400px stripe border stripe style="width: 100%" ref="rolesTable" @selection-change="handleSelectionChange">
			    <el-table-column type="selection" width="60" align="center">
			    </el-table-column>
			    <el-table-column prop="id" label="编号" width="100" align="center" sortable>
			    </el-table-column>
			    <el-table-column prop="username" label="用户名" align="center" width="150">
			    </el-table-column>
			    <el-table-column prop="realname" label="姓名" align="center" width="100">
			    </el-table-column>
			     <el-table-column prop="phone" label="手机" align="center" width="150">
			    </el-table-column>
				<el-table-column prop="role.rname" label="角色" align="center" width="150">
					
			    </el-table-column>
				
				<el-table-column prop="dept.dname" label="部门" align="center" width="120">
					
				</el-table-column>
				<el-table-column prop="status" label="是否已启用" align="center" width="120">
					<template slot-scope="scope">
						<el-button size="mini" :style='scope.row.status==1?validStyle:invalidStyle' disabled round>{{scope.row.status==1?valid:invalid}}</el-button>
					</template>
					
			    </el-table-column>
				<el-table-column label="创建时间" prop="createdate" align="center" width="100">
				    <!-- <el-date-picker
				        v-model="roleInfo.createtime"
				        type="date"
				        placeholder="创建日期">
				    </el-date-picker> -->
				</el-table-column>
			    <el-table-column label="操作" align="center">
			        <template slot-scope="scope">
						<el-button size="mini" type="primary" @click="changeStatus(scope.$index)" :icon="modifyIcon(scope.$index)" circle></el-button>
						<el-button size="mini" type="primary" @click="editBtn(scope.$index)" icon="el-icon-edit" circle></el-button>
						<el-button size="mini" type="primary" @click="deleteBtn(scope.$index)" icon="el-icon-delete" circle></el-button>
			        </template>
			    </el-table-column>
			</el-table>
		</div>
		<div class="pageTab">
			<el-pagination
			  background
			  @current-change="handleCurrentChange"
			  layout="total, prev, pager, next"
			  :current-page="pageInfo.currentPage"
			  :pageSize = "pageInfo.pageSize"
			  :total="pageInfo.total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import AddUserDialog from '../../../components/privilegePage/roleManage/AddUserDialog.vue';
	import AddRoleDialog from '../../../components/privilegePage/roleManage/AddRoleDialog.vue';
	import UpdateUserDialog from '../../../components/privilegePage/roleManage/UpdateUserDialog.vue';
	import Vue from 'vue';
	import { Loading } from 'element-ui';
  export default {
	components:{AddRoleDialog, AddUserDialog, UpdateUserDialog},
	data() {
		
		 
	  return {
		roles:[

		],
		depts:[

		],
		userNameSet:[],
		formSearch: {
		  roleid: '',
		  createtime: ''
		},
		pageInfo:{
			currentPage:1,
			total:0,
			pageSize:5,	
		},
		roleInfo:[
			
		], 
		
		//当更新用户信息时，为改属性赋值，然后将其传到子组件中
		updateUserInfo:{},
		
		
		//以下控制三个组建的显示状态
		addUserVisible:false,
		addRoleVisible:false,
		updateUserVisible:false, 
		
		userNameSetReady : false,
		rolesReady: false,
		deptsReady: false,

		
		
		multipleSelection:[],
		valid: '已启用',
		invalid: '已停用',
		validStyle: 'color:#fff;background-color: lightgreen;',
		invalidStyle: 'color:#fff;background-color: lightgray;',
	  }
	},
	created(){
		this.searchAdmins();
		this.searchRoles();
	},
	methods: {
		//查找用户信息
		searchAdmins(){
			let loadingInstance = Loading.service({text: '加载中'});	
			Vue.axios.get(`http://localhost:8081/admin/getAdmins/${this.pageInfo.currentPage}/${this.pageInfo.pageSize}`).then(rs=>{
				this.roleInfo = rs.data.list;
				this.pageInfo.total = rs.data.total;
				loadingInstance.close();

			});
		},
		//查找角色信息
		searchRoles(resolve){
					
			Vue.axios.get(`http://localhost:8081/role/getRoles`).then(rs=>{
				this.roles = rs.data;
				this.rolesReady = true;
				console.log("roles");
				if(resolve){
					resolve();
				}
				 
			});
		},
		
		//查找部门信息
		searchDepts(resolve){
			Vue.axios.get(`http://localhost:8081/dept/getDepts`).then(rs=>{
				this.depts = rs.data;
				this.deptsReady = true;
				console.log("depts");
				resolve(); 
			});
		},
		//查找用户名集
		searchUserNameSet(resolve){
			Vue.axios.get(`http://localhost:8081/admin/getUserName`).then(rs=>{
				this.userNameSet = rs.data;
				this.userNameSetReady = true;
				console.log("nameset");
				resolve(); 
			});
		},
		//分页
		handleCurrentChange(val){
			this.pageInfo.currentPage = val;	
			this.searchAdmins();
		},
		//添加用户
		handleAddUser: function() {
		  let loadingInstance = Loading.service({text: '加载中'});
		  
		  var s1 = new Promise((resolve)=>{this.searchUserNameSet(resolve);});
		  var s2 = new Promise((resolve)=>{this.searchDepts(resolve);});
		  var s3 = new Promise((resolve)=>{this.searchRoles(resolve);});
		  // this.searchUserNameSet();
		  // this.searchDepts();
		  // this.searchRoles();
		  // while(!this.userNameSetReady||!this.deptsReady||!this.rolesReady);
		  Promise.all([s1,s2,s3]).then(()=>{
			  loadingInstance.close();
		  // this.userNameSetReady =false;
		  // this.deptsReady=false;
		  // this.rolesReady=false;		  
		  this.addUserVisible = true;
		  });
		 
		  
		  
		},
		controlAddUserDialog:function(status, valid){
			this.addUserVisible = status;
			if(valid && valid == 1){
				this.searchAdmins();
			}
		},
		//添加角色
		handleAddRole: function() {
			 let loadingInstance = Loading.service({text: '加载中'});
			
			var s1 = new Promise((resolve)=>{this.searchUserNameSet(resolve);});
			var s2 = new Promise((resolve)=>{this.searchRoles(resolve);});
			// this.searchUserNameSet();
			// this.searchDepts();
			// this.searchRoles();
			// while(!this.userNameSetReady||!this.deptsReady||!this.rolesReady);
			Promise.all([s1,s2]).then(()=>{
				
				console.log(this.userNameSet);
				console.log(this.roles);
				loadingInstance.close();
			// this.userNameSetReady =false;
			// this.deptsReady=false;
			// this.rolesReady=false;		  
				this.addRoleVisible = true;
			});
			
			// this.searchUserNameSet();
			// this.searchRoles();
			
			// while(!this.userNameSetReady||!this.rolesReady);
			// loadingInstance.close();
			//   this.userNameSetReady =false;
			//   this.rolesReady=false;		  
			//   this.addRoleVisible = true;
			
		  
		},
		controlAddRoleDialog(status, valid){
			this.addRoleVisible = status;
			if(valid && valid == 1){
				this.searchAdmins();
			}
		},
		  
		  
		 //用户角色状态改变
		 changeStatus(index){
			 let role = this.$refs.rolesTable.tableData[index];
			 let hintMsg;
			 if(role.status==0){
				 hintMsg="即将启用该用户";
			 }else{
				 hintMsg="即将禁用该用户";
			 }
			 
			 
			  this.$confirm(hintMsg, "提示", {}).then(() => {
				  if(role.status==0){//复效
				  		role.status=1;
				  }else{//失效
				  		role.status = 0;
				  }
				  let loadingInstance = Loading.service({text: '加载中'});	
				  Vue.axios.post(`http://localhost:8081/admin/updateStatus`,role).then(rs=>{
					  loadingInstance.close();
				  	 this.$message({
				  	   message: "更新成功",
				  	   type: "success"
				  	 });
				  });	
			  }).catch(()=>{
				  
			  });

			 
			 
		 },
		 
		 //更新用户信息
		 editBtn(index){
			 let loadingInstance = Loading.service({text: '加载中'});
			 
			 var s1 = new Promise((resolve)=>{this.searchDepts(resolve);});
			 var s2 = new Promise((resolve)=>{this.searchRoles(resolve);});
			 // this.searchUserNameSet();
			 // this.searchDepts();
			 // this.searchRoles();
			 // while(!this.userNameSetReady||!this.deptsReady||!this.rolesReady);
			 Promise.all([s1,s2]).then(()=>{
			 	loadingInstance.close();
			 	console.log(this.depts);
			 	console.log(this.roles);
			 	
				this.updateUserInfo = this.$refs.rolesTable.tableData[index];
				this.updateUserVisible = true;
			 });
			 
			 
		 },
		 controlUpdateUserDialog(status, valid){
			 this.updateUserVisible = status;
			 if(valid && valid == 1){
			 	this.searchAdmins();
			 }
		 },
		 //单条删除
		 deleteBtn(index){
			 let role = this.$refs.rolesTable.tableData[index];
			 let arr = [role.id];
			 this.deleteFunc(arr);
		 },
		 //多选删除
		 handlerMultiDelete(){
			 let arr=[];
			 for (let i = 0; i < this.multipleSelection.length; i++) {
			 	arr.push(this.multipleSelection[i].id);
			 }
			  this.deleteFunc(arr);
		 },
		deleteFunc(arr){
			this.$confirm("删除确认", "提示", {}).then(() => {
				let loadingInstance = Loading.service({text: '加载中'});
			  Vue.axios.post(`http://localhost:8081/admin/delete`,arr).then(rs=>{
				 
				  loadingInstance.close(); 
				  this.searchAdmins();
				 this.$message({
				   message: "删除成功",
				   type: "success"
				 });			 
			  });	
			}).catch(()=>{
							  
			});
		},
		
	  onSearch() {
		console.log('submit!');
		console.log(this.formSearch);
		let loadingInstance = Loading.service({text: '加载中'});
		Vue.axios.post(`http://localhost:8081/admin/selectByVar`,this.formSearch).then(rs=>{
			  this.roleInfo = rs.data;
			  loadingInstance.close(); 
			 
		});	
	  },
	  //批量删除执行方法
	  handleSelectionChange(val) {
	      this.multipleSelection = val;
	  },
	  //角色条目是否有效--取决于
	  modifyIcon(index){
		  if(this.$refs.rolesTable.tableData[index].status==1){
			  return 'el-icon-remove-outline';
		  }else{
			  return 'el-icon-circle-check';
		  }
	  }
	}
  }
</script>

<style scoped>
	
	.privilegeManage{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	.privilegeManage .searchTab{
		flex: 1;
		width: 98%;
		border-radius: 8px;
		border: lightgoldenrodyellow 1px solid;
		margin: auto;
		background-color: #FFF1F0;
		margin-top: 2px;
		margin-bottom: 2px;
		height: 60px;
		box-shadow:-2px -2px 6px lightblue inset;
	}
	.searchContent{
		padding-top:10px;
		
	}
	.searchTab :hover{
			/* background-color: #FFFFFF; */
		}
	
	.privilegeManage .funcTab{
		width: 98%;
		margin: auto;
		flex: 1;
		margin-top: 2px;
		margin-bottom: 2px;
		border-radius: 8px;
		box-shadow:-2px -2px 6px lightblue inset;
		background-color: #FFF1F0;
	}
	.funcTab:hover{
		background-color: #FFFFFF;
	}
	.funcContent{
		margin-top: 8px;
		margin-left: 10px;
		width: fit-content;
	}
	.privilegeManage .tableContent{
		flex: 8;
		background-color: #FFF1F0;
		width: 98%;
		margin: auto;
		margin-top: 2px;
		overflow: auto;
	}
	.privilegeManage .pageTab{
		flex: 1;
		margin-top: 5px;
		background-color: #F0F9EB;
	}

</style>
