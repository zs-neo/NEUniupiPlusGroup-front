<template>
	<div class="privilegeManage">
		<div class="searchTab">
			<div class="searchContent">
				<el-form :inline="true" :model="formSearch" max-height=400px class="demo-form-inline" style="height: fit-content;">

				  <el-form-item label="用户名ID">
					<el-input placeholder="请输入用户名ID" v-model="value"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="onSubmit">查询</el-button>
				  </el-form-item>
				</el-form>
			</div>
			
		</div>
		<div class="funcTab">
			
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
			    <el-table-column prop="id" label="编号" width="100" align="center" sortable>
			    </el-table-column>
			    <el-table-column prop="userid" label="用户名ID" align="center" width="150">
			    </el-table-column>
				<el-table-column prop="banreason" label="封禁理由" align="center" width="150">
				</el-table-column>
			    <el-table-column prop="status" label="是否已封禁" align="center" width="120">
			    	<template slot-scope="scope">
			    		<el-button size="mini" :style='scope.row.status==1?validStyle:invalidStyle' disabled round>{{scope.row.status==1?valid:invalid}}</el-button>
			    	</template>
			    	
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
		value:'',
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
			userid:"admin",
			banreason:'13200000000',
			status:0,
			},
			{
			pic:'',
			id:1,
			userid:"admin",
			banreason:'13200000000',
			status:0,
			},
			
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

<style scoped>
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
		overflow: auto;
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
