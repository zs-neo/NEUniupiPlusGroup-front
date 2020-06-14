<template>
	<div class="privilegeManage">
		<div class="searchTab">
			<div class="searchContent">
				<el-form :inline="true" :model="formSearch" class="demo-form-inline" style="height: fit-content;">
				  <el-form-item label="角色">
				    <el-select v-model="formSearch.role" placeholder="请选择检索的角色">
				      <el-option label="美食管理员" value="food"></el-option>
				      <el-option label="活动运维员" value="event"></el-option>
				      <el-option label="网络安全工程师" value="safety"></el-option>
				      <el-option label="销售员" value="sale"></el-option>
				      <el-option label="数据统计师" value="data"></el-option>
				      <el-option label="超级管理员" value="superAdmin"></el-option>		  
				    </el-select>
				  </el-form-item>
				  <el-form-item label="创建时间">
				      <el-date-picker
				          v-model="formSearch.createTime"
				          type="daterange"
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
				<el-button size="medium" round type="primary" >新增</el-button>
				<el-button size="medium" round type="danger">批量删除</el-button>
			</div>
			
		</div>
		<div class="tableContent">
			<el-table :data="roleInfo"  border stripe style="width: 100%" @selection-change="handleSelectionChange">
			    <el-table-column type="selection" width="60" align="center">
			    </el-table-column>
				<el-table-column prop="pic" label="头像" align="center" width="150">
				     <template slot-scope="scope" align="center" width="150">
				        <img :src="scope.row.pic" />
				    </template>
				</el-table-column>
			    <el-table-column prop="id" label="id" width="100" align="center" sortable>
			    </el-table-column>
			    <el-table-column prop="username" label="用户名" align="center" width="150">
			    </el-table-column>
			    
			     <el-table-column prop="phone" label="手机" align="center" width="150">
			    </el-table-column>
				<el-table-column prop="rolename" label="角色" align="center" width="150">
					
			    </el-table-column>
				<el-table-column prop="status" label="是否已启用" align="center" width="120">
					<template slot-scope="scope">
						<el-button size="mini" :style='scope.row.status==1?validStyle:invalidStyle' disabled round>{{scope.row.status==1?valid:invalid}}</el-button>
					</template>
					
			    </el-table-column>
				<el-table-column label="创建时间" prop="createtime" align="center" width="120">
				    <!-- <el-date-picker
				        v-model="roleInfo.createtime"
				        type="date"
				        placeholder="创建日期">
				    </el-date-picker> -->
				</el-table-column>
			    <el-table-column label="操作" align="center">
			        <template slot-scope="scope">
						<el-button size="mini" type="primary" :icon="modifyIcon(scope.$index)" circle></el-button>
						<el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
						<el-button size="mini" type="primary" icon="el-icon-delete" circle></el-button>
			        </template>
			    </el-table-column>
			</el-table>
		</div>
		<div class="pageTab">
			<el-pagination
			  background
			  layout="total, prev, pager, next"
			  :current-page="pageInfo.currentPage"
			  :pageSize = "pageInfo.pageSize"
			  :total="pageInfo.total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
  export default {
	data() {
	  return {
		formSearch: {
		  role: '',
		  createTime: ''
		},
		pageInfo:{
			currentPage:1,
			total:100,
			pageSize:20,	
		},
		roleInfo:[
			{
			pic:'',
			id:1,
			username:"admin",
			phone:'13200000000',
			rolename:'超级管理员',
			status:1,
			createtime:'2020-06-14',},
			{
			pic:'',
			id:2,
			username:"xiaxia",
			phone:'13200000001',
			rolename:'数据统计师',
			status:0,
			createtime:'2020-06-14',},
			
		], 
		multipleSelection:[],
		loading: true,
		valid: '已启用',
		invalid: '已停用',
		validStyle: 'color:#fff;background-color: lightgreen;',
		invalidStyle: 'color:#fff;background-color: lightgray;',
	  }
	},
	methods: {
	  onSubmit() {
		console.log('submit!');
	  },
	  handleSelectionChange(val) {
	      this.multipleSelection = val;
	  },
	  modifyIcon(index){
		  if(this.roleInfo[index].status==1){
			  return 'el-icon-remove-outline';
		  }else{
			  return 'el-icon-circle-check';
		  }
	  }
	}
  }
</script>

<style>
	.privilegeManage{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	.privilegeManage .searchTab{
		flex: 1;
		background-color: #42B983;
	}
	.privilegeManage .funcTab{
		flex: 1;
		background-color: #CAC6C6;
	}
	.privilegeManage .tableContent{
		flex: 8;
		background-color: lightsalmon;
	}
	.privilegeManage .pageTab{
		flex: 1;
		background-color: aqua;
	}
	.searchContent{
		margin-top: 20px;
	}
	.funcContent{
		margin-top: 6px;
		margin-left: 10px;
		width: fit-content;
	}
	.pageTab{
		
	}
</style>
