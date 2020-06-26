<template>
	<div class="mineCenter" align="center">
		<el-card style="height: 90%;width: 60%;margin-top: 10px;">
		  <div slot="header" align="left">
			<h2>个人资料</h2>
		  </div>
		  <div class="content">
			  <div class="userIcon" style="display: inline-block;margin-right: 80px;">
				  <div>
					  <img style=" border-radius: 50%;height: 100px;width: 100px;" :src="iconShowWay" />
				  </div>
				  <div>
					  <p @click="updateIcon" class="modify">修改头像</p>
				  </div>
			  </div>
			  <div class="content_rignt" style="display: inline-block;width: 500px;vertical-align:top;">
				  <div class="div_username" style="margin-top: 20px;" align="left">
					  <span style="color: #999999;font-size: 14px;">ID: {{userinfo.username}}</span>
					  <a href="#" @click="showAccountDialog" class="accountSetting">账号设置</a>
				  </div>
				  <div class="div_role" align="left"><span style="color: #999999;font-size: 12px;">角色：{{userinfo.dept.dname}}</span></div>
				   <div class="div_dept" align="left"><span style="color: #999999;font-size: 12px;">部门：{{userinfo.role.rname}}</span></div>
				  <div  align="left"><span style="color: #999999;font-size: 12px;">机构：秘制小厨</span></div>
				  <el-divider></el-divider>
				  <div class="main_info_div">
					  <div align="left" class=""><span>姓名：{{userinfo.realname}}</span></div>
					  <div align="left" class=""><span>手机号：{{userinfo.phone}}</span></div>
					  <div align="left" class=""><span>身份证：{{userinfo.identityid}}</span></div>
					  <div align="left" class=""><span>银行账户：{{userinfo.creditnum}}</span></div>
				  </div>
				
			  </div>
		  </div>
		</el-card>
		<el-dialog
		  title="修改密码"
		  :visible.sync="dialogVisible"
		  width="40%">
		  <div>
			  <el-form :inline="true" status-icon :model="passwordArea" label-width="80px" :rules="updatePwdRules"  ref="updatePwdForm" style="text-align: left;">
				<el-form-item label="旧密码" prop="oldPwd">
					<el-input v-model="passwordArea.oldPwd" placeholder="请输入原始密码" show-password auto-complete="off"></el-input>
				</el-form-item>
				&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
				<el-form-item label="新密码" prop="newPwd" >	
					<el-input v-model="passwordArea.newPwd" placeholder="请输入新密码" show-password  auto-complete="off"></el-input>
				</el-form-item>	
				<el-form-item label="新密码" prop="rNewPwd" >
					<el-input v-model="passwordArea.rNewPwd" placeholder="请确认密码" show-password auto-complete="off"></el-input>
				</el-form-item>	
			</el-form>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cacleUpdate">取 消</el-button>
		    <el-button type="primary" @click="updatePwdFunc">确 定</el-button>
		  </span>
		</el-dialog>
		<el-dialog 
			title="上传头像"
			:visible.sync="iconDialogVisible"
			
			  width="40%">
			  <div class="uploadArea" >
				  <el-upload   
				    :limit=1
					ref="upload"
				    drag
				    action="#"
				    :auto-upload="false"
				    :on-change="loadSuccess">
				    <div class="uploadArea">
				  	  <i class="el-icon-upload"></i>
				  	  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				  	  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
				    </div>				    
				  </el-upload>
				  <div style="width: 100%;" align="right">
				  	<el-button @click="cacelUpdateIcon" style="margin-right: 10px;margin-top: 5px;" type="info">取消</el-button>
				  </div>
				  
			  </div>
		</el-dialog>
		<el-dialog
		title="头像预览"
		:visible.sync="previewState"
		  width="40%">
			<div id="picArea">
			  <img src=""  style="border-radius: 50%;height: 100px;width: 100px;" />
			  <div style="margin-top: 10px;"><span>预览头像</span></div>
			</div>
			<el-divider></el-divider>
			<div style="width: 100%;margin-top: 20px;" align="right">
				<el-button @click="backToUpload" style="margin-right: 100px;" type="info">上一步</el-button>
				<el-button @click="upload" style="margin-right: 10px;" type="primary">提交</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Loading } from 'element-ui';
	import AdminService from '../../views/homeSubs/AdminService.js';
	export default{
		data(){
			var validaterPass = (rule, value, callback) => {
				if (value === '') {
				    callback(new Error('请再次输入密码'));
				}
				else if (value !== this.passwordArea.newPwd) {
				  callback(new Error('两次输入密码不一致!'));
				}else{
					callback();
				}
			};
			return{
				//图片文件
				picFile:'',
				limitNum:1,
				dialogVisible: false,
				iconDialogVisible: false,			
				previewState: false,
				userinfo:{
					id:'',
					username:"心态崩了",
					rname:"销售员",
					role:{
						rname:''
					},
					dept:{
						dname:''
					},
					realname:"张晓",
					phone:"13562123422",
					identityid:"2230211993****1205",
					creditnum:"351630198512124212"				
				},
				passwordArea:{
					oldPwd:'',
					newPwd:'',
					rNewPwd:''
				},
				updatePwdRules:{
					oldPwd:[{ required: true, message: "请输入原始密码", trigger: "blur" }],
					newPwd: [
						{ required: true, message: "请输入新密码", trigger: "blur" },
						{ min: 5,max: 25,message: '长度在 5 到 25个字符'},
						{pattern: /^(\w){5,25}$/, message: '只能输入5-25个字母、数字、下划线'}
					],
					rNewPwd: [
								  { validator:validaterPass, trigger: "blur" },
								  { min: 5,max: 25,message: '长度在 5 到 25个字符'},
								  {pattern: /^(\w){5,25}$/, message: '只能输入5-25个字母、数字、下划线'}
					],
				}
			}
		},
		computed:{
			iconShowWay(){
				if(this.userinfo.icon){
					return `http://localhost:8081/static/${this.userinfo.icon}`;
				}else{
					return require('../../../static/img/img.jpg');
				}
			}
		},
		created(){
			let loadingInstance = Loading.service({text: '加载中'});
			AdminService.getLoginAdmin(rs=>{
				var identityId = rs.identityid;
				
				rs.identityid = identityId.substr(0, 10) + '****' + identityId.substr(identityId.length - 4);
				this.userinfo = rs;
				loadingInstance.close();
			})
		},
		methods:{
			
			//加载成功后，自动预览
			loadSuccess(res, file, filelist){		
				let pic = file[0].raw;
				this.picFile = file[0].raw;
				let reader = new FileReader();				
				reader.onload = (function(e){					
					document.getElementById("picArea").firstElementChild.src = e.target.result;
				});
				reader.readAsDataURL(pic);
				this.previewState = true;
				this.iconDialogVisible = false;
			},
			
			//更改密码页面
			showAccountDialog(){
				this.dialogVisible = true;
			},
			//取消密码更改
			cacleUpdate(){
				this.dialogVisible = false;
				this.$refs.updatePwdForm.resetFields();
			},
			//打开头像上传页面
			updateIcon(){
				this.iconDialogVisible = true;
			},
			//取消头像上传
			cacelUpdateIcon(){
				this.$refs.upload.clearFiles();
				this.iconDialogVisible = false;
				this.$message.info("已取消");
				
			},
			//更新头像
			upload(){
				this.$confirm("确认更新吗？", "提示", {}).then(() => {
					let loadingInstance = Loading.service({text: '上传中，请稍后'});
									let formData = new FormData();
					formData.append("mf", this.picFile);
					Vue.axios.post(`http://localhost:8081/admin/uploadIcon/${this.userinfo.id}`, formData,{
						headers: {
							'content-Type':'multipart/form-data',
						},
					
					}).then(rs=>{
						location.reload();
						this.$message.success("上传成功");
						this.previewState = false;
						loadingInstance.close();
					});		
				}).catch(()=>{
					this.$message.info("已取消");
				});
				this.$refs.upload.clearFiles();
			},
			//回到上传页面
			backToUpload(){
				this.iconDialogVisible = true;
				this.previewState = false;
			},
			//更新密码
			
			//最好还是前端通过转换判断是否相等，然后直接后端更新
			updatePwdFunc(){
				this.$refs.updatePwdForm.validate(valid => {
				  if (valid) {
					  this.$confirm("确认更新吗？", "提示", {}).then(() => {
					  	let loadingInstance = Loading.service({text: '请稍后'});

						Vue.axios.post(`http://localhost:8081/admin/updatePwd/${this.passwordArea.oldPwd}/${this.passwordArea.newPwd}`).then(rs=>{
							loadingInstance.close();
							if(rs.data.isSuccess){
								this.$message.success("更新成功");
							}else{
								this.$message.error(rs.data.msg);
							}
							
						});					  
						  this.dialogVisible = false;
						  this.$refs.updatePwdForm.resetFields();
					  	
					  	
					  	
					  }).catch(()=>{
					  	this.$message.info("已取消");
						this.$refs.updatePwdForm.resetFields();
					  });
					  
					 
				  }
				});
			},
			
			
		}
	}
</script>

<style>
	.mineCenter{
		height: 100%;
		width: 100%;
		overflow: auto;
	}
	.div_username{
		margin-top: 16px;
	}
	.div_role{
		margin-top: 16px;
		margin-bottom: 16px;
	}
	.div_dept{
		margin-top: 16px;
		margin-bottom: 16px;
	}
	.accountSetting{
		float: right;
		font-size: 14px;
		color: #3399ea;
		padding-right: 9.3px;
		text-decoration: none;
	}
	.accountSetting:after {
	    content: "";
	    display: inline-block;
	    width: 8px;
	    height: 8px;
	    border-top: 1px solid #3399ea;
	    border-right: 1px solid #3399ea;
	    transform: rotate(45deg);
	    -webkit-transform: rotate(45deg);
	}
	.main_info_div div{
			height: 35px;
	}
	.main_info_div span{
		 color: #999999;
		 font-size: 14px;
	}
	.modify{
	    font-size: 14px;
	    color: #3399ea;
	    margin-top: 8px;
	    cursor: pointer;
	}
</style>
