<template>
	<!-- TODO 加载表格 -->
	<el-dialog  :close-on-click-modal="false" :visible.sync="visi" :loading="addUserLoading">
		<template slot="title">
			<el-card shadow="hover" style="box-shadow:-2px -2px 6px lightblue inset;">
			 <div class='titleStyle'>用户添加</div>    
			 </el-card>
		</template>  
		<el-card shadow="hover" style="margin-top: -30px;">
			<el-form :inline="true" status-icon :model="addUser" label-width="80px" ref="addUserForm" :rules="addUserRules" style="text-align: left;">
				<el-form-item label="用户名" prop="userName">
					<el-input v-model="addUser.userName" auto-complete="off"></el-input>
				</el-form-item>
				&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
				<el-form-item label="姓名" prop="realName">	
					<el-input v-model="addUser.realName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password" placeholder="请输入密码">
					<el-input v-model="addUser.password" auto-complete="off"  show-password></el-input>
				</el-form-item>
				&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
				<el-form-item label="确认密码" prop="rPassword" placeholder="请确认密码">
					<el-input v-model="addUser.rPassword" auto-complete="off" show-password></el-input>
				</el-form-item>
				<el-form-item label="身份证号" prop="identityId">
					<el-input  v-model="addUser.identityId" auto-complete="off" clearable></el-input>
				</el-form-item>
				&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
				<el-form-item label="银行卡号" prop="creditCardNum">
					<el-input  v-model="addUser.creditCardNum" auto-complete="off" clearable></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="addUser.phone"  auto-complete="off"></el-input>
				</el-form-item>
				&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
				<el-form-item label="角色" prop="role">	
					<el-select v-model="addUser.role" placeholder="请选择" clearable>
					<el-option  v-for="role in roles"   :key="role.rid"  :label="role.rname"  :value="role.rid" ></el-option>
					</el-select>
				</el-form-item>
				
				&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
				<el-form-item label="部门" prop="dept">
					<el-select v-model="addUser.dept" placeholder="请选择" clearable>
					<el-option  v-for="dept in depts"   :key="dept.did"  :label="dept.dname"  :value="dept.did" ></el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</el-card>
		<div slot="footer" class="dialog-footer" align="center">
			<el-card shadow="hover" style="margin-top: -30px;">
				<el-button @click="cacelAdd" style="margin-right: 200px;">取消</el-button>
				<el-button type="primary" @click="addUserSubmit">提交</el-button>
			</el-card>
		</div>
	</el-dialog>
</template>

<script>
	import Vue from 'vue';
	export default{
		props:{
			depts:{},
			roles:{},
			userNameSet:{},
		},
		data(){
			var validaterPass = (rule, value, callback) => {
				if (value === '') {
				    callback(new Error('请再次输入密码'));
				}
				else if (value !== this.addUser.password) {
				  callback(new Error('两次输入密码不一致!'));
				}else{
					callback();
				}
			};
			var validaterUserName = (rule, value, callback) => {
				if (value === '') {
				    callback(new Error('请输入用户名'));
				}
				else{
					this.userNameSet.forEach(function(e){
						if(e===value){//此处e为userNameSet中的一条信息，如果有属性，则自行添加e.value等
							callback(new Error('该用户名已存在'));
							return;
						}
					});
				  callback();
				}
			};
			return{
				
				addUser:{
					userName:'',
					realName:'',
					password:'',
					rPassword:'',
					phone:'',
					role:'',
					dept:'',
					creditCardNum: '',
					identityId:''
				},
				addUserRules: {
					userName: [{validator: validaterUserName, trigger: "blur" }],
					realName: [{ required: true, message: "请输入姓名", trigger: "blur" },
								{min: 2,message: '请正确输入姓名'}],
					loginName: [
					  { required: true, message: "请输入登录名", trigger: "blur" }],
					password: [
						{ required: true, message: "请输入密码", trigger: "blur" },
						{ min: 5,max: 25,message: '长度在 5 到 25个字符'},
						{pattern: /^(\w){5,25}$/, message: '只能输入5-25个字母、数字、下划线'}
					],
					rPassword: [
								  { validator:validaterPass, trigger: "blur" },
								  { min: 5,max: 25,message: '长度在 5 到 25个字符'},
								  {pattern: /^(\w){5,25}$/, message: '只能输入5-25个字母、数字、下划线'}
					],
					identityId:[
								  { required: true, message: "请输入证件号", trigger: "blur" },
								   {
									  pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
									  message: '证件号码格式有误',
									  trigger: 'blur'
									}
					],
					creditCardNum:[
								  { required: true, message: "请输入银行卡号", trigger: "blur" },
								  {
									  pattern: /^(998801|998802|622525|622526|435744|435745|483536|528020|526855|622156|622155|356869|531659|622157|627066|627067|627068|627069)\d{10}$/,
									  message: "证件格式有误",
									  trigger: 'blur'
								  }
					],
					phone:[
								  { required: true, message: "请输入手机号", trigger: "blur" },
								  {pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
								  message: '请输入正确的手机号', trigger: 'blur'}
					],
					// role:[
					// 	{ required: true, message: "请选择角色", trigger: "blur" }
					// ],
					dept:[
						{ required: true, message: "请确认部门", trigger: "blur" }
					]		 
				},
				addUserLoading: false,
				visi: true,
			};
		},
		methods:{
			
			//取消
			
			cacelAdd:function(){
				this.$emit("F_SHOW_ADDUSER", false);
			},
			//新增用户
			addUserSubmit: function() {
			  this.$refs.addUserForm.validate(valid => {
			    if (valid) {
					var addUser = this.addUser;
					var adminInfo = {
						username: addUser.userName,
						realname: addUser.realName,
						password: addUser.password,
						phone: addUser.phone,
						creditnum: addUser.creditCardNum,
						identityid: addUser.identityId,
						roleid: addUser.role,
						deptno: addUser.dept
					};
					console.log(adminInfo);
					this.$confirm("确认提交吗？", "提示", {}).then(() => {
						this.addUserLoading = true;
						Vue.axios.post(`http://localhost:8081/admin/addAdmin`,adminInfo).then(rs=>{
							 this.addUserLoading = false;
							 if(rs.isSuccess){
								 this.$message({
								   message: "提交成功",
								   type: "success"
								 });
							 }else{
								this.$message.error(rs.data.msg);
								sessionStorage.clear();
								this.$router.push("/");
							 }
							 this.$emit("F_SHOW_ADDUSER", false, 1);
						});				  
					}).catch(()=>{
						
					});
				}
			  });
			},
		}
	}
</script>

<style scoped>
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
