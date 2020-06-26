<template>
	<div>
		<div>
			<el-row>
			<el-input v-model="input" placeholder="请输入内容" style="width: 300px;"></el-input>
			<el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button>
			<el-button type="primary" @click="add" icon="el-icon-circle-plus-outline">添加</el-button>
			</el-row>
			
		</div>
		<div class="home_content_2">
			<div class="home_content_left_2">
				<el-table
					ref="ftable"
				  :data="ftableData"
				  style="width: 330px"
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
					label="第一类别名称"
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
				  	width="90">
				  	<template slot-scope="scope">
				  		<el-button size='mini' type='primary' circle :class='style1' @click="displaySt(scope)"></el-button>
						<el-button size='mini' type='primary' circle @click.native.prevent="deleteFType(scope.row.ftid,scope.$index, ftableData)" :class="style3"></el-button>
				  	</template>
				  </el-table-column>
				</el-table>
			</div>
			<div class="home_content_middle_2" v-if='display'>
				<el-table
				  :data="stableData"
				  :row-class-name="tableRowClassName"
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
					label="第二类别名称"
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
				  		<el-button size='mini' type='primary' circle class='el-icon-warning-outline' @click="edit(scope)"></el-button>
				  	</template>
				  </el-table-column>
				</el-table>
			</div>
			<div class="home_content_middle_2" v-if='display1'>

				<el-table
				  :data="searchData"
				  ref="searchtable"
				 style="width: 360px;" 
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
					label="第二类别名称"
					width="110">
					<template slot-scope="scope">
						<el-input
						  v-model="scope.row.stname"
						  :disabled="scope.row.isedited==0?true:false">
						</el-input>
					</template>

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
					width="90">
					<template slot-scope="scope">
						<el-button size='mini' type='primary' circle :class="scope.row.isedited==0?icon1:icon2" @click="edit2(scope)"></el-button>	
						<el-button size='mini' type='primary' circle @click="deleteSType(scope.row.stid,scope.$index,searchData)" :class="style3"></el-button>
					</template>
				  </el-table-column>
				</el-table>
			</div>
			<div class="home_content_middle_2" v-if='display2'>
				<el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
					<el-menu-item index="1" @click="click1">添加第一类别</el-menu-item>
					<el-menu-item index="2" @click="click2">添加第二类别</el-menu-item>
				</el-menu>
				<div>
					<div v-if="display3">
						<el-form :label-position="labelPosition" label-width="80px">
							<br>
							<el-form-item label="名称">
								<el-input v-model="ftname"></el-input>
							</el-form-item>
							<br>
							<el-button type="primary" round @click="submit1">提交</el-button>
						</el-form>
					</div>
					<div v-if="display4">
						<el-form :label-position="labelPosition" label-width="80px">
							<br>
							<el-form-item label="第一分类">
								<el-cascader
									ref="option"
									:options="options">
								</el-cascader>
							</el-form-item>
							<el-form-item label="名称">
								<el-input v-model="stname"></el-input>
							</el-form-item>
							<br>
							<el-button type="primary" round @click="submit2">提交</el-button>
						</el-form>
					</div>

				</div>
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
	.bg-purple {
	  background: #F5DAB1;
	}
	.bg-purple-light {
	  background: #409EFF;
	}
	.grid-content {
	  border-radius: 4px;
	  min-height: 36px;
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
		searchData:[],
		options:[],//级联选择器数据，封装第一分类数据
		input:'',
		ftname:'',
		stname:'',
		labelPosition:'left',
		disable:true,//是否可编辑
		style1:"el-icon-caret-right",
		style2:"el-icon-caret-left",
		style3:"el-icon-close",
		display:false,
		display1:false,//查询和编辑界面
		display2:false,//添加界面
		display3:false,
		display4:false,
		valid: '已启用',
		invalid: '已停用',
		validStyle: 'color:#fff;background-color: lightgreen;',
		invalidStyle: 'color:#fff;background-color: lightgray;',
		icon1:'el-icon-edit',
		icon2:'el-icon-circle-close',
      }
    },
	created() {
		this.axios.get('http://localhost:8081/foodtype/getFirstType').then(r=>{
			console.log(r.data);
			this.ftableData=r.data;
			let list = r.data;
			let newList = [];
			for(let i=0;i<list.length;i++){
				newList.push({
					value:list[i].ftid,
					label:list[i].ftname,
					});
			}
			this.options=newList;
		});
		
		
	},
	methods:{
		displaySt(scope){

			this.display=true;
			this.axios.get('http://localhost:8081/foodtype/getSecondTypeByFtid',{params:{
				ftid:scope.row.ftid,
			}}).then(r=>{
				console.log(r.data);
				this.stableData=r.data;
			});
			this.axios.get('http://localhost:8081/foodtype/getFirstType').then(r=>{
				console.log(r.data);
				this.options=r.data;
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
			console.log(scope.row);
			this.searchData=[];
			this.searchData.push(scope.row);
			this.display2=false;
			this.display1=true;
			
		},
		edit2(scope){
			console.log(scope.row.isedited);
			if(scope.row.isedited==1){
				scope.row.isedited=0;
			}else{
				scope.row.isedited=1;
			}
			this.axios.post("http://localhost:8081/foodtype/updateStype",scope.row).then(r=>{
				console.log(r.data);
			})
			
		},
		tableRowClassName({row, rowIndex}) {
			if ((rowIndex+1)%2 == 1) {
				return 'warning-row';
			} 
			return '';
		},
		search(){
			this.display2=false;
			this.display1=true;
			console.log(this.input);
			this.axios.get("http://localhost:8081/foodtype/getSecondTypeByName",{params:{
				stname:this.input,
			}}).then(r=>{
				console.log(r.data);
				this.searchData=r.data;
			});
		},
		//删除第一分类
		deleteFType(ftid,index,rows){
			console.log(rows);
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
			  this.$message({
				type: 'success',
				message: '删除成功!'
			  });
			  rows.splice(this.$refs.ftable.tableData[index], 1);
			  this.axios.get("http://localhost:8081/foodtype/delelteFtype",{params:{
				ftid:ftid,
			  }}).then(r=>{
				console.log(r.data);
			  })
			}).catch(() => {
			  this.$message({
				type: 'info',
				message: '已取消删除'
			  });          
			});
		},
		//删除第二分类
		deleteSType(stid,index,rows){
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
			  this.$message({
				type: 'success',
				message: '删除成功!'
			  });
			  rows.splice(this.$refs.searchtable.tabledata[index], 1);
			  this.axios.get("http://localhost:8081/foodtype/delelteStype",{params:{
			  	stid:stid,
			  }}).then(r=>{
			  	console.log(r.data);
			  })
			}).catch(() => {
			  this.$message({
				type: 'info',
				message: '已取消删除'
			  });          
			});
		},
		add(){
			this.display1=false;
			this.display2=true;
			
		},
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		 },
		click1(){
			 this.display3=true;
			 this.display4=false;
			 console.log(1);
		},
		click2(){
			this.display3=false;
			this.display4=true;
			console.log(2);
		},
		//第一类别添加
		submit1(){
			let firstType={
				ftname:this.ftname
			}
			this.axios.post("http://localhost:8081/foodtype/insertFtype",firstType).then(r=>{
				console.log(r.data);
				this.axios.post("http://localhost:8081/foodtype/getFirstType").then(r=>{
					console.log(r.data);
					this.ftableData=r.data;
				})
			})

		},
		//第二类别添加
		submit2(){
			console.log(this.$refs.option.getCheckedNodes()[0].value);
			let secondType={
				stname:this.stname,
				stid:this.$refs.option.getCheckedNodes()[0].value,
			}
			this.axios.post("http://localhost:8081/foodtype/insertStype",secondType).then(r=>{
				console.log(r.data);
			})
		},

		
	}

  }
</script>