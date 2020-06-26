<template>
	
		<el-dialog  :close-on-click-modal="false"  :visible.sync="addRoleVisible">
			<template slot="title">
				<el-card shadow="hover" style="box-shadow:-2px -2px 6px lightblue inset;">
				 <div class='titleStyle'>角色添加</div>    
				 </el-card>
			</template> 
			<el-card shadow="hover" style="margin-top: -30px;">
				<el-form :inline="true" status-icon :model="addRole" label-width="80px" ref="addRoleForm" :rules="addRoleRules" style="text-align: left;">
					<el-form-item label="用户名" prop="userName">
						<el-autocomplete
						  v-model="addRole.userName"
						  :fetch-suggestions="querySearchAsync"
						  placeholder="请输入用户名"
						  value-key = "username"
						></el-autocomplete>
					</el-form-item>
					&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
					<el-form-item label="姓名" prop="realName" >	
						<el-input v-model="addRole.realName" disabled auto-complete="off"></el-input>
					</el-form-item>
					
					<el-form-item label="角色" prop="role">	
						<el-select v-model="addRole.role" placeholder="请选择" clearable>
						<el-option  v-for="role in roleOptions"  :key="role.rid"  :label="role.rname"  :value="role.rid"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</el-card>
			
			<div slot="footer" class="dialog-footer" align="center">
				<el-card shadow="hover" style="margin-top: -30px;">
					<el-button @click="cancleAddRole" style="margin-right: 200px;">取消</el-button>
					<el-button type="primary" @click="addRoleSubmit" :loading="addRoleLoading">提交</el-button>
				</el-card>
			</div>	
			
		</el-dialog>
	
</template>

<script>
	
	export default{
		name:"AddRoleDialog",
		props:{
			roleOptions:{},
			//用户名列表，只能为已有的用户创建角色，该项应当还有姓名信息
			userNameSet:{},
		},
		data(){
			var validaterUserName = (rule, value, callback) => {
				 console.log(value);
				 if(value===""){
					 callback(new Error('请输入用户名'));
				 }
				else{
					this.userNameSet.forEach(function(e){
						if(e.username===value){
							callback();
						}
					});
				  callback(new Error('无该用户信息'));
				}
			 };
			return{
				
				addRoleVisible:true,
				addRole:{
					userName:'',
					realName:'',
					role:''
				},
				
				addRoleRules:{
					userName:[{validator: validaterUserName, trigger: "change"}],
					role:[{ required: true, message: "请选择角色", trigger: "blur" }],
					
				},
				addRoleLoading:false,
				
			};
		},
		created(){
			//TODO
			//为userNameSet赋值
			
		},
		mounted() {
			
		},
		methods:{
			cancleAddRole(){
				this.$emit("F_SHOW_ADDROLE", false);
			},
			
			//新增角色
			addRoleSubmit:function(){
				
				this.$refs.addRoleForm.validate(valid => {
					
				  if (valid) {
					  
					//验证完成后将调用后端接口进行数据传递，此时加载，当ajax异步返回后,loading关闭
					//this.addRoleLoading = true;
					this.$message({
						message:"好了好了",
						type:'success'
					});
					this.$emit("F_SHOW_ADDROLE", false);
				  }
				});
			},
			packUserNameSet(){
				if(this.userNameSet[0]&&!this.userNameSet[0].username){
					for(let i = 0;i < this.userNameSet.length; i++){
					let name = this.userNameSet[i];
					this.userNameSet[i] =  {username: name};
					}
				}	
				console.log(this.userNameSet)
			},
			querySearchAsync:function(queryString, cb) {
				var userNameSet = this.userNameSet;
				this.packUserNameSet();
				var results = queryString ? userNameSet.filter(this.createStateFilter(queryString)) : userNameSet;
				console.log(results);
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
				  cb(results);
				}, 1500 * Math.random());
			  },
			  createStateFilter:function(queryString) {
				return (state) => {
					console.log(state);
					if(state.username.toLowerCase().indexOf(queryString.toLowerCase()) === 0){
						this.addRole.validUserName = true;
						return true;
					}
					return false;
				};
			  },
		}
	}
</script>

<style>
	.el-dialog__headerbtn{
		display: none;
	}
	.titleStyle{
		text-align: center;
		color: lightskyblue;
		font-family:"lucida console";
		font-size: 25px;
		height: fit-content
	}
</style>
