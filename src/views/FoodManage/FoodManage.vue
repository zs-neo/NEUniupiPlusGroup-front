<template>
	<div>
		<div class="home_content_1">
			<div class="home_content_left_1">
			
				<el-menu
				
				class="el-menu-vertical-demo"
				@select="itemSelectHandler"
				:unique-opened="true"
				>
				<div v-for="item in tabledata">
					<el-submenu :index="item.ftid+''">
						<template slot="title"><i class="el-icon-tableware"></i>{{item.ftname}}</template>
						<div v-for="item2 in item.secondTypeList">
							<el-menu-item @click="ondisplay"  :index="item2.stid+''">{{item2.stname}}</el-menu-item>
						</div>
						
					</el-submenu>
				</div>

				</el-menu>
			
			
			</div>
			
			<div class="home_content_right_1">
				<div>
					<el-row>
					名称 <el-input v-model="input" placeholder="请输入内容" style="width: 200px;"></el-input>
					<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
					<el-button type="primary" @click="drawerAct" icon="el-icon-circle-plus-outline">添加</el-button>
					</el-row>
					
				</div>
				<div  v-if='display'>
					<div>
						<el-main>
						  <el-table :data="tableData1">
							<el-table-column type="selection" width="60">
							</el-table-column>
						    <el-table-column label="创建时间" align="center" width="120" sortable>
							<template slot-scope="scope">
								<i class="el-icon-time"></i>
								<span style="margin-left: 10px">{{ scope.row.fregtime }}</span>
							</template>
							</el-table-column>
						    <el-table-column label="食品名称" align="center" width="120">
						    <template slot-scope="scope">
						    	<el-tag size="medium">{{ scope.row.fname }}</el-tag>
						    </template>
							
							</el-table-column>
						    <el-table-column prop="fdesc" label="描述" align="center" width="350">
						    </el-table-column>
							<el-table-column prop="fcost" label="成本" align="center">
							</el-table-column>
							<el-table-column prop="fprice" label="售价" align="center">
							</el-table-column>
							<el-table-column prop="fdiscount" label="折扣" align="center">
							</el-table-column>
							<el-table-column prop="status" label="状态" align="center">
								<template slot-scope="scope">
									<el-button size="mini" @click='reverse(scope.row)' :style='scope.row.fused==1?validStyle:invalidStyle' round>{{scope.row.fused==1?valid:invalid}}</el-button>
								</template>
							</el-table-column>
							<el-table-column label="图片" align="center" width="120">
								<template slot-scope="scope">
									<img :src="`${fpic}${scope.row.fpic}`" style="width: 100px;height: 100px;"/>
								</template>
							</el-table-column>
							<el-table-column
							label="操作"
							width="300"
							align="center"
							>
						    <template slot-scope="scope">
								<el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)" circle></el-button>
								<el-button size="mini" type="primary" icon="el-icon-delete"  @click.native.prevent="deleteRow(scope.row.fid,scope.$index,tableData1)"  circle></el-button>
						    </template>
							</el-table-column>
						  </el-table>
						</el-main>
					</div>
					<div>
						<div class="block">
						  <el-pagination
							:page-size="this.pageSize"
						    layout="prev, pager, next"
						    :total="this.total"
							@current-change='currentChange'>
						  </el-pagination>
						</div>
					</div>
	
				
				</div>
				<div>
					<el-drawer
					  :title="title1"
					  :visible.sync="drawer"
					  :direction="direction"
					  :before-close="handleClose"
					  @closed="drawClosed">
					  <div>
						  <el-form ref="sizeForm" :model="sizeForm" label-width="80px" size="mini">
						    <el-form-item label="食物名称">
						      <el-input v-model="sizeForm.fname" style="width: 200px"></el-input>
						    </el-form-item>
							  <el-form-item label="食物类别">
							    <el-cascader 
								:options="optionData" 
								v-model="morenzhi"
								:show-all-levels="false"
								ref="morenzhi"></el-cascader>
							  </el-form-item>
							<el-form-item label="描述">
							<el-input type="textarea" v-model="sizeForm.fdesc" style="width: 200px;"></el-input>
							</el-form-item>
							<el-form-item label="成本">
							<el-input v-model="sizeForm.fcost" style="width: 200px;"></el-input>
							</el-form-item>
							</el-form-item>
							<el-form-item label="售价">
							<el-input v-model="sizeForm.fprice" style="width: 200px;"></el-input>
							</el-form-item>
							<el-form-item label="折扣">
							<el-input v-model="sizeForm.fdiscount" style="width: 200px;"></el-input>
							</el-form-item>
							<el-form-item label="图片">
							<el-upload
							  class="avatar-uploader"
							  action="https://jsonplaceholder.typicode.com/posts/"
							  :show-file-list="false"
							  :on-success="handleAvatarSuccess"
							  :before-upload="beforeAvatarUpload"
							  >
							  <img v-if="uploadsrc" :src="uploadsrc" class="avatar">
							  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							</el-form-item>
						    <el-form-item size="medium">
						      <el-button type="primary" @click="onSubmit()">更细</el-button>
						      <el-button  type="primary" @click="resetForm()">重置</el-button>
						    </el-form-item>
						  </el-form>
				
					  </div>
					</el-drawer>
					
					<el-drawer
					  :title="title2"
					  :visible.sync="drawer1"
					  :direction="direction1"
					  :before-close="handleClose1"
					  @closed="drawClosed">
					  <div>
						  <el-form ref="sizeForm" :model="sizeForm" label-width="80px" size="mini">
						    <el-form-item label="食物名称">
						      <el-input v-model="sizeForm.fname" style="width: 200px"></el-input>
						    </el-form-item>
							  <el-form-item label="食物类别">
							    <el-cascader 
								@change="insertOption"
								:options="optionData" 
								v-model="morenzhi1"
								:show-all-levels="false"
								ref="morenzhi1"></el-cascader>
							  </el-form-item>
							<el-form-item label="描述">
							<el-input type="textarea" v-model="sizeForm.fdesc" style="width: 200px;"></el-input>
							</el-form-item>
							<el-form-item label="成本">
							<el-input v-model="sizeForm.fcost" style="width: 200px;"></el-input>
							</el-form-item>
							</el-form-item>
							<el-form-item label="售价">
							<el-input v-model="sizeForm.fprice" style="width: 200px;"></el-input>
							</el-form-item>
							<el-form-item label="折扣">
							<el-input v-model="sizeForm.fdiscount" style="width: 200px;"></el-input>
							</el-form-item>
							<el-form-item label="图片">
							<el-upload
							  class="avatar-uploader"
							  action="https://jsonplaceholder.typicode.com/posts/"
							  :show-file-list="false"
							  :on-success="handleAvatarSuccess1"
							  :before-upload="beforeAvatarUpload1"
							  >
							  <img v-if="uploadsrc1" :src="uploadsrc1" class="avatar">
							  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							</el-form-item>
						    <el-form-item size="medium">
						      <el-button type="primary" @click="onSubmit1()">添加</el-button>
						      <el-button  type="primary" @click="resetForm1()">重置</el-button>
						    </el-form-item>
						  </el-form>
									
					  </div>
					</el-drawer>
				</div>
			</div>
		</div>
	</div>

	
</template>


<style>
	.home_content_1{
		height: 560.6px;
		width: 100%;
		flex:5;
	    display: flex;
		background-color: #FFFFFF;
	}
	.home_content_left_1{
		overflow-y: scroll;
		height: 100%;
		flex:1;
		background-color: #FFFFFF;
		
	}
	.home_content_right_1{
		height: 560.6px;
		overflow-x: scroll;
		flex:4;
		background-color: #FFFFFF;
	}
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}
	
	.el-aside {
		color: #333;
	}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
	
    width: 100px;
    height: 100px;
    display: block;
  }
</style>

<script>
  export default {
    data() {
      return {
		optionData:[],
		tabledata:[],
		index:0,
		sizeForm:{
			fid:0,
			fname:'',
			fregtime:'',
			tid:'',
			fpic:'',
			fdesc:'',
			fcost:0,
			fprice:0,
			fdiscount:0,
		},
		tableData1: [],
		multipleSelection:[],
		loading: true,
		valid: '已启用',
		invalid: '已停用',
		validStyle: 'color:#fff;background-color: lightgreen;',
		invalidStyle: 'color:#fff;background-color: lightgray;',
		input:'',
		drawer: false,
		drawer1:false,
		direction: 'rtl',
		direction1:'ltr',
		title1:'更新食品信息',
		title2:'添加食品信息',
		display:false,
		pageSize:3,
		total:0,
		stid:0,
		fpic:'http://localhost:8081/res/',//前端访问图片的路径
		picfile:'',//更新上传的文件
		picfile1:'',//插入上传的文件
		morenzhi:[],//cascader1 的默认值
		morenzhi1:[],//cascader2 的默认值
		uploadsrc:"",//更新上传时的src
		uploadsrc1:"",//插入上传时的src
		updateUploadState:0,//更新时是否更换了图片
      }
    },
	methods:{
		itemSelectHandler(index,indexPath){
			console.log(indexPath);
			this.axios.get('http://localhost:8081/food/getPageFood',{params:{
				stid:indexPath[1],
				pageNum:1,
				pageSize:this.pageSize,
			}}).then(r=>{
				console.log(r.data);
				this.tableData1=r.data.list;
				this.pageSize=r.data.pageSize;
				this.total=r.data.total;
				this.stid=indexPath[1];
			})
		},
		handleClose(done) {
			this.$confirm('确认关闭？')
			.then(_ => {
				done();
			})
			.catch(_ => {});
		},
		handleClose1(done){
			this.$confirm('确认关闭？')
			.then(_ => {
				done();
			})

		},
		resetForm() {
			this.sizeForm={
				fname:'',
				forder:'',
				tid:'',
				fpic:'',
				fregtime:'',
				fdesc:'',
				fcost:0,
				fprice:0,
				fdiscount:0,
				updateOrinsert:0,
			};
			this.uploadsrc="";
		},
		resetForm1() {
			this.sizeForm={
				fname:'',
				forder:'',
				tid:'',
				fpic:'',
				fregtime:'',
				fdesc:'',
				fcost:0,
				fprice:0,
				fdiscount:0,
				updateOrinsert:0,
			};
			this.uploadsrc1="";
		},
		onSubmit(){
			this.sizeForm.tid=this.$refs.morenzhi.getCheckedNodes()[0].value;
			console.log(this.sizeForm);
			let date = new Date();
			let y = date.getFullYear();
			let m = date.getMonth() + 1;
			let d = date.getDate();
			let H = date.getHours();
			let mm = date.getMinutes();
			let s=date.getSeconds();
			m = m < 10 ? "0" + m : m;
			d = d < 10 ? "0" + d : d;
			H = H < 10 ? "0" + H : H;
			let fregtime =  y + "/" + m + "/" + d + " " + H + ":" + mm+":"+s;
			if(this.updateUploadState==0){
				this.axios.post('http://localhost:8081/food/updateFood',this.sizeForm).then(r=>{
					console.log("no upload update");
				});
			}else{
				let formData = new FormData();
				formData.append("file",this.picfile);
				this.axios.post('http://localhost:8081/food/uploadImg',formData,{
					headers: {
						'content-Type':'multipart/form-data',
					},
				}).then(r=>{
					this.sizeForm.fregtime=fregtime;
					this.axios.post('http://localhost:8081/food/updateFood1',this.sizeForm).then(re=>{
						console.log("upload update");
						this.updateUploadState=0;
					});
				});
				
			}
			


		},
		onSubmit1(){
			let date = new Date();
			let y = date.getFullYear();
			let m = date.getMonth() + 1;
			let d = date.getDate();
			let H = date.getHours();
			let mm = date.getMinutes();
			let s=date.getSeconds();
			m = m < 10 ? "0" + m : m;
			d = d < 10 ? "0" + d : d;
			H = H < 10 ? "0" + H : H;
			let fregtime =  y + "/" + m + "/" + d + " " + H + ":" + mm+":"+s;
			let formData = new FormData();
			formData.append("file",this.picfile1);
			
			this.axios.post('http://localhost:8081/food/uploadImg',formData,{
				headers: {
					'content-Type':'multipart/form-data',
				},
			}).then(r=>{
				this.sizeForm.fregtime=fregtime;
				this.axios.post('http://localhost:8081/food/insertFood',this.sizeForm).then(re=>{
					console.log(re.data);
				});
			});
		},
		handleAvatarSuccess(res, file) {
			this.updateUploadState=1;
			this.uploadsrc = URL.createObjectURL(file.raw);
			this.picfile=file.raw;
			this.sizeForm.fpic=file.raw.name;
		},
		handleAvatarSuccess1(res, file){
			this.uploadsrc1 = URL.createObjectURL(file.raw);
			this.picfile1=file.raw;
			this.sizeForm.fpic=file.raw.name;
		},
		beforeAvatarUpload(file) {
			const isJPG = (file.type == 'image/jpeg'||file.type == 'image/png');
			const isLt2M = file.size / 1024 / 1024 < 2;
		
			if (!isJPG) {
			  this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!');
			}
			if (!isLt2M) {
			  this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isJPG && isLt2M;
		},
		beforeAvatarUpload1(file){
			const isJPG = (file.type == 'image/jpeg'||file.type == 'image/png');
			const isLt2M = file.size / 1024 / 1024 < 2;
					
			if (!isJPG) {
			  this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!');
			}
			if (!isLt2M) {
			  this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isJPG && isLt2M;
		},
		edit(a){
			this.drawer=true;
			this.updateOrinsert=0;
			this.sizeForm.fid=a.fid;
			this.sizeForm.fname=a.fname;
			this.sizeForm.fregtime=a.fregtime;
			this.sizeForm.fpic=a.fpic;
			this.sizeForm.fdesc=a.fdesc;
			this.sizeForm.fcost=a.fcost;
			this.sizeForm.fprice=a.fprice;
			this.sizeForm.fdiscount=a.fdiscount;
			this.titile='修改食品信息';
			let ftidtemp=0;
			this.uploadsrc=this.fpic+a.fpic;
			for(let i = 0;i<this.optionData.length;i++){
				
				for(let j = 0;j<this.optionData[i].children.length;j++){
					if(this.optionData[i].children[j].value==a.tid){
						ftidtemp=this.optionData[i].value;
						break;
					}
				}
			}
			this.morenzhi=[ftidtemp,a.tid];

		},
		drawerAct(){
			this.drawer1=true;
			this.sizeForm={
				fname:'',
				tid:'',
				fpic:'',
				fregtime:'',
				fdesc:'',
				fcost:0,
				fprice:0,
				fdiscount:0,
			};
		},
		search(){
			this.axios.get("http://localhost:8081/food/getFoodByName",{params:{
				fname:this.input,
			}}).then(r=>{
				this.tableData1=r.data;
				this.display=true;
			});
		},
		deleteRow(fid,index, rows) {
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
			  this.$message({
				type: 'success',
				message: '删除成功!'
			  });
			  rows.splice(index, 1);
			  console.log(fid);
			  this.axios.get("http://localhost:8081/food/deleteFood",{params:{
			  	fid:fid,
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
		reverse(scope){
			if(scope.fused==0){
				scope.fused=1;
			}else{
				scope.fused=0;
			}
			this.axios.post("http://localhost:8081/food/update",scope).then(r=>{
				console.log(r);
			});

		},
		ondisplay(){
			this.display=true;
		},
		currentChange(val){
			console.log(val);
			this.axios.get('http://localhost:8081/food/getPageFood',{params:{
				stid:this.stid,
				pageNum:val,
				pageSize:this.pageSize,
			}}).then(r=>{
				console.log(r.data);
				this.tableData1=r.data.list;
			})
			
		},
		drawClosed(){
			this.uploadsrc="";
			this.uploadsrc1="";
			this.sizeForm={
				fname:'',
				tid:'',
				fpic:'',
				fregtime:'',
				fdesc:'',
				fcost:0,
				fprice:0,
				fdiscount:0,
			}
			this.morenzhi1=[];
			
		},
		insertOption(val){
			console.log(val[1]);
			this.sizeForm.tid=val[1];
		}

	},
	created() {
		this.axios.post("http://localhost:8081/foodtype/getFirstTypeWithSecondType").then(r=>{
			this.tabledata=r.data;
			let list = r.data;
			console.log(list);
			let newList = [];
			for(let i=0;i<list.length;i++){
				let children=[];

				for(let j=0;j<list[i].secondTypeList.length;j++){
					
					children.push({
						value:list[i].secondTypeList[j].stid,
						label:list[i].secondTypeList[j].stname,
						});
					
				}
				newList.push({
					value:list[i].ftid,
					label:list[i].ftname,
					children:children,
					});
			}
			this.optionData=newList;
		})
	},
  };
</script>