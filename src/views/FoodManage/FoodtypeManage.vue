<template>
	<div>
		<div>
			<el-row>
			<el-input v-model="input" placeholder="请输入内容" style="width: 300px;"></el-input>
			<el-button type="primary" icon="el-icon-search">搜索</el-button>
			<el-button type="primary" @click="" icon="el-icon-circle-plus-outline">添加</el-button>
			</el-row>
			
		</div>
		<div class="home_content_2">
			<div class="home_content_left_2">
				<el-table
				  :data="ftableData"
				  style="width: 320px"
				  :default-sort = "{prop: 'ftid', order: 'ascending'}"
				  >
				  <el-table-column
					align="center"
					prop="ftid"
					label="编号"
					sortable
					width="80">
				  </el-table-column>
				  <el-table-column
					align="center"
					prop="ftname"
					label="名称"
					width="80">
				  </el-table-column>
				  <el-table-column
					align="center"
					label="状态"
					width="80">
					<template slot-scope="scope">
						<el-button size="mini" @click='reverse1(scope.row)' :style='scope.row.ftused==1?validStyle:invalidStyle' round>{{scope.row.ftused==1?valid:invalid}}</el-button>
					</template>
				  </el-table-column>
				  <el-table-column
					align="center"
				  	label="操作"
				  	width="80">
				  	<template slot-scope="scope">
				  		<el-button size='mini' type='primary' circle :class='style1' @click="displaySt(scope)"></el-button>	
				  	</template>
				  </el-table-column>
				</el-table>
			</div>
			<div class="home_content_middle_2">
				<el-table
				  v-if='display'
				  :data="stableData"
				 style="width: 320px;" 
				 :default-sort = "{prop: 'stid', order: 'ascending'}"
				 >
				  <el-table-column
					align="center"
					prop="stid"
					label="编号"
					sortable
					width="80">
				  </el-table-column>
				  <el-table-column
					align="center"
					prop="stname"
					label="名称"
					width="80">
				  </el-table-column>
				  <el-table-column
					align="center"
					label="状态"
					width="80">
					<template slot-scope="scope">
						<el-button size="mini" @click='reverse2(scope.row)' :style='scope.row.stused==1?validStyle:invalidStyle' round>{{scope.row.stused==1?valid:invalid}}</el-button>
					</template>
				  </el-table-column>
				  <el-table-column
				  	align="center"
				  	label="操作"
				  	width="80">
				  	<template slot-scope="scope">
				  		<el-button size='mini' type='primary' circle class='el-icon-edit' @click="edit(scope)"></el-button>	
				  	</template>
				  </el-table-column>
				</el-table>
			</div>
			<div class="home_content_right_2">
				
			</div>
		</div>


	</div>

</template>

<style>
	.home_content_2{
		height: 537px;
		width: 100%;
		flex:3;
	    display: flex;
		background-color: #FFFFFF;
		
	}
	.home_content_left_2{
		overflow-y: auto;
		height: 537px;
		flex:1;
		background-color: #FFFFFF;
		margin: 10px;
		
	}
	.home_content_middle_2{
		height: 537px;
		overflow-x: auto;
		flex:1;
		background-color: #FFFFFF;
		margin: 10px;
	}
	.home_content_right_2{
/* 		border:solid 1px #00FFFF; */
		height: 537px;
		overflow-x: auto;
		flex:1;
		background-color: #FFFFFF;
	}
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
  export default {
    methods: {

    },
    data() {
      return {
		ftableData:[],
		stableData:[],
		optionData:[],
		input:'',
		style1:"el-icon-caret-right",
		style2:"el-icon-caret-left",
		display:false,
		valid: '已启用',
		invalid: '已停用',
		validStyle: 'color:#fff;background-color: lightgreen;',
		invalidStyle: 'color:#fff;background-color: lightgray;',
      }
    },
	created() {
		this.axios.get('http://localhost:8081/foodtype/getFirstType').then(r=>{
			console.log(r.data);
			this.ftableData=r.data;
		})
	},
	methods:{
		displaySt(scope){
			console.log(scope);

			this.display=true;
			this.axios.get('http://localhost:8081/foodtype/getSecondTypeByFtid',{params:{
				ftid:scope.row.ftid,
			}}).then(r=>{
				console.log(r.data);
				this.stableData=r.data;
			});

		},
		reverse1(scope){
			if(scope.ftused==0){
				scope.ftused=1;
			}else{
				scope.ftused=0;
			}
			this.axios.post("http://localhost:8081/foodtype/updateFtype",scope).then(r=>{
				console.log(r.data);
			});
		
		},
		reverse2(scope){
			if(scope.stused==0){
				scope.stused=1;
			}else{
				scope.stused=0;
			}
			this.axios.post("http://localhost:8081/foodtype/updateStype",scope).then(r=>{
				console.log(r.data);
			});
		
		},
		edit(scope){
			console.log(scope);
		}
	}

  }
</script>