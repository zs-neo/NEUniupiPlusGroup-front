<template>
	<el-dialog :close-on-click-modal="false" :visible.sync="visi">
		<template slot="title">
			<el-card shadow="hover" style="box-shadow:-2px -2px 6px lightblue inset;">
			 <div class='titleStyle'>用户信息</div>    
			 </el-card>
		</template> 
		<el-form :inline="true" status-icon :model="userinfo" label-width="80px" ref="updateUserForm" :rules="updateUserRules" style="text-align: left;">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="userinfo.username" disabled auto-complete="off"></el-input>
			</el-form-item>
			&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
			<el-form-item label="姓名" prop="realname">	
				<el-input v-model="userinfo.realname" auto-complete="off"></el-input>
			</el-form-item>

			<el-form-item label="身份证号" prop="identityid">
				<el-input  v-model="userinfo.identityid" auto-complete="off" clearable></el-input>
			</el-form-item>
			&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
			<el-form-item label="银行卡号" prop="creditnum">
				<el-input  v-model="userinfo.creditnum" auto-complete="off" clearable></el-input>
			</el-form-item>
			<el-form-item label="手机号" prop="phone">
				<el-input v-model="userinfo.phone"  auto-complete="off"></el-input>
			</el-form-item>
			&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
			<el-form-item label="角色" prop="role">	
				<el-select @change="selectRole(userinfo.role)" v-model="userinfo.role.rname" placeholder="请选择" clearable>
				<el-option  v-for="role in roles"   :key="role.rid"  :label="role.rname"  :value="role" ></el-option>
				</el-select>
			</el-form-item>
			
			&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
			<el-form-item label="部门" prop="dept">
				<el-select @change="selectDept(userinfo.dept)" v-model="userinfo.dept.dname" placeholder="请选择" clearable>
				<el-option  v-for="dept in depts"   :key="dept.did"  :label="dept.dname"  :value="dept" ></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
		<div slot="footer" class="dialog-footer">
			<el-button @click="cacelUpdate">取消</el-button>
			<el-button type="primary" @click="updateUserSubmit" >提交</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import { Loading } from 'element-ui';
	export default{
		props:{
			depts:{},
			roles:{},
			updateUser:{}
		},
		data(){
			return{
				userinfo:{},
				updateUserRules: {
					realname: [{ required: true, message: "请输入姓名", trigger: "change" }],
					identityid:[
								  { required: true, message: "请输入证件号", trigger: "change" },
								   {
									  pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
									  message: '证件号码格式有误',
									  trigger: 'blur'
									}
					],
					creditnum:[
								  { required: true, message: "请输入银行卡号", trigger: "change" },
								  {
									  pattern: /^(998801|998802|622525|622526|435744|435745|483536|528020|526855|622156|622155|356869|531659|622157|627066|627067|627068|627069)\d{10}$/,
									  message: "证件格式有误",
									  trigger: 'change'
								  }
					],
					phone:[
								  { required: true, message: "请输入手机号", trigger: "change" },
								  {pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
								  message: '格式不正确', trigger: 'change'}
					],
					role:[
						{ required: true, message: "请选择角色", trigger: "blur" }
					],
					dept:[
						{ required: true, message: "请确认部门", trigger: "change" }
					]		 
				},
				visi: true,
			};
		},
		created() {
			var obj = JSON.stringify(this.updateUser);
			
			this.userinfo = JSON.parse(obj);
		},
		methods:{
			
			selectRole(role){
				
				this.userinfo.roleid = role.rname.rid;
				this.userinfo.role = role.rname;
				console.log(role.rname);
			},
			selectDept(dept){
				
				this.userinfo.deptno = dept.dname.did;
				this.userinfo.dept = dept.dname;
				console.log(dept.dname);
			},
			//取消
			
			cacelUpdate:function(){
				this.$emit("F_SHOW_UPDATEUSER", false);
				//this.$refs["updateUserForm"].resetFields()
			},
			//更新提交
			updateUserSubmit: function() {
			  this.$refs.updateUserForm.validate(valid => {
			    if (valid) {
					
			      this.$confirm("确认提交吗？", "提示", {}).then(() => {
			        let loadingInstance = Loading.service({text: '加载中'});	
					Vue.axios.post(`http://localhost:8081/admin/updateAdmin`,this.userinfo).then(rs=>{
						if(rs.isSuccess){
							loadingInstance.close();
							 this.$message({
							   message: "提交成功",
							   type: "success"
							 });
						}else{
							this.$message.error(rs.msg);
						}
						
						 this.$emit("F_SHOW_ADDUSER", false, 1);
					});	
			      }).catch(()=>{
					  this.$message({
						   type: 'info',
						   message: '已取消'
					   });  
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
