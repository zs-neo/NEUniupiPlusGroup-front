<template>
	<div>
		<div>
			<el-row>
			<el-input v-model="input" placeholder="请输入内容" style="width: 300px;"></el-input>
			<el-button type="primary" icon="el-icon-search">搜索</el-button>
			<el-button type="primary" @click="drawer = true" icon="el-icon-circle-plus-outline">添加</el-button>
			</el-row>
			
		</div>
		<div>
			<el-container style="height: 500px;border: 1px solid #eee">
			  <el-aside width="100px" style="background-color: rgb(238, 241, 246);">
			    <el-menu>
					<el-menu-item index="1-1">主食</el-menu-item>
					<el-menu-item index="1-2">饮料</el-menu-item>
					<el-menu-item index="1-3">小吃</el-menu-item>
			    </el-menu>
			  </el-aside>
			  
			  <el-container>
			    <el-main>
			      <el-table :data="tableData">
			        <el-table-column prop="date" label="创建时间" width="140">
			        </el-table-column>
			        <el-table-column prop="name" label="食品名称" width="120">
			        </el-table-column>
			        <el-table-column prop="address" label="描述">
			        </el-table-column>
					<el-table-column prop="" label="原价">
					</el-table-column>
					<el-table-column prop="" label="现价">
					</el-table-column>
					<el-table-column prop="" label="折扣">
					</el-table-column>
					<el-table-column prop="status" label="状态">
						<template slot-scope="scope">
							<el-button size="mini" :style='scope.row.status==1?validStyle:invalidStyle' disabled round>{{scope.row.status==1?valid:invalid}}</el-button>
						</template>
					</el-table-column>
					<el-table-column label="图片">
						<template slot-scope="scope">
							<img style="width: 100px;height: 100px;" src="../../assets/logo.png"/>
						</template>
					</el-table-column>
					<el-table-column
					label="操作"
					width="300">
			        <template slot-scope="scope">
						<el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" circle></el-button>
						<el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
						<el-button size="mini" type="primary" icon="el-icon-delete" circle></el-button>
			        </template>
					</el-table-column>
			      </el-table>
			    </el-main>
			  </el-container>
			</el-container>
		</div>
		<div>
			<el-drawer
			  title="食品添加"
			  :visible.sync="drawer"
			  :direction="direction"
			  :before-close="handleClose">
			  <div>
				  <el-form ref="sizeForm" :model="sizeForm" label-width="80px" size="mini">
				    <el-form-item label="食物名称">
				      <el-input v-model="sizeForm.name" style="width: 200px"></el-input>
				    </el-form-item>
					  <el-form-item label="食物类别">
					    <el-select v-model="sizeForm.type" placeholder="请选择食物类别">
					      <el-option label="主食" value="shanghai"></el-option>
					      <el-option label="饮料" value="beijing"></el-option>
					    </el-select>
					  </el-form-item>
					<el-form-item label="描述">
					<el-input type="textarea" v-model="sizeForm.detail" style="width: 200px;"></el-input>
					</el-form-item>
					<el-form-item label="原价">
					<el-input v-model.number="sizeForm.price1" style="width: 200px;"></el-input>
					</el-form-item>
					</el-form-item>
					<el-form-item label="现价">
					<el-input v-model.number="sizeForm.price2" style="width: 200px;"></el-input>
					</el-form-item>
					<el-form-item label="折扣">
					<el-input v-model.number="sizeForm.discount" style="width: 200px;"></el-input>
					</el-form-item>
					<el-form-item label="图片">
					<el-upload
					  class="avatar-uploader"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="sizeForm.imageUrl" :src="sizeForm.imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					</el-form-item>
				    <el-form-item size="large">
				      <el-button type="primary" @click="onSubmit">立即创建</el-button>
				      <el-button  type="primary" @click="resetForm('sizeForm')">重置</el-button>
				    </el-form-item>
				  </el-form>

			  </div>
			</el-drawer>
		</div>
	</div>

	
</template>


<style>
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
		width: 100px;
		height: 100px;
		line-height: 100px;
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
        tableData: [{
			date: '2016-05-02',
			name: '王小1',
			address: '上海市普陀区金沙江路 1518 弄',
			status:1,
			image:'',
			
		},
		{
			date: '2016-05-02',
			name: '王小2',
			address: '上海市普陀区金沙江路 1518 弄',
			status:0,
			image:'',
		},{
			date: '2016-05-02',
			name: '王小3',
			address: '上海市普陀区金沙江路 1518 弄',
			status:1,
			image:'',
		}],
		multipleSelection:[],
		loading: true,
		valid: '已启用',
		invalid: '已停用',
		validStyle: 'color:#fff;background-color: lightgreen;',
		invalidStyle: 'color:#fff;background-color: lightgray;',
		input:"",
		drawer: false,
		direction: 'rtl',
		sizeForm:{
			name:'',
			type:'',
			detail:'',
			price1:0,
			price2:0,
			discount:0,
			imageUrl:'',
			
		},
      }
    },
	methods:{
		handleClose(done) {
			this.$confirm('确认关闭？')
			.then(_ => {
				done();
			})
			.catch(_ => {});
		},
		resetForm(formName) {
			this.sizeForm={
			name:'',
			type:'',
			detail:'',
			price1:0,
			price2:0,
			discount:0,
			
		};
		},
		onSubmit(){
			
		},
		handleAvatarSuccess(res, file) {
			this.sizeForm.imageUrl = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
			  this.$message.error('上传头像图片只能是 JPG 格式!');
			}
			if (!isLt2M) {
			  this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isJPG && isLt2M;
		}
	}
  };
</script>