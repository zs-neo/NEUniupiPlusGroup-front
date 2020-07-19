<template>
	<div class="privilegeManage">
		<div class="searchTab">
			<div class="searchContent">
				<el-form :inline="true" :model="formSearch" class="demo-form-inline">
				 <el-form-item label="用户名">
					<el-input v-model="formSearch.username" clearable></el-input>
				  </el-form-item>
				  <el-form-item label="权限">
				    <el-select v-model="formSearch.pid" placeholder="请选择检索的权限" clearable>
				      <el-option v-for="privilege in privileges" :label="privilege.pname" :value="privilege.pid"></el-option>	  
				    </el-select>
				  </el-form-item>
				  <el-form-item label="创建时间">
				      <el-date-picker
				          v-model="formSearch.time"
				          type="daterange"
						  value-format="yyyy-MM-dd"
				          range-separator="至"
				          start-placeholder="开始日期"
				          end-placeholder="结束日期">
				      </el-date-picker>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="onSubmit">查询</el-button>
				  </el-form-item>
				</el-form>
			</div>
			
		</div>
		<div class="funcTab">
			<div class="funcContent">
				<el-button size="medium" round type="danger" @click="handlerMultiDelete">批量删除</el-button>
			</div>
			
		</div>
		<div class="tableContent">
			<UpdatePrivilegeDialog :updatePrivilege="this.updatePrivilegeInfo" @F_SHOW_UPDATEPRIVILEGE="controlUpdatePrivilegeDialog" v-if="updatePrivilegeVisible"></UpdatePrivilegeDialog>
			<el-table :data="privilegeInfo" max-height=405px border stripe style="width: 100%;" ref="privilegesTable" @selection-change="handleSelectionChange">
			    <el-table-column type="selection" width="60" align="center">
			    </el-table-column>
			    <el-table-column prop="apid" label="编号" width="80" align="center" sortable>
			    </el-table-column>
			    <el-table-column prop="admin.username" label="用户名" align="center" width="180">
			    </el-table-column>
				<el-table-column prop="privilege.pname" label="权限" align="center" width="180">
			    </el-table-column>
				<el-table-column label="创建时间" prop="createdate" align="center" width="200">
				</el-table-column>
				<el-table-column label="创建员编号" prop="createadminid" align="center" width="100">
				</el-table-column>
				<el-table-column prop="valid" label="是否已启用" align="center" width="150">
					<template slot-scope="scope">
						<el-button size="mini" :style='scope.row.valid==1?validStyle:invalidStyle' disabled round>{{scope.row.valid==1?statusValid:statusInvalid}}</el-button>
					</template>
					
			    </el-table-column>
				
			    <el-table-column label="操作" align="center">
			        <template slot-scope="scope">
						<el-button size="mini" type="primary"　@click="changeStatus(scope.$index)" :icon="modifyIcon(scope.$index)" circle></el-button>
						<el-button size="mini" type="primary" @click="editPrivilege(scope.$index)" icon="el-icon-edit" circle></el-button>
						<el-button size="mini" type="primary" @click="deleteBtn(scope.$index)" icon="el-icon-delete" circle></el-button>
			        </template>
			    </el-table-column>
			</el-table>
		</div>
		<div class="pageTab">
			<el-pagination
			  background
			  layout="total, prev, pager, next"
			  :current-page="pageInfo.currentPage"
			   @current-change="handleCurrentChange"
			  :pageSize = "pageInfo.pageSize"
			  :total="pageInfo.total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import UpdatePrivilegeDialog from '../../../components/privilegePage/privilegeManage/UpdatePrivilegeDialog.vue';
	import { Loading } from 'element-ui';
	import Vue from 'vue';
  export default {
	  components:{UpdatePrivilegeDialog,},
	data() {
	  return {
		formSearch: {
		  pid: '',
		  time: '',
		  username: ''
		},
		pageInfo:{
			currentPage:1,
			total:0,
			pageSize:5,	
		},
		privilegeInfo:[
			
		], 
		//存储权限
		privileges:[],
		//更新用权限信息，点击edit后，赋值方法被触发，该属性被赋值
		updatePrivilegeInfo:{},
		privilge:{},//存储编辑的条目信息，将其传到更新信息组件中
		multipleSelection:[],//多选结果框
		statusValid: '已启用',
		statusInvalid: '已停用',
		validStyle: 'color:#fff;background-color: lightgreen;',
		invalidStyle: 'color:#fff;background-color: lightgray;',

		updatePrivilegeVisible: false, 
	  }
	},
	created() {
		this.searchAdmins();
		this.searchPrivileges();
	},
	methods: {
	
	  
	  //查找用户权限信息
	  searchAdmins(){
	  	let loadingInstance = Loading.service({text: '加载中'});	
	  	Vue.axios.get(`http://localhost:8081/ap/getAP/${this.pageInfo.currentPage}/${this.pageInfo.pageSize}`).then(rs=>{
	  		this.privilegeInfo = rs.data.list;
	  		this.pageInfo.total = rs.data.total;
	  		loadingInstance.close();
	  
	  	});
	  },
	  
	  //分页
	  handleCurrentChange(val){
	  	this.pageInfo.currentPage = val;	
	  	this.searchAdmins();
	  },
	  
	  //查找权限信息
	  searchPrivileges(resolve){
	  			
	  	Vue.axios.get(`http://localhost:8081/ap/getPrivileges`).then(rs=>{
	  		this.privileges = rs.data;
	  		console.log("privileges");
	  		if(resolve){
	  			resolve();
	  		}
	  		 
	  	});
	  },
	  handleSelectionChange(val) {
	      this.multipleSelection = val;
	  },
	  
	  editPrivilege(index){
		  this.updatePrivilegeInfo = this.$refs.privilegesTable.tableData[index];
		  this.updatePrivilegeVisible = true;
	  },
	  
	  controlUpdatePrivilegeDialog(status, valid){
		  this.updatePrivilegeVisible = status;
		  if(valid&&valid==1){
			  this.searchAdmins();
		  }
	  },
	  
	  //查询
	  onSubmit() {
	  		console.log('submit!');
	  		console.log(this.formSearch);
	  		var params=[];
	  		params.push(this.formSearch.pid);
	  		let adminid='';
	  		for(let i = 0;i<this.privilegeInfo.length;i++){
	  			if(this.privilegeInfo[i].admin.username==this.formSearch.username){
	  				adminid = this.privilegeInfo[i].admin.id;
	  				break;
	  			}
	  		}
			params.push(adminid);
	  		if(this.formSearch.time&&this.formSearch.time!=''){
	  			params.push(this.formSearch.time[0]);
	  			params.push(this.formSearch.time[1]);
	  		}else{
	  			params.push('');
	  			params.push('');
	  		}
	  		console.log(params);
	  		let loadingInstance = Loading.service({text: '加载中'});
	  		Vue.axios.post(`http://localhost:8081/ap/searchByVar`,params).then(rs=>{
	  			  this.privilegeInfo = rs.data;
	  			  loadingInstance.close(); 
	  			 
	  		});	
	  },
	  
	  //单条删除
	   deleteBtn(index){
	  	 let privilege = this.$refs.privilegesTable.tableData[index];
	  	 let arr = [privilege.apid];
	  	 this.deleteFunc(arr);
	   },
	   //多选删除
	   handlerMultiDelete(){
	  	 let arr=[];
	  	 for (let i = 0; i < this.multipleSelection.length; i++) {
	  	 	arr.push(this.multipleSelection[i].apid);
	  	 }
	  	  this.deleteFunc(arr);
	   },
	  deleteFunc(arr){
	  	this.$confirm("删除确认", "提示", {}).then(() => {
			console.log(arr);
	  		let loadingInstance = Loading.service({text: '加载中'});
			Vue.axios.post(`http://localhost:8081/ap/delete`,arr).then(rs=>{
	  		 
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
	  //用户角色状态改变
	  changeStatus(index){
		 let privilege = this.$refs.privilegesTable.tableData[index];
		 let hintMsg;
		 if(privilege.valid==0){
			 hintMsg="即将启用该用户";
		 }else{
			 hintMsg="即将禁用该用户";
		 } 
		 
		  this.$confirm(hintMsg, "提示", {}).then(() => {
			  if(privilege.valid==0){//复效
					privilege.valid=1;
			  }else{//失效
					privilege.valid = 0;
			  }
			  let loadingInstance = Loading.service({text: '加载中'});	
			  Vue.axios.post(`http://localhost:8081/ap/updateValid`,privilege).then(rs=>{
				  loadingInstance.close();
				 this.$message({
				   message: "更新成功",
				   type: "success"
				 });
			  });	
		  }).catch(()=>{
			  
		  });  			 	 
	  },
		
	  modifyIcon(index){
		  if(this.$refs.privilegesTable.tableData[index].valid==1){
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
		box-shadow: #000000;
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
	.pageTab{
		flex: 1;
		width: 98%;
		margin: auto;
		margin-top: 5px;
		margin-bottom: 5px;
		background-color: #F0F7FF;
		border-radius: 8px;
	}
</style>
