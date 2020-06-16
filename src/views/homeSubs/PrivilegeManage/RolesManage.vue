<template>
	<div class="privilegeManage">
		<div class="searchTab">
			<div class="searchContent">

				<el-form :inline="true" :model="formSearch" max-height=400px class="demo-form-inline" style="height: fit-content;">
	
				</el-form>
			</div>

		</div>
		<div class="funcTab">
			<div class="funcContent">

				<el-button size="medium" round type="danger">批量删除</el-button>
			</div>

		</div>
		<div class="tableContent">
			<el-table :data="roleInfo" border stripe style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="60" align="center">
				</el-table-column>
				<el-table-column prop="pic" label="头像" align="center" width="150">

				</el-table-column>
			   
			    <el-table-column prop="id" label="编号" width="100" align="center" sortable>
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

				
				<el-table-column label="创建时间" prop="createtime" align="center" width="120">
					<!-- <el-date-picker
				        v-model="roleInfo.createtime"
				        type="date"
				        placeholder="创建日期">
				    </el-date-picker> -->
				</el-table-column>
			>
						<el-button size="mini" type="primary" :icon="modifyIcon(scope.$index)" circle></el-button>
						<el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
						<el-button size="mini" type="primary" icon="el-icon-delete" circle></el-button>
			
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pageTab">
		
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
				pageInfo: {
					currentPage: 1,
					total: 100,
					pageSize: 20,
				},
				roleInfo: [{
						pic: '',
						id: 1,
						username: "admin",
						phone: '13200000000',
						rolename: '超级管理员',
						status: 1,
						createtime: '2020-06-14',
					},
					{
						pic: '',
						id: 2,
						username: "xiaxia",
						phone: '13200000001',
						rolename: '数据统计师',
						status: 0,
						createtime: '2020-06-14',
					},

				],
				multipleSelection: [],
				loading: true,
				valid: '已启用',
				invalid: '已停用',
				validStyle: 'color:#fff;background-color: lightgreen;',
				invalidStyle: 'color:#fff;background-color: lightgray;',
			};
		},
		
	
		
	}
</script>

<style>

	.privilegeManage {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}


	.privilegeManage .searchTab {
		flex: 1;
		background-color: #42B983;
	}


	.privilegeManage .funcTab {
		flex: 1;
		background-color: #CAC6C6;
	}


	.privilegeManage .tableContent {
		flex: 8;
		background-color: lightsalmon;
		overflow: auto;
	}


	.privilegeManage .pageTab {
		flex: 1;
		background-color: aqua;
	}

	.searchContent {
		margin-top: 20px;
	}


	.funcContent {
		margin-top: 6px;
		margin-left: 10px;
		width: fit-content;
	}

</style>
